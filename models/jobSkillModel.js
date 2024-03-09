const mongoose = require('mongoose');

const jobSkillSchema = new mongoose.Schema({
  job: String,
  skills: [String]
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('JobSkill', jobSkillSchema);