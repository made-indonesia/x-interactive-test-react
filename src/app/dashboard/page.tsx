"use client";
import Body from "@/components/atoms/Body";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import List from "@/components/atoms/list";
import FieldInput from "@/components/molecules/FieldInput";
import {useAuth} from "@/hooks/useAuth";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [user, setUser] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {handleSSOLogin, handleLogout} = useAuth();
  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomers(response.data.data);
        setFilteredCustomers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.warn("Unauthorized! Redirecting to login...");
          router.push("/login");
        }
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
        if (!response.data.is_login_exact) {
          handleSSOLogin();
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.warn("Unauthorized! Redirecting to login...");
          router.push("/login");
        }
      }
    };

    fetchUser();
  }, []);

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

  const handleSelectCustomer = async (id: string) => {
    try {
      const response = await axios.get(`/api/customer/${id}`, {
        responseType: "blob",
      });

      const pdfBlob = new Blob([response.data], {type: "application/pdf"});
      const pdfUrl = URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Failed to fetch customer PDF:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        router.push("/login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg container">
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
        <Body as="p" className="text-black mb-3">
          halo {user}
        </Body>
        <div className="flex items-end gap-4">
          <FieldInput
            placeholder="Type customer name"
            className="text-black"
            value={customerId}
            onChange={handleFilter}
            type="search"
          />
        </div>

        {isLoading ? (
          <div className="mt-6 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="mt-6">
            <Body
              as="p"
              className="text-black mb-2 font-medium"
              weight="medium">
              Customers List
            </Body>
            {filteredCustomers?.length > 0 ? (
              <List type="ul">
                {filteredCustomers?.map((customer: any) => (
                  <Body
                    key={customer.id}
                    as="li"
                    variant="md"
                    weight="medium"
                    className="cursor-pointer p-2 border rounded hover:bg-gray-100 text-black font-medium list-none"
                    onClick={() => handleSelectCustomer(customer.id)}>
                    {customer.name}
                  </Body>
                ))}
              </List>
            ) : (
              <div className="text-gray-500">No customers found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
