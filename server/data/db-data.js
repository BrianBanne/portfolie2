require("dotenv").config();

const url =
  "https://png.pngtree.com/png-clipart/20190516/original/pngtree-premium-white-t-shirt--mockup-png-image_3635949.jpg";
//hva er sku?? satt id til sku for nå
const PRODUCTS = [
  {
    id: 111,
    name: "Dårllig teve",
    sku: 111,
    price: 200,
    stockStatus: 0,
    imageUrl: url,
    description: "Fet greie",
    shortDescription: '"Litt lengre tekst om en fet greie',
  },
  {
    id: 122,
    name: "Grei tskjorte",
    price: 250,
    sku: 122,
    stockStatus: 5,
    imageUrl: url,
    description: "Veldig fet greie",
    shortDescription: '"Litt lengre tekst om en veldig fet greie',
  },
  {
    id: 321,
    name: "Ok tskjorte",
    price: 2499,
    sku: 321,
    stockStatus: 2,
    imageUrl: url,
    description: "Ok greie, funker til det meste",
    shortDescription: '"Litt lengre tekst om en ok  greie',
  },
];

const ORDERS = [
  {
    orderId: "#123",
    firstName: "Hans",
    lastName: "emann",
    userId: 110,
    status: "COMPLETED",
    amount: 2500,
    date: Date.now(),
  },
  {
    orderId: "#321",
    firstName: "Brian",
    lastName: "Mann",
    userId: 111,
    status: "CANCELLED",
    amount: 1500,
    date: Date.now(),
  },
  {
    orderId: "#322",
    firstName: "Per",
    lastName: "Spellemann",
    userId: 111,
    status: "CANCELLED",
    amount: 1500,
    date: Date.now(),
  },
];

const ADMINS = [
  {
    email: process.env.MONGO_ADMIN_EMAIL,
    password: process.env.MONGO_ADMIN_PASSWORD,
    firstName: "Admin",
    lastName: "Adminsen",
    userType: "ADMIN",
  },
];

const DB_DATA = { PRODUCTS, ORDERS, ADMINS };
module.exports = DB_DATA;
