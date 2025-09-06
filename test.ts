import { userAdded } from "./src/main/reducers/users.ts";
import { store } from "./src/main/store.ts";

const dispatch = store.dispatch;

dispatch(
  userAdded({
    email: "abcd",
    aadhaar: "123",
    firstName: "soham",
    lastName: "jobanputra",
    password: "abcd",
  }),
);

dispatch(
  userAdded({
    email: "abc",
    aadhaar: "123",
    firstName: "sohamj",
    lastName: "jobanputra",
    password: "abcd",
  }),
);

// dispatch(
//   userUpdated({
//     identity: { aadhaar: "123" },
//     updates: {
//       email: "abc",
//       firstName: "sohamj",
//       lastName: "sjobanputra",
//     },
//   })
// );

console.log(store.getState());
