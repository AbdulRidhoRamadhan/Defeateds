"use client";

import { handleLogout } from "@/action";

export default function LogoutButton() {
  return <button onClick={() => handleLogout()}>Logout</button>;
}
