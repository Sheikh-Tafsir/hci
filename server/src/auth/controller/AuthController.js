const AuthService = require('../service/AuthService');


    //login
    const login = async (req, res) => {
    // console.log(req.body);
      try {
        const { email, password } = req.body;

        const authService = await AuthService.login(email, password);
              
        if(authService.token)res.status(200).json(authService);
        else res.status(401).json(authService);


      } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: error.message });
      }
    };


    //signup
    const create = async (req, res) => {
      //console.log(req.body);
        try {
          const { name, email, password } = req.body;
          console.log(req.body);
    
          const authService = await AuthService.create(name, email, password);
                
          if(authService.token){
            res.status(201).json(authService);
          }
          else res.status(401).json(authService);
    
    
        } catch (error) {
          console.error("Error during signup:", error.message);
          res.status(500).json({ error: error.message });
        }
      }; 

      const logout = async (req, res) => {
        //console.log(req.body);
          try {
            const { email } = req.body;
            const authService = await AuthService.logout(email);
            res.status(200).json(authService);
          } catch (error) {
            console.error("Error during logout:", error.message);
            res.status(500).json({ error: error.message });
          }
      };


      const forgotPassword = async (req, res) => {
        //console.log(req.body);
          try {
            const { email } = req.body;
            const authService = await AuthService.forgotPassword(email);
            res.status(200).json(authService);
          } catch (error) {
            console.error("Error forgot password:", error.message);
            res.status(500).json({ error: error.message });
          }
      };

      const resetPassword = async (req, res) => {
        //console.log(req.body);
          try {
            const { email, token, password } = req.body;
            const authService = await AuthService.resetPassword(email, token, password);
            res.status(200).json(authService);
          } catch (error) {
            console.error("Error resetting password:", error.message);
            res.status(500).json({ error: error.message });
          }
      };

      const changePassword = async (req, res) => {
        //console.log(req.body);
          try {
            const { email, password, newPassword } = req.body;
            const authService = await AuthService.changePassword(email, password, newPassword);
            res.status(200).json(authService);
          } catch (error) {
            console.error("Error resetting password:", error.message);
            res.status(500).json({ error: error.message });
          }
      };

module.exports = {
  login,
  create,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
};
