"use client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import FieldInput from "@/components/molecules/FieldInput";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import Body from "@/components/atoms/Body";
import axios from "axios";
import {useState} from "react";
import {useErrorToast} from "@/hooks/useErrorToast";
import {useAuth} from "@/hooks/useAuth";

type FormData = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const {handleLogin, isLoading} = useAuth();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col w-[25rem]">
        <Heading
          variant="h4"
          weight="medium"
          as="h1"
          className="text-black mb-3 text-center">
          Sign In
        </Heading>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <FieldInput
            label="Email"
            placeholder="email"
            {...register("email")}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            className="text-black"
          />

          <FieldInput
            label="Password"
            type="password"
            placeholder="password"
            {...register("password")}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            className="text-black"
          />

          <Button
            size="lg"
            className="w-full"
            type="submit"
            disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </form>

        <Body
          variant="md"
          weight="medium"
          className="text-black mt-2 text-center"
          as="p">
          Don't have an account?
          <Body
            variant="md"
            weight="medium"
            className="text-primary-500 mt-2 text-center"
            as={Link}
            href={"/register"}>
            {" "}
            Sign up here
          </Body>
        </Body>
      </div>
    </div>
  );
}
