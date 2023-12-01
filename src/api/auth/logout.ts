import { authInstance } from "..";

export default async function loggout() {
  return authInstance().get("/auth/logout");
}
