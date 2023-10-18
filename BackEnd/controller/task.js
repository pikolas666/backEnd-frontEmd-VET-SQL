import db from '../db.js';

const addCar = async (req, res) => {
    const { title, image, price, numberplates } = req.body;
  
    if (!title || !image || !price || !numberplates) {
      return res.status(400).json({ response: "Missing required parameters" });
    }  
       const numberplatesRegex = /^[A-Z]{3}\d{3}$/;
    if (!numberplates.match(numberplatesRegex)) {
      return res.status(400).json({ response: "Invalid numberplates format" });
    }
  
    try {
      const car = await db.query(
        `INSERT INTO public.cars(title, image, price, numberplates)
        VALUES ($1, $2, $3, $4)`,
        [title, image, price, numberplates]
      );
  
      return res.status(201).json({ response: "car was added", car });
    } catch (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ response: "something went wrong" });
    }
  };
  
  

const getCars = async (req, res) => {
  try {
    const cars = await db.query(`SELECT * FROM cars`);
    return res.status(201).json(cars.rows);
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
}

const getCarById = async (req, res) => {
    try {
      const idToFind = req.params.id;
      const car = await db.query(`SELECT * FROM cars WHERE id=${idToFind}`);
  
        if (car.rows.length === 0) {
        return res.status(404).json({ response: "Car not found" });
      }
  
      return res.status(200).json(car.rows);
    } catch (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ response: "Something went wrong" });
    }
  };
  
const deleteCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      text: 'DELETE FROM public.cars WHERE id = $1',
      values: [id],
    };

    const result = await db.query(query);

    if (result.rowCount > 0) {
      return res.status(201).send({ message: 'car deleted' }); 
    } else {
      return res.status(404).json({ message: 'car not found' });
    }
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export { addCar, getCars, getCarById, deleteCarById };
