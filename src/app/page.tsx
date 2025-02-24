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
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(""); // For the input field
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomers(response.data.data);
        console.log("Fetched Customers:", response.data.data); // ✅ Corrected logging
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try {
        await axios.get("/api/logout");
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const handleGetCustomerData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) {
      alert("Please enter a Customer ID");
      return;
    }

    try {
      const response = await axios.get(`/api/customer/${customerId}`);
      console.log("Customer Data:", response.data);
      // You can use this data in PDFDisplay or another component
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    }
  };

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
            onClick={handleLogout}
            className="mt-4 w-fit">
            Logout
          </Button>
        </div>

        <form className="flex items-end gap-4" onSubmit={handleGetCustomerData}>
          <FieldInput
            label="Customer ID"
            placeholder="Customer ID"
            className="text-black"
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
          />
          <Button variant={"primary"} type="submit" className="h-fit">
            Get Customer Data
          </Button>
        </form>

        {/* Example to display fetched customers */}
        <div className="mt-6">
          <Heading variant="h6" as="h3" className="text-black mb-2">
            Customers List
          </Heading>
          <ul>
            {customers.map((customer: any) => (
              <li key={customer.id}>{customer.name}</li>
            ))}
          </ul>
        </div>

        {/* <PDFDisplay /> */}
      </div>
    </div>
  );
}
