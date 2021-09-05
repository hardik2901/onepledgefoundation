import express from 'express'
import homePage from '../Models/homePage.js'
const router = express.Router();
import { protect, admin } from '../Middleware/authentication.js';

// /API/HOMEPAGE/CARDS
// CREATE
// @POST

router.post("/", protect, admin, async (req, res) => {
    const { title } = req.body;
    const newCard = new homePage(req.body);
    const doesCardExists = await homePage.findOne({ title: title });
    if (!doesCardExists) {
        try {
            const savedCard = await newCard.save();
            res.status(200).json(savedCard);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json({
            "message": "Card with Same Title Already exists"
        })
    }

});

// /API/HOMEPAGE/CARDS
// UPDATE
// @PUT

router.put("/:id", protect, admin, async (req, res) => {

    try {
        const doesCardExists = await homePage.findById(req.params.id);
        if (doesCardExists) {
            doesCardExists.title = req.body.title || doesCardExists.title;
            doesCardExists.discription = req.body.navBarTitle || doesCardExists.discription;
            doesCardExists.coverPhoto = req.body.coverPhoto || doesCardExists.coverPhoto;
            doesCardExists.Location = req.body.Location || doesCardExists.Location;
            doesCardExists.save();
            res.status(200).json(doesCardExists);
        } else {
            res.json({
                "message": "No Card Matched with given title"
            })
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// /API/HOMEPAGE/CARDS
// DELETE
// @DELETE

router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const doesCardExists = await homePage.findById(req.params.id);
        console.log(doesCardExists);
        if (doesCardExists) {
            try {
                doesCardExists.remove();
                res.status(200).json({
                    "message": "Card Deleted ...!"
                })
            } catch (err) {
                res.status(404).json({
                    "message": "No Company Matched with given Name"
                })
            }

        } else {
            res.json({
                "message": "No Company Matched with given Name"
            })
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// /API/HOMEPAGE/CARDS
// GET ALL
// @GET

router.get('/', async (req, res) => {
    const cards = await homePage.find({})
    res.json(cards)
})

// /API/HOMEPAGE/CARDS
// GET ALL
// @GET

router.get('/:id', async (req, res) => {
    const card = await homePage.findById(req.params.id)
    res.json(card)
})




export default router;