import { login } from "@/actions";
import React from "react";

const LoginForm = () => {
  return (
    <div>
      <form action={login}>
        <input type="text" name="username" required placeholder="username" />
        <input
          type="password"
          name="password"
          required
          placeholder="password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
