import db from '../db.js';

const addPet = async (req, res) => {
  const { dob, name, client_email } = req.body;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!dob || !name || !client_email) {
    return res.status(400).json({ response: "Missing required parameters" });
  } else if (!emailRegex.test(client_email)) {
    return res.status(400).json({ response: "Invalid email address" });
  }

  try {
    const pet = await db.query(
      `INSERT INTO public.pets(dob, name, client_email)
      VALUES ($1, $2, $3)`,
      [dob, name, client_email]
    );

    return res.status(201).json({ response: "Pet was added", pet });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};
  
  

const getPets = async (req, res) => {
  try {
    const pets = await db.query(`SELECT * FROM pets WHERE isArchived = false`);
    return res.status(201).json(pets.rows);
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
}

const getPetById = async (req, res) => {
    try {
      const idToFind = req.params.id;
      const pet = await db.query(`
      
        SELECT
        pets.id AS pet_id,
        pets.name AS pet_name,
        medications.name AS medicine_name,
        logs.description AS log_description,
        logs.status AS log_status,
        logs.id AS log_id,
        prescriptions.comment AS prescription_comment,
        prescriptions.timestamp AS prescription_timestamp
        FROM pets
        LEFT JOIN logs ON pets.id = logs.pet_id
        LEFT JOIN prescriptions ON pets.id = prescriptions.pet_id
        LEFT JOIN medications ON prescriptions.medication_id = medications.id  
        WHERE pets.id ='${idToFind}'`);
  
        if (pet.rows.length === 0) {
        return res.status(404).json({ response: "Pet not found" });
      }
  
      return res.status(200).json(pet.rows);
    } catch (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ response: "Something went wrong" });
    }
  };
  
const deletePetById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      text: 'UPDATE pets SET isArchived = true WHERE id = $1',
      values: [id],
    };

    const result = await db.query(query);

    if (result.rowCount > 0) {
      return res.status(201).send({ message: 'Pet deleted' }); 
    } else {
      return res.status(404).json({ message: 'Pet not found' });
    }
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}


export { addPet, getPets, getPetById, deletePetById };
