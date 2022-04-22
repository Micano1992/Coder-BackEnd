const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  birthdate: { type: String },
  age: {
    type: Number,
    min: [18, 'Age is below minimun required'],
    max: [150, 'Age exceeds maximum value allowed'],
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String },
  twitterId: { type: Number },
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false },
  accounts: [{ type: Schema.Types.ObjectId, ref: "Account", required: false }],
});
UserSchema.index({ email: 1 });
UserSchema.index({ twitterId: 1 });
module.exports = UserSchema;
