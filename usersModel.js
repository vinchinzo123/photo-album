import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    username: String,
    familyname: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    if (!isMatch) {
      return cb(null, isMatch);
    } else {
      return cb(null, isMatch);
    }
  });
};

export const UserModel = mongoose.model("User", UserSchema);
