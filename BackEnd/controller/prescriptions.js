import db from '../db.js';

const addPrescription = async (req, res) => {
    const { medication_id, pet_id, comment } = req.body;
  
    if (!medication_id || !pet_id || !comment) {
      return res.status(400).json({ response: "Missing required parameters" });
    }  
      
    try {
      const log = await db.query(
        `INSERT INTO public.prescriptions(medication_id, pet_id, comment)
        VALUES ($1, $2, $3)`,
        [medication_id, pet_id, comment]
      );
  
      return res.status(201).json({ response: "prescription was added", log });
    } catch (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ response: "something went wrong" });
    }
  };
  
  const getPrescriptionsByPetId = async (req, res) => {
    try {
      const idToFind = req.params.id;
      const logs = await db.query(`
      SELECT pets.name AS pet_name, prescriptions.*, medications.*
      FROM prescriptions
      LEFT JOIN medications ON prescriptions.medication_id = medications.id
      LEFT JOIN pets ON prescriptions.pet_id = pets.id
      WHERE prescriptions.pet_id = '${idToFind}'`);
  
        if (logs.rows.length === 0) {
        return res.status(404).json({ response: "log not found" });
      }
  
      return res.status(200).json(logs.rows);
    } catch (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ response: "Something went wrong" });
    }
  };
 

export { addPrescription, getPrescriptionsByPetId };
