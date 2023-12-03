import { authInstance } from "@/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

export enum StudentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export function useAgreeUser() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) =>
      authInstance().patch(`/user/status/${id}`, {
        status: StudentStatus.APPROVED,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users-info");
      },
    }
  );
}

export function useDenyUser() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) =>
      authInstance().patch(`/user/status/${id}`, {
        status: StudentStatus.REJECTED,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users-info");
      },
    }
  );
}
