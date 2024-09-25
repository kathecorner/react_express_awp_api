const Record = require("../models/Payments");

const getAllRecords = async (req, res) => {
    try {
        const allRecord = await Record.find({});
        res.status(200).json(allRecord);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

const createRecord = async (req, res) => {
    try {
        const createRecord = await Record.create(req.body);
        res.status(200).json(createRecord);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

const getSingleRecord = async (req, res) => {
    try {
        const getSingleRecord = await Record.findOne({uniqueid: req.params.id});
        res.status(200).json(getSingleRecord);

        if (!getSingleRecord) {
            return res.status(404).json(`uniqueid:${req.params.id} does not exist`);
        }
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

const updateSingleRecord = async (req, res) => {
    try {
        const updateSingleRecord = await Record.findOneAndUpdate(
            { uniqueid: req.params.id },
            req.body,
            {
                "new" : true
            }
        );
        res.status(200).json(updateSingleRecord);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

const deleteSingleRecord = async (req, res) => {
    try {
        const deleteRecord = await Record.findOneAndDelete(
            { uniqueid: req.params.id },            
        );
        res.status(200).json(deleteRecord);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

module.exports = {
    getAllRecords,
    createRecord,
    getSingleRecord,
    updateSingleRecord,
    deleteSingleRecord
}