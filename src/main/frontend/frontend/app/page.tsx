"use client";

import { useRouter } from "next/navigation";
import Home from "./home";

export default function Page() {
  const router = useRouter();

  return (
    <Home />
  );
}