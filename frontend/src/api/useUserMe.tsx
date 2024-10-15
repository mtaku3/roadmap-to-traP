import { User } from "@/models/user";
import useSWR from "swr";

export default function useUserMe() {
  const { data, error, isLoading } = useSWR<User>("/api/v1/user/me");
  return {
    user: data,
    error,
    isLoading,
  };
}
