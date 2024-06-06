const UserService = require('../../user/service/UserService');

//get user info
const getUser = async (req, res) => {
    //console.log(req.body);
      try {
        const {id} = req.body;
        const userService = await UserService.getUsersById(id);
        res.status(200).json(userService);
      } catch (error) {
        console.error("Error getting user by Id:", error.message);
        res.status(500).json({ error: error.message });
      }
};         

//update usre info
const updateUser = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
    } = req.body;

    const userService = await UserService.updateUser(id, name, email);
    
    if(userService.user)res.status(200).json(userService);
    else res.status(404).json(userService);
  
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getUser,
    updateUser,
}

