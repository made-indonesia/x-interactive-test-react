"use client";
import Body from "@/components/atoms/Body";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import FieldInput from "@/components/molecules/FieldInput";
import PDFDisplay from "@/components/molecules/PDFDisplay";
import PDFGenerator from "@/components/molecules/PDFGenerator";
import {useSession, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";

export default function Dashboard() {
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    console.log(status, session);
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      signOut({callbackUrl: "/login"});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-lg container">
        <Heading
          variant="h6"
          weight="medium"
          as="h2"
          className="text-black mb-3">
          Dashboard
        </Heading>
        <Body className="mb-4 text-black">
          Welcome {session?.user?.email || "user"}
        </Body>

        <form className="space-y-4">
          <FieldInput
            label="Customer ID"
            placeholder="Customer ID"
            className="text-black"
          />
          <Button variant={"primary"}>Get Customer Data</Button>
        </form>

        <button
          onClick={handleLogout}
          className="mt-4 w-fit px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>

        {/* <PDFGenerator /> */}
        <PDFDisplay />
      </div>
    </div>
  );
}
