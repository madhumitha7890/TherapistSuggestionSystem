const express = require('express');
const Therapist = require('../models/therapist');

const router = express.Router();


router.post('/add', async (req, res) => {
  const { id, name, specializations, gender, languages, therapyTypes, availability, image } = req.body;

  try {
    const newTherapist = new Therapist({ id, name, specializations, gender, languages, therapyTypes, availability, image });
    await newTherapist.save();
    res.status(201).json({ message: 'Therapist added successfully', therapist: newTherapist });
  } catch (error) {
    res.status(400).json({ error: 'Error adding therapist', details: error });
  }
});

router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    try {
      const result = await Therapist.findOneAndDelete({ id });
      if (!result) {
        return res.status(404).json({ message: 'Therapist not found' });
      }
      res.status(200).json({ message: 'Therapist deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting therapist', details: error });
    }
  });


  router.get('/search', async (req, res) => {
    const { symptoms, preferredGender } = req.query;
  
    try {
      const symptomsArray = symptoms ? symptoms.split(',') : [];
  
      const therapists = await Therapist.find({
        specializations: { $in: symptomsArray },
        gender: preferredGender
      });
      res.json(therapists);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching therapists', details: error });
    }
  });

module.exports = router;

  router.get('/', async (req, res) => {
    try {
      const therapists = await Therapist.find();
      res.json(therapists);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching therapists', details: error });
    }
  });
  
  module.exports = router;

module.exports = router;
