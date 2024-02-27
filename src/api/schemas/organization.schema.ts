import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String },
  cep: { type: String },
  country: { type: String },
  district: { type: String },
  houseNumber: { type: String },
  state: { type: String },
  whatsapp: { type: String, required: false },
  createdAt: { type: Date, required: false },
  tradeName: { type: String, required: true },
  CNPJ: { type: String, required: true, unique: true },
});
