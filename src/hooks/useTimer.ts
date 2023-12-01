import { authInstance } from "@/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useTimerById(id: string) {
  return useQuery(
    ["timer", id],
    () =>
      authInstance()
        .get(`/timer/today/${id}`)
        .then((res) => res.data),
    {
      retry: false,
    }
  );
}

export function useTimer() {
  return useQuery("timer", () =>
    authInstance()
      .get("/timer")
      .then((res) => res.data)
  );
}

export function useTotalTimer() {
  return useQuery("total-timer", () =>
    authInstance()
      .get("/timer/total")
      .then((res) => res.data)
  );
}

export function useStartTimer() {
  const queryClient = useQueryClient();

  return useMutation(() => authInstance().post("/timer/start"), {
    onSuccess: () => {
      queryClient.invalidateQueries("timer");
      queryClient.invalidateQueries("timer-status");
    },
  });
}

export function useStopTimer() {
  const queryClient = useQueryClient();

  return useMutation(() => authInstance().post("/timer/stop"), {
    onSuccess: () => {
      queryClient.invalidateQueries("timer");
      queryClient.invalidateQueries("timer-status");
    },
  });
}
