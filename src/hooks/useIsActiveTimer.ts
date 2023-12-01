import { authInstance } from "@/api";
import { useQuery } from "react-query";

export function useIsActiveTimer() {
  return useQuery(
    "timer-status",
    () =>
      authInstance()
        .get(`/timer/status`)
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}

export function useIsActiveTimerById(id: string) {
  return useQuery(
    ["timer-status", id],
    () =>
      authInstance()
        .get(`/timer/status/${id}`)
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}
