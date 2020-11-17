import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  if (!user) return null;
  let u = {
    _id: user._id,
    username: user.username,
    lastname: user.lastname,
    email: user.email,
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
};

export const getCleanUser = (user) => {
  if (!user) return null;

  return {
    _id: user._id,
    username: user.username,
    familyname: user.familyname,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
