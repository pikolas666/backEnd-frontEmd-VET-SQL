import express from 'express';
import 'dotenv/config'
import petRouter from './routes/pet.js'; 
import medicationsRouter from './routes/medication.js'; 
import logRouter from './routes/logs.js'; 
import prescriptionRouter from './routes/prescriptions.js'; 


const app = express();

const PORT = process.env.PORT; 

app.use(express.json());
import cors from 'cors';
app.use(cors());
app.use(petRouter);
app.use(medicationsRouter);
app.use(logRouter);
app.use(prescriptionRouter);

app.use((_req, res) => {
  return res.status(404).json({ response: "Endpoint not exist" });
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
