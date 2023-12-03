import { authInstance } from "@/api";
import { useQuery } from "react-query";

export function useUserInfo() {
  return useQuery(
    "user-info",
    () =>
      authInstance()
        .get("/auth")
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}

export function useUsersInfo() {
  return useQuery(
    "users-info",
    () =>
      authInstance()
        .get("/user")
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}
