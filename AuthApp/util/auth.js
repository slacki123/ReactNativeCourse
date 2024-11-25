import axios from "axios";
import { FIREBASE_API_KEY } from "@env";


const rootUrl = "https://identitytoolkit.googleapis.com";
const signUpUrl = "/v1/accounts:signUp";

export async function createUser(email, password) {
  const response = await axios.post(`${rootUrl}${signUpUrl}?key=${FIREBASE_API_KEY}`, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  console.log(response.status);
}
