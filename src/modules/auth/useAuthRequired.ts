import { useAuth } from "./AuthContext"

export function useAuthRequired() {
  const { user } = useAuth()

  if (!user) {
    throw new Error("useAuthRequired: user is null, route should be protected")
  }

  return user
}