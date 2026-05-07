require("dotenv").config();

module.exports = {
  SECRET: process.env.JWT_SECRET || "gestuedu_super_secreto_123"
};