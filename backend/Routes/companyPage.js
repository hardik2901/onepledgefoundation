import express from 'express'
import companyPage from '../Models/companyPage.js'
import companyPageCard from '../Models/companyPageCards.js';
import upload from '../Middleware/upload.js'
import fs from 'fs'

import { protect, admin, subAdmin } from '../Middleware/authentication.js';
const router = express.Router();


// /API/COMPANY
// CREATE
// @POST
// @Admin

router.post("/", protect, admin, upload.single('pptWithDetails'), async (req, res) => {
    const { userName } = req.body;
    const newCompanyPage = new companyPage(req.body);
    const doesCompanyExists = await companyPage.findOne({ userName });

    if (!doesCompanyExists) {
        try {
            const savedCompanyPage = await newCompanyPage;
            try {
                savedCompanyPage.pptWithDetails = req.file.path;
            } catch (err) {
                savedCompanyPage.pptWithDetails = "";
            }

            savedCompanyPage.save();

            res.status(200).json(savedCompanyPage);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json({
            "message": "User Already exists"
        })
    }

});

// /API/COMPANY
// UPDATE
// @PUT
// @ Admin

router.put("/:id", protect, subAdmin, async (req, res) => {

    try {
        const doesCompanyExists = await companyPage.findById(req.params.id)
        if (doesCompanyExists) {
            doesCompanyExists.password = req.body.password || doesCompanyExists.userName,
                doesCompanyExists.navBarTitle = req.body.navBarTitle || doesCompanyExists.navBarTitle,
                doesCompanyExists.ckeditor1 = req.body.ckeditor1 || doesCompanyExists.ckeditor1,
                doesCompanyExists.ckeditor2 = req.body.ckeditor2 || doesCompanyExists.ckeditor2,
                doesCompanyExists.pptWithDetails = req.body.pptWithDetails || doesCompanyExists.pptWithDetails
        } else {
            res.status(500).json({
                "message": "No such Company Existed",
            })
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// /API/COMPANY/:id
// DELETE
// @DELETE
// @Admin

router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const doesCompanyExists = await companyPage.findById(req.params.id);
        //console.log(doesCompanyExists);
        if (doesCompanyExists) {
            try {
                // console.log(req.params.id);

                companyPageCard.find({ companyId: req.params.id }, (err, data) => {
                    if (err) {
                        return console.error(err);
                    }

                    for (var cardImages of data) {
                        fs.unlink(cardImages.coverPhoto, function (err) {
                            if (err) console.log(err);
                            else console.log('file deleted successfully');
                        });
                        cardImages.remove();
                    }
                })

                fs.stat(doesCompanyExists.pptWithDetails, function (err, stats) {
                    // console.log(stats) here we got all information of file in stats variable

                    if (err) {
                        return console.error(err);
                    }

                    fs.unlink(doesCompanyExists.pptWithDetails, function (err) {
                        if (err) return console.log(err);
                        console.log('file deleted successfully');
                    });
                });

                doesCompanyExists.remove();
                res.status(200).json({
                    "message": "Company Deleted ...!"
                })
            } catch (err) {
                res.status(404).json({
                    "message": "No company with the given name found in the database"
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

// /API/COMPANY
// GET
// @GET
// @Admin

router.get('/', protect, subAdmin, async (req, res) => {
    const companies = await companyPage.find({})
    res.json(companies)
})

// /API/COMPANY
// GET
// @GET
// @Protect

router.get('/:id', protect, async (req, res) => {
    const companies = await companyPage.findById(req.params.id)
    res.json(companies)
})




export default router;