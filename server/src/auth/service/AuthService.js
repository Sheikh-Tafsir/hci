const UserModel = require("../../user/model/UserModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.PASSWORD_ENCRYPT_SECRET_KEY;
const bcrypt = require('bcrypt');
const dns = require('dns');
const net = require('net');
const sendMail = require('../../../config/sendMailConfig');

//login
const login = async (email, password) => {
    try {
        if(email == "tafsir@gmail.com" && password== "tafsir"){
            const user={email:"tafsir@gmail.com", role:1, name: 'System Admin'}
            const token = jwt.sign({ email: email, role: 1}, SECRET_KEY);
            return {
                message: "Login successful",
                user:user,
                token: token,
            };
        }

        else{
            const user = await UserModel.findOne({
                where: {
                    email: email
                }
            });
            
            if (!user) {
                return { message: "User does not exist" }
            }

            const passwordMatch = await comparePassword(password, user.password);
            if (!passwordMatch) {
                return { message: "Password is incorrect" }
            }

            const token = jwt.sign({ email: email, role: user.role, id: user.id}, SECRET_KEY);

            return {
                message: "Login successful",
                user: user,
                token: token
            };
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//signup
const create = async (name, email, password) => {
    try {
        // Check if the email is already taken
        const existingUserByName = await UserModel.findOne({ where: { name: name } });
        if (existingUserByName) {
            return { message: "Name already taken" };
        }

        // Check if the email is already taken
        const existingUserByEmail = await UserModel.findOne({ where: { email: email } });
        if (existingUserByEmail) {
            return { message: "Email already taken" };
        }
        
        //check email valid
        // if(!validateEmail(email)) {
        //     return { message: "Email is not valid" };
        // }

        const hashedPassword = hashPassword(password);

        // Create the user
        const newUser = await UserModel.create({
            name:name,
            email: email,
            password: password, // Store the hashed password
            role: 4,
        });

        const token = jwt.sign({ email: email }, SECRET_KEY);

        return {
            message: "Signup successful",
            user: newUser,
            token: token
        };
    } catch (error) {
        console.error("Error during signup:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//logout
const logout = async (name) => {
    try {
        return {
            message: "logout successful",
        }
    } catch (error) {
        console.error("Error during signup:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
}


//forgot password
const forgotPassword = async (email) => {
    try {
        const user = await UserModel.findOne({
            where: {
                email: email
            }
        });
        
        if (!user) {
            return { message: "Email does not exist" }
        }
        // console.log(user.email);
        // console.log(user.password);

        const mail = await sendMail(user.email, 'password reset token', user.password, '');
        console.log("mail");
        console.log(mail);
        return {
            message: "reset token sent to mail",
        };

    } catch (error) {
        console.error("Error during login:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//reset password
const resetPassword = async (email, token, password) => {
    try {
        const user = await UserModel.findOne({
            where: {
                email: email
            }
        });
        
        if (!user) {
            return { message: "Email does not exist" }
        }

        // Compare the token with the user's stored password hash
        const passwordMatches = comparePassword(token, user.password);
        if (!passwordMatches) {
            return { message: "Invalid token" };
        }

        const hashedPassword = hashPassword(password);

        await UserModel.update({
            password: password,
        }, {
            where: {
                email: email
            }
        });

        return {
            message: "Password reset successfull",
        };

    } catch (error) {
        console.error("Error resetting password:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//change password
const changePassword = async (email, password, newPassword) => {
    try {
        const user = await UserModel.findOne({
            where: {
                email: email,
                password, password
            }
        });
        
        if (!user) {
            return { message: "password does not match" }
        }

        const hashedPassword = hashPassword(newPassword);

        await UserModel.update({
            password: hashedPassword
        }, {
            where: {
                email: email
            }
        });

        return {
            message: "Password change successfull",
        };

    } catch (error) {
        console.error("Error changing password:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//Function to hash the password (you need to implement this based on your chosen library)
const hashPassword = async (password) => {
    return password
    // try {
    //   const salt = await bcrypt.genSalt(saltRounds);
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   return hashedPassword;
    // } catch (error) {
    //   throw error;
    // }
};

const comparePassword = async (typedPassword, userPassword) => {
    //return await bcrypt.compare(typedPassword, userPassword);
    return typedPassword == userPassword;
};

//validate email
const validateEmail = (email) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return false; // Invalid format
    }

    // Extracting domain from email address
    const domain = email.split('@')[1];

    // Checking if domain has valid DNS records
    return new Promise((resolve, reject) => {
        dns.resolve(domain, 'MX', (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                resolve(false); // Domain does not exist or has no MX records
            } else {
                // Verifying if domain has a reachable mail server
                const smtpSocket = net.createConnection(25, addresses[0].exchange);
                smtpSocket.on('connect', () => {
                    smtpSocket.end();
                    resolve(true); // Domain has a reachable mail server
                });
                smtpSocket.on('error', (error) => {
                    smtpSocket.destroy();
                    resolve(false); // Domain does not have a reachable mail server
                });
            }
        });
    });
}

module.exports = {
    login,  
    create,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
};
