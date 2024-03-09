// routes.js

const express = require('express');
const router = express.Router();
const {getAllJobs,getSkill,createJobSkill} = require("../controllers/jobSkillController");

router.get('/jobs', getAllJobs);

router.get('/job/:jobName/skills',getSkill);
router.post('/job', createJobSkill);

module.exports = router;
