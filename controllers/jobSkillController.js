const asyncHandler = require("express-async-handler");
const JobSkill = require("../models/jobSkillModel"); // Importez correctement le modèle

const getAllJobs = asyncHandler(async (req, res) => {
    try {
        const jobs = await JobSkill.find({}, 'job skills'); // Sélectionnez à la fois le job et les skills
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getSkill = asyncHandler(async (req, res) => {
    const jobName = req.params.jobName;
    try {
        const jobSkills = await JobSkill.findOne({ job: jobName }, 'skills');
        if (!jobSkills) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(jobSkills.skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const createJobSkill = asyncHandler(async (req, res) => {
    const { job, skills } = req.body;
    if (!job || !skills || !Array.isArray(skills)) {
        return res.status(400).json({ message: 'Job and skills are required and must be an array' });
    }
    try {
        const jobSkill = await JobSkill.create({ job, skills });
        res.status(201).json(jobSkill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { createJobSkill, getAllJobs, getSkill };
