"use client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import FieldInput from "@/components/molecules/FieldInput";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import Body from "@/components/atoms/Body";

type FormData = {
  email: string;
  password: string;
};

const defaultValues = {
  aggrement: false,
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  aggrement: Yup.boolean(),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();

  const handleSSOLogin = async () => {
    // Arahkan pengguna ke endpoint SSO
    const response = await fetch("/api/exact-sso", {
      method: "GET",
    });
    const data = await response.json();

    if (data.url) {
      // Redirect pengguna ke halaman login Exact Online
      window.location.href = data.url;
    }
  };

  // const handleLogin = async () => {
  //   const response = await fetch("/api/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({email, password}),
  //   });
  //   const data = await response.json();

  //   if (data.accessToken) {
  //     router.push("/dashboard");
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-6 bg-white rounded-lg shadow-lg flex align-center justify-center flex-col ">
        <Heading
          variant="h4"
          weight="medium"
          as="h1"
          className="text-black mb-3">
          Login
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <Button size="lg" className="w-full">
            Login
          </Button>
        </form>

        <Body
          variant="md"
          weight="medium"
          className="text-primary-500"
          as={Link}
          href={"/register"}>
          Don't have an account? Register here
        </Body>

        <button onClick={handleSSOLogin}>Login with Exact Online</button>
      </div>
    </div>
  );
}
