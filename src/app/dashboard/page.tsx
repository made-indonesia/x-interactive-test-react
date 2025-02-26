"use client";
import Body from "@/components/atoms/Body";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import List from "@/components/atoms/list";
import FieldInput from "@/components/molecules/FieldInput";
import {useAuth} from "@/hooks/useAuth";
import {useCustomer} from "@/hooks/useCustomer";
import {useEffect} from "react";

export default function Dashboard() {
  const {handleLogout, fetchUser, user} = useAuth();
  const {
    fetchCustomers,
    handleFilter,
    handleSelectCustomer,
    isLoading,
    filteredCustomers,
    customerId,
  } = useCustomer();

  useEffect(() => {
    fetchUser();
    fetchCustomers();
  }, []);

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
              weight="medium"
              variant="xl">
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
