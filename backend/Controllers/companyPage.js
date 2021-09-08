import express from 'express'
import companyPage from '../Models/companyPage.js'
import companyPageCard from '../Models/companyPageCards.js';
import asyncHandler from 'express-async-handler'
import fs from 'fs'

const router = express.Router();

// /API/COMPANY
// GET
// @GET
// @Admin

const getAllCompanies = asyncHandler(async (req, res) => {
    const companies = await companyPage.find({})
    if (companies) {
        res.json(companies)
    } else {
        res.json({ "message": "No Company found" })
    }

})

// /API/COMPANY
// CREATE
// @POST
// @Admin

const createCompany = asyncHandler(async (req, res) => {
    const { userName } = req.body;
    const newCompanyPage = new companyPage(req.body);
    const doesCompanyExists = await companyPage.findOne({ userName });

    if (!doesCompanyExists) {
        try {
            const savedCompanyPage = await newCompanyPage;
            try {
                savedCompanyPage.pptWithDetails = req.file.path.split('public')[1];
            } catch (err) {
                savedCompanyPage.pptWithDetails = "";
            }

            savedCompanyPage.save();

            res.status(200).json(savedCompanyPage);
        } catch (err) {
            res.status(err)
            res.json(err)
        }
    } else {
        res.status(400)
        res.json({ "message": 'User Already Exists with same userName' })
    }

});

// /API/COMPANY
// UPDATE
// @PUT
// @ Admin

const updateCompany = asyncHandler(async (req, res) => {

    try {
        const doesCompanyExists = await companyPage.findById(req.params.id)
        if (doesCompanyExists) {
            doesCompanyExists.password = req.body.password || doesCompanyExists.userName,
                doesCompanyExists.navBarTitle = req.body.navBarTitle || doesCompanyExists.navBarTitle,
                doesCompanyExists.ckeditor1 = req.body.ckeditor1 || doesCompanyExists.ckeditor1,
                doesCompanyExists.ckeditor2 = req.body.ckeditor2 || doesCompanyExists.ckeditor2,
                doesCompanyExists.pptWithDetails = req.body.pptWithDetails.split('public')[1] || doesCompanyExists.pptWithDetails
        } else {
            res.status(404)
            throw new Error('Company not found')
        }

    } catch (err) {
        res.status(404)
        res.json(err)
    }
});

// /API/COMPANY/:id
// DELETE
// @DELETE
// @Admin

const deleteCompany = asyncHandler(async (req, res) => {
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
                res.status(404)
                throw new Error('No Company Found..!')
            }

        } else {
            res.status(404)
            throw new Error('No Company Found..!')
        }

    } catch (err) {
        res.status(404)
        res.json(err)
    }
});

// /API/COMPANY
// GET
// @GET
// @Protect

const getCompany = asyncHandler(async (req, res) => {
    const company = await companyPage.findById(req.params.id)
    if (company) {
        res.json(company)
    } else {
        res.status(404)
        res.json({ "message": "No such company found" })
    }

})

export {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompany
}