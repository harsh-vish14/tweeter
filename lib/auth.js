import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const verifyPassword = async (newPassword, hashedPassword) => {
  return compare(newPassword, hashedPassword);
};
