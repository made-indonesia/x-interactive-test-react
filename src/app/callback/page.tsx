"use client";

import {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

const ExactCallback = () => {
  const router = useRouter();
  const hasRun = useRef(false); // ⬅️ Track if callback has run

  useEffect(() => {
    if (hasRun.current) return; // ✅ Prevent multiple executions
    hasRun.current = true;

    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (!code || !state) {
        console.error("Missing code or state");
        return;
      }

      const bearerToken = localStorage.getItem("jwtToken");
      console.log(bearerToken);
      if (!bearerToken) {
        console.error("Bearer token is missing");
        return;
      }

      try {
        const response = await fetch(
          `https://staging-symfony.admin-developer.com/connect/exact/callback?code=${encodeURIComponent(
            code,
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Callback failed");
        }

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
        }
        if (data.refresh_token) {
          localStorage.setItem("refreshToken", data.refresh_token);
        }

        router.push("/dashboard");
      } catch (error) {
        console.error("SSO Callback Error:", error);
      }
    };

    handleCallback();
  }, [router]);

  return <p>Handling SSO callback, please wait...</p>;
};

export default ExactCallback;
