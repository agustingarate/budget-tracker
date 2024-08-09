import axios from "axios";
import { FIREBASE_API_KEY } from "../.env/api";
import { AuthMode } from "../data/enums";
import { createBalance, updateBalance } from "./balance";
import { User } from "../data/models/user";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1";

export async function auth(email: string, password: string, mode: AuthMode) {
  const response = await axios.post(
    `${BASE_URL}/accounts:${mode.valueOf()}?key=${FIREBASE_API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    },
  );
  const uid = response.data.localId;
  const user: User = {
    id: response.data.localId,
    token: response.data.idToken,
  };
  if (mode === AuthMode.signUp && uid != null) {
    await createBalance(uid);
  }

  return user;
}
