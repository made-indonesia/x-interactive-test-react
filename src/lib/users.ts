import bcrypt from "bcryptjs";

type User = {
  id: number;
  email: string;
  password: string;
};

export const users: User[] = [
  {
    id: 1,
    email: "demo@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
];
