import db from '../db.js';

const addLog = async (req, res) => {
    const { pet_id, description } = req.body;
  
    if (!pet_id || !description ) {
      return res.status(400).json({ response: "Missing required parameters" });
    }  
      
    try {
      const log = await db.query(
        `INSERT INTO public.logs(pet_id, description)
        VALUES ($1, $2)`,
        [pet_id, description]
      );
  
      return res.status(201).json({ response: "log was added", log });
    } catch (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ response: "something went wrong" });
    }
  };
  
  

const updateLog = async (req, res) => {
  try {
    const idToFind = req.params.id;
    const query = `UPDATE public.logs
    SET  status=false
    WHERE logs.id = $1`;

    const logs = await db.query(query, [idToFind]);

    return res.status(200).json(logs.rows);
  } catch (err) {
    console.log('ERROR:', err);
    res.status(500).json({ response: 'Something went wrong' });
  }
}

const getLogsByPetId = async (req, res) => {
  try {
    const idToFind = req.params.id;
    const logs = await db.query(`
    
    SELECT 
    pets.id,
    pets.name as pet_name,
    logs.description AS log_description,
    logs.status AS log_status,
    logs.id AS log_id
    FROM pets
    LEFT JOIN logs ON pets.id = logs.pet_id
    WHERE pets.id ='${idToFind}'`);

      if (logs.rows.length === 0) {
      return res.status(404).json({ response: "log not found" });
    }

    return res.status(200).json(logs.rows);
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};
  

export { addLog, updateLog, getLogsByPetId};
