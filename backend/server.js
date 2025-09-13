const express= require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/authRoutes');
const searchRouter = require('./routes/searchRoutes');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());


app.use('/api/auth' , router);
app.use('/api/search', searchRouter);

const PORT = process.env.PORT || 9000;

app.listen(PORT , () => {

    console.log(`Server started at runinnig at ${PORT}`);
})