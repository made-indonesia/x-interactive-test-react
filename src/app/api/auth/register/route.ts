import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {users} from "@/lib/users";

// Handle POST requests
export async function POST(req: NextRequest) {
  // console.log("email");
  const {email, password} = await req.json();
  const userExists = users.find(user => user.email === email);

  console.log(email, password);

  if (userExists) {
    console.log("User already exists");
    return NextResponse.json({message: "User already exists"}, {status: 400});
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({
    id: users.length + 1,
    email,
    password: hashedPassword,
  });

  return NextResponse.json(
    {message: "User registered successfully"},
    {status: 201},
  );
}

// Handle unsupported methods (optional)
export function OPTIONS() {
  return NextResponse.json({message: "OK"}, {status: 200});
}
