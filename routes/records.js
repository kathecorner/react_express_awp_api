const express = require("express");
const router = express.Router();
const {
    createRecord,
    getSingleRecord,
    deleteSingleRecord,
    updateSingleRecord,
    getAllRecords
} = require("../controllers/records");

router.get("/", getAllRecords);
router.post("/", createRecord);
router.get("/:id", getSingleRecord);
router.patch("/:id", updateSingleRecord);
router.delete("/:id", deleteSingleRecord);

module.exports = router;