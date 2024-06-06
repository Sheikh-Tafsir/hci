const StsModel = require("../model/StsModel");

//signup
const addSts= async ( wardNumber, capacityInTonnes, latitude, longitude ) => {
    try {
        // Check if the email is already taken
        const existingVehicleByReg = await StsModel.findOne({ where: { wardNumber: wardNumber } });
        if (existingVehicleByReg) {
            return { message: "STS ward no is already taken" };
        }

        // Create the user
        const newSts = await StsModel.create({
            wardNumber: wardNumber,
            capacityInTonnes: capacityInTonnes,
            latitude: latitude,
            longitude: longitude,
        });

        return {
            message: "STS adding successful",
        };
    } catch (error) {
        console.error("Error adding STS:", error.message);
        return {
            message: error.message,
        };
    }
};


module.exports = {
    addSts,
}