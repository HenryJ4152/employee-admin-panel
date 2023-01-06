const mongoose = require('mongoose')
const { Schema, models, model } = mongoose

const employeeSchema = new Schema({
  name: String,
  avatar: String,
  email: String,
  salary: Number,
  date: String,
  status: String
}, { timestamps: true })
employeeSchema.index({ name: 'text', email: 'text' });


const Employee = models?.employee || model('employee', employeeSchema);

export default Employee
