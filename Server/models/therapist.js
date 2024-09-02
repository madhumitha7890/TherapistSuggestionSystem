const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  specializations: { type: [String], required: true },
  gender: { type: String, required: true },
  languages: { type: [String], required: true },
  therapyTypes: { type: [String], required: true },
  availability: {
    days: { type: [String], required: true },
    times: { type: [String], required: true }
  },
  image: { type: String }
});

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = Therapist;
