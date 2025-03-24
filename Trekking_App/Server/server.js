
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import conntDB from './config/Mangodb.js';

import userRoutes from "./routes/userRoutes.js";
import packageRoutes from "./routes/packageRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
conntDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/package", packageRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("API is working!");
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
