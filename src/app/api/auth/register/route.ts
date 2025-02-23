// app/api/register/route.js
import {NextResponse} from "next/server";

export async function POST(request) {
  const {email, password} = await request.json();

  // Panggil API Be Syimphony untuk register
  const response = await fetch("https://be-syimphony.com/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });

  const data = await response.json();

  if (response.ok) {
    return NextResponse.json({message: "Registration successful"});
  } else {
    return NextResponse.json(
      {error: data.error || "Registration failed"},
      {status: 400},
    );
  }
}
