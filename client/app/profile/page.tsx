import { changePremium, changeUsername, getSession } from "@/actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="profile">
      <h1>Welcome to the homepage</h1>
      <p>
        Welcome <b>{session.username}</b>
      </p>
      <span>
        You are a <b>{session.isPro ? "Premium" : "Free"}</b>
      </span>
      <form action={changePremium}>
        <button>{session.isPro ? "Cancel" : "Buy"} Premium</button>
      </form>

      <form action={changeUsername}>
        <input
          type="text"
          name="username"
          required
          placeholder={session.username}
        />
        <button>Update</button>
      </form>
    </div>
  );
}
