const VehicleModel = require("../model/VehicleModel");

//signup
const addVehicle = async (registrationNo, type, fuelCostLoaded, fuelCostUnLoaded) => {
    try {
        // Check if the email is already taken
        const existingVehicleByReg = await VehicleModel.findOne({ where: { registrationNo: registrationNo } });
        if (existingVehicleByReg) {
            return { message: "Registration no is already taken" };
        }

        const capacity = type == 'Open Truck' ? 3 : type =='Dump Truck' ? 5 : type =='Compactor' ? 7 : 15;
        // Create the user
        const newVehicle = await VehicleModel.create({
            registrationNo: registrationNo,
            type: type,
            capacity: capacity,
            fuelCostLoaded: fuelCostLoaded,
            fuelCostUnLoaded: fuelCostUnLoaded,
        });

        return {
            message: "Vehicle adding successful",
        };
    } catch (error) {
        console.error("Error adding vehicle:", error.message);
        return {
            message: error.message,
        };
    }
};


module.exports = {
    addVehicle,
}