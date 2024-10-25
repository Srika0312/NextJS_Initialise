import mongoose, { Schema } from "mongoose";

interface UserType {
  name: string;
  email: string;
  password: string;
  phone: number;
  // reset_email_count: number;
  // reset_password_count: number;
  // failed_login_attemptes: number;
  // verified_at: Date;
  // is_verified: boolean;
  // last_login_time: Date;
  // isActive: boolean;
  // last_password_reset_at: Date;
  // createdAt: Date;
  // upDatedAt: Date;
  // temp_otp: Number;
  // temp_otp_expiresIn: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      reqired: true,
      match: [/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"],
    },
    email: {
      try: String,
      type: String,
      required: [true, "User login Email is required"],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^\S+@\S+\.\S+$/.test(value);
        },
        message: "Please provide a valid user email",
      },
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: true,
      minlength: [10, "Phone number must be exactly 10 digits"],
      maxlength: [10, "Phone number must be exactly 10 digits"],
      validate: {
        validator: function (value: number) {
          return /^\d{10}$/.test(value.toString());
        },
        message: "Phone number must be exactly 10 digits",
      },
    },
    // reset_email_count: { type: Number, default: 0 },
    // reset_password_count: { type: Number, default: 0 },
    // verifiedAt: { type: Date },
    // is_verified: { type: Boolean, default: false },
    // last_login_time: { type: Date },
    // isActive: { type: Boolean, default: true },
    // last_password_reset_at: { type: Date },
    // temp_otp: {
    //   type: Number,
    //   default: null,
    // },
    // temp_otp_expires_in: {
    //   type: Date,
    //   default: null,
    // },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model<any>("User", UserSchema) 
