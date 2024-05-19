import { logout } from "@/actions";
import React from "react";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <button>logout</button>
    </form>
  );
}
