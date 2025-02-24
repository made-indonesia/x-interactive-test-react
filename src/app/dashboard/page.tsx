"use client";
import Body from "@/components/atoms/Body";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import FieldInput from "@/components/molecules/FieldInput";
import PDFDisplay from "@/components/molecules/PDFDisplay";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [user, setUser] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomers(response.data.data);
        setFilteredCustomers(response.data.data);
        console.log("Fetched Customers:", response.data.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/me");
        setUser(response.data.email);
        console.log("Fetched User:", response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
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

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerId(value);

    if (value.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer: any) =>
        customer.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleReset = () => {
    setCustomerId("");
    setFilteredCustomers(customers);
  };

  const handleSelectCustomer = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/customer/${id}`);
      console.log("Customer Data:", response.data);
      alert(`Fetched data for Customer ID: ${id}`);
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
            variant="danger"
            onClick={handleLogout}
            className="mt-4 w-fit">
            Logout
          </Button>
        </div>
        <Body>halo {user}</Body>
        <div className="flex items-end gap-4">
          <FieldInput
            label="Filter Customer"
            placeholder="Type customer name"
            className="text-black"
            value={customerId}
            onChange={handleFilter}
          />
          <Button variant="primary" onClick={handleReset} className="h-fit">
            Reset
          </Button>
        </div>

        {isLoading ? (
          <div className="mt-6 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="mt-6">
            <Heading variant="h6" as="h3" className="text-black mb-2">
              Customers List
            </Heading>
            {filteredCustomers?.length > 0 ? (
              <ul className="space-y-2">
                {filteredCustomers?.map((customer: any) => (
                  <li
                    key={customer.id}
                    className="cursor-pointer p-2 border rounded hover:bg-gray-100"
                    onClick={() => handleSelectCustomer(customer.id)}>
                    {customer.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No customers found.</div>
            )}
          </div>
        )}

        {/* <PDFDisplay /> */}
      </div>
    </div>
  );
}
