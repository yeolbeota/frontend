import { authInstance } from "@/api";
import { useQuery } from "react-query";

export function useFineInfo() {
  return useQuery(
    "fine-info",
    () =>
      authInstance()
        .get("/fine")
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}

export function useMyFineInfo() {
  return useQuery(
    "my-fine-info",
    () =>
      authInstance()
        .get("/fine/me")
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}
