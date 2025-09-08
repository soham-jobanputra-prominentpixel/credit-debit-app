export const initialData = {
  users: {
    ids: ["123456789013", "123456789012", "123456789011"],
    entities: {
      "123456789011": {
        firstName: "Prem",
        lastName: "Jobanputra",
        email: "prem.jobanputra@prominentpixel.com",
        aadhaar: "123456789011",
        password: "Prem@123",
        isLoggedIn: true,
        isAdmin: false,
        account: "521877a8-182b-4356-b0cc-786b3f575297",
        balance: 36000,
        joinedAt: "2025-09-08T09:08:27.097Z",
        lastLogin: "2025-09-08T09:21:29.743Z",
      },
      "123456789012": {
        firstName: "Soham",
        lastName: "Jobanputra",
        email: "soham.jobanputra@prominentpixel.com",
        aadhaar: "123456789012",
        password: "Soham@123",
        isLoggedIn: false,
        isAdmin: false,
        account: "a5e5fd40-bd50-44eb-9598-2b8ca885c9cf",
        balance: 14000,
        joinedAt: "2025-09-08T09:11:16.523Z",
        lastLogin: null,
      },
      "123456789013": {
        firstName: "Kishan",
        lastName: "Jobanputra",
        email: "kishan.jobanputra@prominentpixel.com",
        aadhaar: "123456789013",
        password: "Kishan@123",
        isLoggedIn: true,
        isAdmin: true,
        account: "d15a530c-07bc-430f-a249-b43214ceb5f7",
        balance: 0,
        joinedAt: "2025-09-08T12:23:26.426Z",
        lastLogin: "2025-09-08T12:23:42.683Z",
      },
    },
  },
  currentUser: "kishan.jobanputra@prominentpixel.com",
  transactions: {
    ids: ["3NN7zudaMyLKfpaZIIje0", "crA3DLmBQjVgdgWVTLbPE"],
    entities: {
      "3NN7zudaMyLKfpaZIIje0": {
        id: "3NN7zudaMyLKfpaZIIje0",
        from: {
          account: "521877a8-182b-4356-b0cc-786b3f575297",
        },
        to: {
          account: "a5e5fd40-bd50-44eb-9598-2b8ca885c9cf",
        },
        amount: 25000,
        timestamp: "2025-09-08T10:06:01.193Z",
      },
      crA3DLmBQjVgdgWVTLbPE: {
        id: "crA3DLmBQjVgdgWVTLbPE",
        from: {
          account: "a5e5fd40-bd50-44eb-9598-2b8ca885c9cf",
        },
        to: {
          account: "521877a8-182b-4356-b0cc-786b3f575297",
        },
        amount: 11000,
        timestamp: "2025-09-08T11:32:31.794Z",
      },
    },
  },
};
