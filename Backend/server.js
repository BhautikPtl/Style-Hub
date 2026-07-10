const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cokieParser = require('cookie-parser');
const app = express();
dotenv.config();

const db = require('./Modules/db');

const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cokieParser());


app.use(
    cors({
        origin: "http://localhost:5555",
        credentials: true,
    })
);


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});