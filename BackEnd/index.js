import express from 'express';
import 'dotenv/config'
import taskRouter from './routes/task.js'; 

const app = express();
const PORT = process.env.PORT; 

app.use(express.json());
import cors from 'cors';
app.use(cors());
app.use(taskRouter);

app.use((_req, res) => {
  return res.status(404).json({ response: "Endpoint not exist" });
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
