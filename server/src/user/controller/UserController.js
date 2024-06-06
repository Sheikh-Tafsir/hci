const UserService = require('../service/UserService');
    
    //get list of users
    const getAllUsers = async (req, res) => {
    //console.log(req.body);
      try {
        const userService = await UserService.getAllUsers();
              
        res.status(200).json(userService);
      } catch (error) {
        console.error("Error getting all users:", error.message);
        res.status(500).json({ error: error.message });
      }
    };

    const getUsersById = async (req, res) => {
        //console.log(req.body);
          try {
            const id = req.params.id;
            const userService = await UserService.getUsersById(id);
            res.status(200).json(userService);
          } catch (error) {
            console.error("Error getting user by Id:", error.message);
            res.status(500).json({ error: error.message });
          }
    };

          //update
          const updateUser = async (req, res) => {
            try {
              const id = req.params.id;
              const {
                name,
                email,
                // role
              } = req.body;
    
              const userService = await UserService.updateUser(id, name, email);
              
              if(userService.user)res.status(200).json(userService);
              else res.status(404).json(userService);
            
            } catch (error) {
              console.error('Error updating user profile:', error.message);
              res.status(500).json({ error: error.message });
            }
          }; 
          
          
          //delete
          const deleteUser = async (req, res) => {
            try {
              const id = req.params.id;
    
              const userService = await UserService.deleteProfile(id);
              
              res.status(200).json(userService);
            
            } catch (error) {
              console.error('Error deleting user profile:', error.message);
              res.status(500).json({ error: error.message });
            }
          }; 

    //get list of users
    const getAllRoles = async (req, res) => {
          try {
            // console.log("tafsir");
            const userService = await UserService.getAllRoles();
            res.status(200).json(userService);
          } catch (error) {
            console.error("Error getting all roles:", error.message);
            res.status(500).json({ error: error.message });
          }
    };

    //update
    const updateUserRole = async (req, res) => {
      try {
        const id = req.params.id;
        const {
          role
        } = req.body;

        const userService = await UserService.updateUserRole(id, role);
        
        if(userService.user)res.status(200).json(userService);
        else res.status(404).json(userService);
      
      } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: error.message });
      }
    }; 


module.exports = {
    getAllUsers,
    getUsersById,
    updateUser,
    deleteUser,
    getAllRoles,
    updateUserRole,
}
  