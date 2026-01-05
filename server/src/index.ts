import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileRoutes from './routes/files';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/files', fileRoutes);

app.get('/', (req, res) => {
    res.send('Document Management System API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
