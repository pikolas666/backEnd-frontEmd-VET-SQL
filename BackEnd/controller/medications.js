import db from '../db.js';

const addMedication = async (req, res) => {
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ response: "Missing required parameters" });
    }  
      
    try {
      const medication = await db.query(
        `INSERT INTO public.medications(name, description)
        VALUES ($1, $2)`,
        [ name, description ]
      );
  
      return res.status(201).json({ response: "medication was added", medication });
    } catch (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ response: "something went wrong" });
    }
  };
  
  

const getMedications = async (req, res) => {
  try {
    const medications = await db.query(`SELECT * FROM medications`);
    return res.status(201).json(medications.rows);
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
}


  
export { addMedication, getMedications};
