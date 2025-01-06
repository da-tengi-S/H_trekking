
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import conntDB from './config/Mangodb.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

conntDB();

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is working!');
});

app.listen(port, () => console.log(`Server started on port ${port}`));