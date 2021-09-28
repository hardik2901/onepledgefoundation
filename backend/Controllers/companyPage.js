import express from 'express'
import companyPage from '../Models/companyPage.js'
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
                doesCompanyExists.navBarTitle = req.body.navBarTitle || doesCompanyExists.navBarTitle
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

// /API/COMPANY/EDITOR/:ID
// ADD EDITOR
// POST
// @admin

const addEditor = asyncHandler(async (req, res) => {
    const company = await companyPage.findById(req.params.id)
    if (company) {
        try {
            res.json(await companyPage.updateOne({ _id: req.params.id }, { $push: { ckeditor: req.body } }))
        } catch (err) {
            res.status(404)
            res.json({ "message": "Error in adding new field" })
        }

    } else {
        res.status(404)
        res.json({ "message": "No such company found" })
    }
})

// /API/COMPANY/EDITOR/:ID
// ADD EDITOR
// PUT
// @admin

const updateEditor = asyncHandler(async (req, res) => {
    const company = await companyPage.findById(req.params.id)
    if (company) {
        try {
            res.json(await companyPage.findOneAndUpdate({ _id: req.params.id, "ckeditor.title": req.body.title }, { $set: { 'ckeditor.$.rawHtml': req.body.rawHtml } }))
        } catch (err) {
            res.status(404)
            res.json({ "message": "Error in adding new field" })
        }

    } else {
        res.status(404)
        res.json({ "message": "No such company found" })
    }
})

// /API/COMPANY/EDITOR/:ID
// DELETE EDITOR
// DELETE
// @admin

const deleteEditor = asyncHandler(async (req, res) => {
    const company = await companyPage.findById(req.params.id)
    if (company) {
        try {
            console.log('herererererer')
            console.log(req.body);
            res.json(await companyPage.updateOne({ _id: req.params.id }, { $pull: { ckeditor: { title: req.body.title } } }))
        } catch (err) {
            res.status(404)
            res.json({ "message": "Error in Deleting the field" })
        }

    } else {
        res.status(404)
        res.json({ "message": "No such Editor found" })
    }
})

// /API/COMPANY/EDITOR/:ID
// GET EDITOR
// GET
// @admin

const getEditor = asyncHandler(async (req, res) => {
    const company = await companyPage.findById(req.params.id)
    if (company) {
        try {
            if (req.body.title)
                res.json(await companyPage.find({ _id: req.params.id }, { ckeditor: { $elemMatch: { title: req.body.title } } }))
            else {
                res.json(company.ckeditor)
            }
        } catch (err) {
            res.status(404)
            res.json({ "message": "Error in Deleting the field" })
        }

    } else {
        res.status(404)
        res.json({ "message": "No such Editor found" })
    }
})

export {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    updateEditor,
    deleteEditor,
    getEditor,
    addEditor
}