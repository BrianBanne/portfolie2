const url =
  "https://png.pngtree.com/png-clipart/20190516/original/pngtree-premium-white-t-shirt--mockup-png-image_3635949.jpg";

const PRODUCTS = [
  {
    id: 1,
    name: "Kul tskjorte",
    sku: 111,
    price: 200,
    stockStatus: 0,
    imageUrl: url,
    description: "Fet greie",
  },
  {
    id: 2,
    name: "Grei tskjorte",
    price: 250,
    sku: 122,
    stockStatus: 5,
    imageUrl: url,
    description: "Veldig fet greie",
  },
  {
    id: 32,
    name: "Ok tskjorte",
    price: 2499,
    sku: 321,
    stockStatus: 2,
    imageUrl: url,
    description: "Ok greie, funker til det meste",
  },
];

const ORDERS = [
  {
    orderId: "#123",
    userId: 110,
    status: "COMPLETED",
    amount: 2500,
    date: Date.now()
  },
  {
    orderId: "#321",
    userId: 111,
    status: "CANCELLED",
    amount: 1500,
    date: Date.now()
  },
  {
    orderId: "#322",
    userId: 111,
    status: "CANCELLED",
    amount: 1500,
    date: Date.now()

  },
];

const USERS = [
  {
    userId: 111,
    email: "brian@test.com",
    password: "test123",
    firstName: "Brian",
    lastName: "Banne",
  },
  {
    userId: 110,
    email: "hans@test.com",
    password: "test123",
    firstName: "Hans",
    lastName: "Klevstad",
  },
];

const ADMINS = [
  {
    userId: 1,
    email: "hans@test.com",
    password: "test123",
    firstName: "Hans",
    lastName: "Klevstad",
  },
];

export const TestAPI = { PRODUCTS, ORDERS, USERS, ADMINS };
