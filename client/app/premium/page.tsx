import { getSession } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Premium() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  if (!session.isPro) {
    return (
      <div className="notPremium">
        <h1>Only premium users can see the content!</h1>
        <Link href="/profile">
          Go to the profile page to upgrade to premium
        </Link>
      </div>
    );
  }

  return (
    <div className="premium">
      <h1>Welcome {session.username} to the homepage</h1>
      <ul>
        <li>apple</li>
        <li>orange</li>
        <li>peach</li>
      </ul>
    </div>
  );
}
