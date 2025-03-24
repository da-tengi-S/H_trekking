import mongoose from 'mongoose';

const trekkingPackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  daysRequired: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  difficultyLevel: { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
  maxGroupSize: { type: Number, required: true },
  bestSeason: { type: String, required: true },
  includedServices: [{ type: String }],
  excludedServices: [{ type: String }],
  location: { type: String, required: true },
  
});

const TrekkingPackage = mongoose.model('TrekkingPackage', trekkingPackageSchema);

export default TrekkingPackage;