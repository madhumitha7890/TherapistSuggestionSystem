const mongoose = require('mongoose');
const Therapist = require('./models/therapist'); // Adjust path if needed

mongoose.connect('mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const testTherapist = new Therapist({
  id: 1,
  name: 'Dr. John Doe',
  specializations: ['anxiety', 'depression'],
  gender: 'Male',
  languages: ['English', 'French'],
  therapyTypes: ['Cognitive', 'Behavioral'],
  availability: {
    days: ['Monday', 'Wednesday'],
    times: ['Morning']
  },
  image: 'path_to_image.jpg'
});

testTherapist.save()
  .then(() => console.log('Therapist added'))
  .catch(err => console.error('Error adding therapist:', err))
  .finally(() => mongoose.disconnect());
