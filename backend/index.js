import express from 'express';
import { PORT } from './config.js';
import { prisma } from './config.js';
import booksRoutes from './Routes/booksRoutes.js';
import cors from 'cors';
/*Basic Express*/
const app = express();
app.use(cors());
app.use(express.json());
/*Books Routes*/
app.use('/books', booksRoutes);
//Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

