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
