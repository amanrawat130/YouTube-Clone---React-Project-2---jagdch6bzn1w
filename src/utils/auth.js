import { useContext } from "react";
import { Context } from "../context/contextApi";

export function useAuth() {
  const { userToken } = useContext(Context);
  if (!userToken) {
    return false;
  } else {
    return true;
  }
}
