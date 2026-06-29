import { API_ROUTES } from "../api/apiRoutes";

export async function getClasses() {
  const res = await fetch(API_ROUTES.classes);

  if (!res.ok) throw new Error("Failed to fetch classes");

  return await res.json();
}