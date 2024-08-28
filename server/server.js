const express = require('express');
const connectDB = require('./config/db');
const habitRoutes = require('./routes/habitRoutes');
const cors = require ('cors')

const app = express();
require('dotenv').config();


connectDB();


app.use(express.json());
app.use(cors());


app.use('/api/habits', habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
