import { authInstance } from "@/api";
import { useQuery } from "react-query";

export function useGroupData() {
  return useQuery(
    "group-info",
    () =>
      authInstance()
        .get("/group")
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}
