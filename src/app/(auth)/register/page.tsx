"use client";
import Body from "@/components/atoms/Body";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import FieldInput from "@/components/molecules/FieldInput";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

type FormData = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  };

  // const handleRegister = async () => {
  //   // Kirim data register ke API Be Syimphony
  //   const response = await fetch("/api/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     // Redirect ke halaman login setelah registrasi berhasil
  //     router.push("/login");
  //   } else {
  //     // Tampilkan pesan error jika registrasi gagal
  //     alert(data.error || "Registration failed");
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <Heading
          variant="h4"
          weight="medium"
          as="h1"
          className="text-black mb-3">
          Register
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
            Register
          </Button>
        </form>

        <Body
          variant="md"
          weight="medium"
          className="text-primary-500"
          as={Link}
          href={"/login"}>
          Already have an account? Login here
        </Body>
      </div>
    </div>
  );
}
