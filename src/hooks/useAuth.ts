import {useState, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {useErrorToast} from "@/hooks/useErrorToast";

interface LoginData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  //   const [customers, setCustomers] = useState([]);
  //   const [filteredCustomers, setFilteredCustomers] = useState([]);
  //   const [user, setUser] = useState<string | null>(null);
  const {showError} = useErrorToast();
  const router = useRouter();

  // SSO Login
  const handleSSOLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/exact-sso");
      if (response.data.auth_url) {
        window.location.href = response.data.auth_url;
      } else {
        showError("SSO URL not found");
      }
    } catch (error: any) {
      showError(error.response?.data?.error || "SSO Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Check Exact Login
  const checkLoginExact = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/me/");
      const {is_login_exact} = response.data;

      if (is_login_exact) {
        router.push("/dashboard");
      } else {
        await handleSSOLogin();
      }
    } catch (error: any) {
      showError(error.response?.data?.error || "Failed to check login status");
    } finally {
      setIsLoading(false);
    }
  };

  // Standard Login
  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/login", data);
      localStorage.setItem("jwtToken", response.data.token);
      await checkLoginExact();
    } catch (error: any) {
      showError(error.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try {
        await axios.get("/api/logout");
        localStorage.removeItem("jwtToken");
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  //   register
  const handleRegister = async (data: FormData) => {
    try {
      const response = await axios.post("/api/auth/register", data);

      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data?.error || "Registration failed");
      } else {
        showError("An unexpected error occurred");
      }
    }
  };

  // Fetch Customers on Mount
  //   useEffect(() => {
  //     const fetchCustomers = async () => {
  //       setIsLoading(true);
  //       try {
  //         const response = await axios.get("/api/customers");
  //         setCustomers(response.data.data);
  //         setFilteredCustomers(response.data.data);
  //       } catch (error) {
  //         console.error("Failed to fetch customers:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchCustomers();
  //   }, []);

  // Fetch User on Mount
  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         const response = await axios.get("/api/me");
  //         setUser(response.data.email);
  //         if (!response.data.is_login_exact) {
  //           handleSSOLogin();
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch user:", error);
  //       }
  //     };

  //     fetchUser();
  //   }, []);

  return {
    isLoading,
    handleLogin,
    handleLogout,
    handleSSOLogin,
    checkLoginExact,
    handleRegister,
  };
};
