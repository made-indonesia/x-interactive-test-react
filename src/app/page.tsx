"use client";
import Body from "@/components/atoms/Body";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import FieldInput from "@/components/molecules/FieldInput";
import PDFDisplay from "@/components/molecules/PDFDisplay";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";

export default function Dashboard() {
  // const [user, setUser] = useState(null);
  // const router = useRouter();

  // // ✅ Fetch user data inside useEffect
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.post("/api/me");
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch user:", error);
  //       router.push("/login"); // Redirect to login if unauthorized
  //     }
  //   };

  //   fetchUser();
  // }, [router]);

  // const handleLogout = async () => {
  //   if (confirm("Are you sure you want to logout?")) {
  //     await axios.get("/api/logout");
  //     router.push("/login"); // Redirect after logout
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-lg container">
        <div className="flex items-center justify-between">
          <Heading
            variant="h6"
            weight="medium"
            as="h2"
            className="text-black mb-3">
            Dashboard
          </Heading>
          <Button
            variant={"danger"}
            // onClick={handleLogout}
            className="mt-4 w-fit">
            Logout
          </Button>
        </div>

        {/* <Body className="mb-4 text-black">Welcome {user?.email || "user"}</Body> */}

        <form className="flex items-end gap-4">
          <FieldInput
            label="Customer ID"
            placeholder="Customer ID"
            className="text-black"
          />
          <Button variant={"primary"} className="h-fit">
            Get Customer Data
          </Button>
        </form>

        {/* <PDFDisplay /> */}
      </div>
    </div>
  );
}
