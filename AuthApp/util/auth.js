import axios from "axios";
import { FIREBASE_API_KEY } from "@env";


const rootUrl = "https://identitytoolkit.googleapis.com/v1/accounts:";

async function authenticate(mode, email, password) {
  const url = `${rootUrl}${mode}?key=${FIREBASE_API_KEY}`

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export async function createUser(email, password) {
  const token = await authenticate('signUp', email, password);
  return token;
}

export async function logIn(email, password){
  const token = await authenticate('signInWithPassword', email, password);
  return token;
}
