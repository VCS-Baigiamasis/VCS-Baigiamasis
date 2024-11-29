import mongoose from 'mongoose';
// import User from './User.js';

const reservationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: String,
  contactName: String,
  contactEmail: String,
  contactPhone: String,

  dateRange: {
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date, required: true, default: Date.now }
  }
});

export default mongoose.model('Reservations', reservationSchema);
