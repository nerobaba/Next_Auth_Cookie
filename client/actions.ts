"use server";

import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, defaultSession } from "./lib";
import { cookies } from "next/headers";
import { error } from "console";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

let username = "john";
let isPro = true;
let isBlocked = true;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  session.isBlocked = isBlocked;
  session.isPro = isPro;

  return session;
};
export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const formUserName = formData.get("username");

  const formPassword = formData.get("password");

  if (formUserName !== username) {
    return { error: "Wrong Credentials" };
  }

  session.userId = "1";
  session.username = formUserName;
  session.isPro = isPro;
  session.isLoggedIn = true;

  await session.save();

  redirect("/");
};
export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export const changePremium = async () => {
  const session = await getSession();

  isPro = !session.isPro;

  session.isPro = isPro;

  await session.save();

  revalidatePath("/profile");
};

export const changeUsername = async (formData: FormData) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  username = newUsername;

  session.username = username;
  await session.save();
  revalidatePath("/profile");
};
