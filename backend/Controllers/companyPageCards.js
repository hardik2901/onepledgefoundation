import express from 'express'
import companyPageCard from '../Models/companyPageCards.js';
import asyncHandler from 'express-async-handler'
import fs from 'fs'
const router = express.Router();


// /API/COMPANY/:id <- company id 
// CREATE
// @POST

const createCompanyCard = asyncHandler(async (req, res) => {
    const newCompanyPage = new companyPageCard(req.body);
    try {
        const savedCompanyPage = await newCompanyPage;
        savedCompanyPage.coverPhoto = req.file.path.split('public')[1];
        savedCompanyPage.companyId = req.params.id;
        savedCompanyPage.save();
        res.status(200).json(savedCompanyPage);
    } catch (err) {
        res.status(500)
        res.json(err)
    }
});

// /API/COMPANY/:compId/:cardId
// UPDATE
// @PUT

const updateCompanyCards = asyncHandler(async (req, res) => {

    try {
        const doesCardExists = await companyPageCard.findById(req.params.cardId)
        if (doesCardExists) {
            doesCardExists.coverPhoto = req.file.path.split('public')[1] || doesCompanyExists.coverPhoto,
                doesCardExists.Location = req.body.Location || doesCompanyExists.Location,
                doesCardExists.title = req.body.title || doesCompanyExists.title,
                doesCardExists.discription = req.body.discription || doesCompanyExists.discription
        } else {
            res.status(500).json({
                "message": "No such Company Existed",
            })
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// /API/COMPANY/:compId/:cardId
// DELETE
// @DELETE

const deleteCompanyCard = asyncHandler(async (req, res) => {
    try {
        const doesCardExists = await companyPageCard.findById(req.params.cardId);
        if (doesCardExists) {
            try {
                try {
                    fs.unlinkSync(doesCardExists.coverPhoto)
                } catch (err) {
                    res.status(err)
                    throw new Error("Issue with deleting the file present in the upload folder either not present or may be some other issue in deleting the file from that folder")

                }
                doesCardExists.remove();
                res.status(200).json({
                    "message": "Card Deleted ...!"
                })
            } catch (err) {
                res.status(404)
                throw new Error("Error while deleting the card")
            }

        } else {
            res.status(404)
            throw new Error("No Such Card Exists with the given ID")
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// /API/COMPANY/:compId/cards
// GET
// @GET

const getAllCompanyCards = asyncHandler(async (req, res) => {
    try {
        companyPageCard.find({ companyId: req.params.id }, (err, data) => {
            if (err) {
                res.status(404);
                throw new Error('Unable to load the cards from the backend')
            }

            res.send(data);
        })
    } catch (err) {
        res.status(404);
        res.json(err)
    }
})

// /API/COMPANY
// GET
// @GET

const getCompanyCard = asyncHandler(async (req, res) => {
    const card = await companyPageCard.findById(req.params.cardId)
    if (card) {
        res.json(card)
    } else {
        res.status(404)
        res.json({ "message": "No card found" })
    }

})

export {
    createCompanyCard,
    updateCompanyCards,
    deleteCompanyCard,
    getAllCompanyCards,
    getCompanyCard
}