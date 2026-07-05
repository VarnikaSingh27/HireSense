"use server";

import { cookies } from "next/headers";

export async function fetchUser() {
  const cookieStore = cookies();
  const email = cookieStore.get("mock_user_email")?.value || "";
  const name = cookieStore.get("mock_user_name")?.value || "User";
  const id = cookieStore.get("mock_user_id")?.value || "";

  const given_name = name.split(" ")[0];
  const family_name = name.split(" ").slice(1).join(" ") || "";

  return {
    given_name,
    family_name,
    email,
    picture: "",
    id,
  };
}
