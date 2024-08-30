import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
//const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/water-gas-meter';

//mongoose.connect(MONGO_URI)
//    .then(() => console.log('Conectado com MongoDB'))
//    .catch(err => console.log('Failed to connect to MongoDB', err));

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server rodando na porta: ${PORT}`));
