import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cards from './Data/cards.js'
import homepageCards from './Models/homePage.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()


const importData = async () => {
    try {
        const temp = await homepageCards.insertMany(cards)
        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await homepageCards.deleteMany()
        console.log('Data Deleted!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
