import * as mongoose from 'mongoose';

export const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  birthDate: { type: Date, required: true },
  city: { type: String },
  cep: { type: String },
  country: { type: String },
  district: { type: String },
  houseNumber: { type: String },
  state: { type: String },
  whatsapp: { type: String, required: false },
  CPF: { type: String, required: true, unique: true },
  RG: { type: String, required: true, unique: true },
});
