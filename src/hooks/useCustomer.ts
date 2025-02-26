import axios from "axios";
import {useRouter} from "next/navigation";
import {useState, useMemo} from "react";

export const useCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

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

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customers");
      setCustomers(response.data.data);
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

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerId(e.target.value);
  };

  const filteredCustomers = useMemo(() => {
    if (!customerId.trim()) return customers;
    return customers.filter((customer: any) =>
      customer.name.toLowerCase().includes(customerId.toLowerCase()),
    );
  }, [customers, customerId]);

  return {
    customerId,
    filteredCustomers,
    isLoading,
    handleFilter,
    fetchCustomers,
    handleSelectCustomer,
  };
};
