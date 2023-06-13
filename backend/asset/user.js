import bcrypt from "bcryptjs";

const user = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "john doe",
    email: "john@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "joe doe",
    email: "joe@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "jenny doe",
    email: "jenny@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default user;
