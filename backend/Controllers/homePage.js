import homePage from '../Models/homePage.js'
import asyncHandler from 'express-async-handler'

// /API/HOMEPAGE/CARDS
// CREATE
// @POST

const createHomepageCard = asyncHandler(async (req, res) => {
    const newCard = new homePage;
    const savedCard = await newCard.save();
    res.json(savedCard);
});


// /API/HOMEPAGE/CARDS
// UPDATE
// @PUT

const updateHomePageCard = asyncHandler(async (req, res) => {

    try {

        const doesCardExists = await homePage.findById(req.params.id);
        console.log(req.body)

        if (doesCardExists) {
            doesCardExists.title = req.body.title || doesCardExists.title;
            doesCardExists.discription = req.body.discription || doesCardExists.discription;
            doesCardExists.coverPhoto = req.body.coverPhoto || doesCardExists.coverPhoto;
            doesCardExists.Location = req.body.Location || doesCardExists.Location;
            doesCardExists.save();
            res.status(200).json(doesCardExists);
        } else {
            res.status(404)
            res.json({ "message": "No such Card found in the database" })
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// /API/HOMEPAGE/CARDS
// DELETE
// @DELETE

const deleteHomepageCard = asyncHandler(async (req, res) => {
    try {
        const doesCardExists = await homePage.findById(req.params.id);
        console.log(doesCardExists);
        if (doesCardExists) {
            try {
                console.log('here');
                doesCardExists.remove();
                res.status(200).json({
                    "message": "Card Deleted ...!"
                })
            } catch (err) {
                res.status(404)
                res.json({ "message": "No Company Matched with given Name" })
            }

        } else {
            res.status(404)
            res.json({ "message": "No Company Matched with given Name " })
        }

    } catch (err) {
        res.status(404)
        res.json({ "message": "No Company Matched with given Name" })
    }
});

// /API/HOMEPAGE/CARDS
// GET ALL
// @GET

const getAllHomepageCards = asyncHandler(async (req, res) => {
    const cards = await homePage.find({})
    if (cards) {
        res.json(cards)
    } else {
        res.status(404);
        res.json({ "message": "No Cards Found" })
    }

})

// /API/HOMEPAGE/CARDS
// GET ALL
// @GET

const getAHomepageCard = asyncHandler(async (req, res) => {
    const card = await homePage.findById(req.params.id)
    if (card) {
        res.json(card)
    } else {
        res.status(404)
        res.json({ "message": "No such card found" })
    }

})

export {
    createHomepageCard,
    updateHomePageCard,
    deleteHomepageCard,
    getAllHomepageCards,
    getAHomepageCard
}




