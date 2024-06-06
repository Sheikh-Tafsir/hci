const StsService = require('../service/StsService');    

//add vehicle
const addSts = async (req, res) => {
    try {
      const { wardNumber, capacityInTonnes, latitude, longitude } = req.body;

      const stsService = await StsService.addSts( wardNumber, capacityInTonnes, latitude, longitude);
            
      if(stsService.message == 'STS adding successful'){
        res.status(201).json(stsService);
      }
      else res.status(401).json(stsService);


    } catch (error) {
      console.error("Error adding sts:", error.message);
      res.status(500).json({ error: error.message });
    }
}; 

module.exports = {
    addSts,
}