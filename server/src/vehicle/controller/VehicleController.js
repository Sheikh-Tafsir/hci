const VehicleService = require('../service/VehicleService');    

//add vehicle
const addVehicle = async (req, res) => {
    try {
      const { registrationNo, type, fuelCostLoaded, fuelCostUnLoaded } = req.body;
      console.log(req.body);

      const vehicleService = await VehicleService.addVehicle(registrationNo, type, fuelCostLoaded, fuelCostUnLoaded);
            
      if(vehicleService.message == 'Vehicle adding successful'){
        res.status(201).json(vehicleService);
      }
      else res.status(401).json(vehicleService);


    } catch (error) {
      console.error("Error adding vehicle:", error.message);
      res.status(500).json({ error: error.message });
    }
}; 

module.exports = {
    addVehicle,
}