import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import companyPage from './Routes/companyPage.js'
import homePage from './Routes/homePage.js'
import loginPage from './Routes/loginPage.js'
import upload from './Middleware/upload.js'
const app = express();

dotenv.config();
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
})
app.use('/api/company', companyPage);
app.use('/api/homepage/cards', homePage);
app.use('/api/login', loginPage);
app.post('/api/upload', upload.single('coverPhoto'), async (req, res) => {
    console.log(req.file.path)
    const resPath = req.file.path.split('public')[1];
    res.json(resPath)
})


const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
