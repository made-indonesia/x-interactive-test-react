"use client";
import {useSession, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";

export default function Dashboard() {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    console.log("Redirecting to login page");

    if (status === "unauthenticated") {
      router.push("/login");
      console.log("Redirecting to login page");
    }
  }, [status, router]);

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId) {
      alert("Please enter a Customer ID");
      return;
    }

    try {
      const response = await fetch(`/api/customer/${customerId}`);
      if (!response.ok) throw new Error("Customer not found");

      router.push(`/customer/${customerId}/pdf`);
    } catch (error) {
      alert("Error fetching customer data");
    }
  };

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="mb-4">Welcome, {session?.user?.name || "User"}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Customer ID"
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Get Customer Data
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
}
