import express from 'express'
import companyPage from '../Models/companyPage.js'
import companyPageCard from '../Models/companyPageCards.js';
import upload from '../Routes/uploadRoutes.js'
import fs from 'fs'
const router = express.Router();


// /API/COMPANY
// CREATE
// @POST

router.post("/", upload.single('pptWithDetails'), async (req, res) => {
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

router.put("/:id", async (req, res) => {

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

router.delete("/:id", async (req, res) => {
    try {

        const doesCompanyExists = await companyPage.findById(req.params.id);
        //console.log(doesCompanyExists);
        if (doesCompanyExists) {
            try {
                console.log('here');
                const getAlltheCards = companyPageCard.findMany({ companyId: req.params.id })
                console.log(getAlltheCards);
                for (var i = 0; i < getAlltheCards.length; i++) {
                    try {
                        fs.unlinkSync(getAlltheCards[i].coverphoto);
                    } catch (err) {
                        res.json(err);
                    }
                }
                try {
                    fs.unlinkSync(companyPageCard.pptWithDetails);
                } catch (err) {
                    res.json(err);
                }

                companyPageCard.remove({ companyId: req.params.id })

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

router.get('/', async (req, res) => {
    const companies = await companyPage.find({})
    res.json(companies)
})

// /API/COMPANY
// GET
// @GET

router.get('/:id', async (req, res) => {
    const companies = await companyPage.findById(req.params.id)
    res.json(companies)
})




export default router;