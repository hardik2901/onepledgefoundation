import express from 'express'
import companyPage from '../Models/companyPage.js'
import upload from '../Routes/uploadRoutes.js'
import companyPageCard from '../Models/companyPageCards.js';
import fs from 'fs'
const router = express.Router();


// /API/COMPANY/:id <- company id 
// CREATE
// @POST

router.post("/:id", upload.single('coverPhoto'), async (req, res) => {
    const newCompanyPage = new companyPageCard(req.body);
    try {
        const savedCompanyPage = await newCompanyPage;
        savedCompanyPage.coverPhoto = req.file.path;
        savedCompanyPage.companyId = req.params.id;
        savedCompanyPage.save();
        res.status(200).json(savedCompanyPage);
    } catch (err) {
        res.status(500).json(err);
    }
});

// /API/COMPANY/:compId/:cardId
// UPDATE
// @PUT

router.put("/:compid/:cardId", async (req, res) => {

    try {
        const doesCardExists = await companyPageCard.findById(req.params.cardId)
        if (doesCardExists) {
            doesCardExists.coverPhoto = req.body.coverPhoto || doesCompanyExists.coverPhoto,
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

router.delete("/:compid/:cardId", async (req, res) => {
    try {
        const doesCardExists = await companyPageCard.findById(req.params.cardId);
        if (doesCardExists) {
            try {
                try {
                    fs.unlinkSync(doesCardExists.coverPhoto)
                } catch (err) {
                    res.status(err).json({
                        "message": "Issue with deleting the file present in the upload folder either not present or may be some other issue in deleting the file from that folder"
                    })
                }
                doesCardExists.remove();
                res.status(200).json({
                    "message": "Card Deleted ...!"
                })
            } catch (err) {
                res.status(404).json({
                    "message": "No Card with the given ID found in the database"
                })
            }

        } else {
            res.json({
                "message": "No Card Matched with given ID"
            })
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// /API/COMPANY/:compId/cards
// GET
// @GET

router.get('/:id/cards', async (req, res) => {
    const cards = await companyPage.findById(req.params.id)
    res.json(cards)
})

// /API/COMPANY
// GET
// @GET

router.get('/:compid/:cardId', async (req, res) => {
    const card = await companyPageCard.findById(req.params.cardId)
    res.json(card)
})

export default router;