import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import companyPage from './Routes/companyPage.js'
import homePage from './Routes/homePage.js'
import companyPageCards from './Routes/companyPageCards.js'
import loginPage from './Routes/loginPage.js'
const app = express();

dotenv.config();
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
})
app.use('/api/company', companyPage);
app.use('/api/homepage/cards', homePage);
app.use('/api/company', companyPageCards);
app.use('/api/login', loginPage);


const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
