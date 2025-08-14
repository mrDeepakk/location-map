import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import locationRoutes from './routes/location.routes.js';
import { requestLogger } from './middleware/logger.js';

dotenv.config();

const app = express();
app.use(helmet());
app.use(requestLogger);
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: false }));

// console.log(process.env.CLIENT_ORIGIN);
app.get('/', (_req, res) => res.send('API OK'));
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));