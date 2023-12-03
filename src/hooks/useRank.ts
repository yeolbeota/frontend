import { authInstance } from "@/api";
import { useQuery } from "react-query";

export function useRank() {
  return useQuery(
    "ranking",
    () =>
      authInstance()
        .get(`/ranking`)
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}
