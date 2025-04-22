import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: '' },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: { type: Date },
    avatar: { type: String, default: '' },

    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
      default: ''
    },

    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: '' },

    // Academic Information
    enrollmentId: { type: String, unique: true, required: true },
    department: { type: String, default: '' },
    program: { type: String, default: '' },
    semester: { type: String, default: '' },

    // Family Information
    fatherName: { type: String, default: '' },
    fatherContact: { type: String, default: '' },
    motherName: { type: String, default: '' },
    motherContact: { type: String, default: '' },

    // Address Information
    presentAddress: {
      type: String
    },
    permanentAddress: {
      type: String,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  },
  {
    timestamps: true
  }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);
export default Student;

