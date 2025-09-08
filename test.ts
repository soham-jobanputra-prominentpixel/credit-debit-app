import {
  selectCurrentUser,
  userAdded,
  userLoggedIn,
  userLoggedOut,
} from "./src/main/reducers/users.ts";
import { store } from "./src/main/store.ts";

const dispatch = store.dispatch;

dispatch(
  userAdded({
    email: "soham.jobanputra@prominentpixel.com",
    aadhaar: "12345678",
    firstName: "soham",
    lastName: "jobanputra",
    password: "soham@123",
  }),
);

dispatch(
  userLoggedIn({ aadhaar: "12345678" }),
);

dispatch(
  userLoggedOut({ aadhaar: "12345678" }),
);

console.log(store.getState());
console.log(localStorage);
console.log(sessionStorage);
console.log(selectCurrentUser(store.getState()));
