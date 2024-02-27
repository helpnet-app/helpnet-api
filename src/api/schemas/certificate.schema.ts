import mongoose from 'mongoose';

export const CertificateSchema = new mongoose.Schema({
  verificationCode: { type: String, required: true },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
    },
});
