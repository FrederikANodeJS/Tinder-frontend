import { atom } from "recoil";


// håndtering af brugeren authentication
export const authState = atom({
  key: "authState",
  default: {
    isAuth: false,
    token: "",
    userId: 1,
  },
});
