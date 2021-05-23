const config = require('../config')

const url =
  "https://png.pngtree.com/png-clipart/20190516/original/pngtree-premium-white-t-shirt--mockup-png-image_3635949.jpg";
const socksurl =
  "https://i.pinimg.com/originals/36/17/0a/36170a902ea0452cc9a1918080ef3be2.png";
const pantsurl =
  "http://pngimg.com/uploads/jeans/jeans_PNG5779.png"
const shoesurl =
  "https://banner2.cleanpng.com/20180213/pzw/kisspng-oxford-shoe-dress-shoe-leather-men-s-shoes-tide-shoes-carved-england-5a837b7a0c57e2.3487388715185662660506.jpg";
const secret =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Ffree-stock-clip-art-hollow-hand-painted-transprent-question-mark-vector-png-transparent-png--714242822142902902%2F&psig=AOvVaw2JRRAkI4yhNq9p-ZQTCzwq&ust=1621872285903000&source=images&cd=vfe&ved=2ahUKEwjmkIadl-DwAhWGsyoKHWNYCA4Qr4kDegUIARCrAQ"
const crocsurl =
  "https://p.kindpng.com/picc/s/210-2103602_transparent-crocs-png-crocs-transparent-background-png-download.png";
const glovesurl =
  "https://banner2.cleanpng.com/20171201/68f/leather-gloves-png-image-5a220055e5bef1.2933278115121777499411.jpg";

const PRODUCTS = [
  {
    id: 111,
    name: "Dårllig teve",
    price: 200,
    stockStatus: 0,
    imageUrl: url,
    description: "Fet greie",
    shortDescription: 'Litt lengre tekst om en fet greie',
  },
  {
    id: 123,
    name: "Kule sko",
    price: 450,
    stockStatus: 16,
    imageUrl: shoesurl,
    description: "Svarte lærsko",
    shortDescription: 'Lang tekst om svarte sko',
  },
  {
    id: 234,
    name: "Ordenlige bukser",
    price: 600,
    stockStatus: 5,
    imageUrl: pantsurl,
    description: "Blå jeans",
    shortDescription: 'Blå jeans som passer perfekt til fest',
  },
  {
    id: 456,
    name: "Secret item",
    price: 15000,
    stockStatus: 99,
    imageUrl: secret,
    description: "OMG U NEED THIS",
    shortDescription: 'if you dont have this, youre not it',
  },
  {
    id: 678,
    name: "Crocs med hull",
    price: 1,
    stockStatus: 1,
    imageUrl: crocsurl,
    description: "Grønne crocs",
    shortDescription: 'Imponer familie og venner med dette mesterverket',
  },
  {
    id: 444,
    name: "Kule hansker",
    price: 150,
    stockStatus: 8,
    imageUrl: glovesurl,
    description: "Svarte motorsykkelhansker",
    shortDescription: 'Perfekt til å kjøre på landeveien med',
  },
  {
    id: 555,
    name: "Socks",
    price: 50,
    stockStatus: 50,
    imageUrl: socksurl,
    description: "Hvite sokker",
    shortDescription: 'Hvite sokker, 2 stykker, 1 par',
  },
  {
    id: 122,
    name: "Grei tskjorte",
    price: 250,
    stockStatus: 5,
    imageUrl: url,
    description: "Veldig fet greie",
    shortDescription: 'Litt lengre tekst om en veldig fet greie',
  },
  {
    id: 321,
    name: "Ok tskjorte",
    price: 2499,
    stockStatus: 2,
    imageUrl: url,
    description: "Ok greie, funker til det meste",
    shortDescription: 'Litt lengre tekst om en ok  greie',
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
    email: config.adminEmail,
    password: config.adminPassword,
    firstName: "Admin",
    lastName: "Adminsen",
    userType: "ADMIN",
  },
];

module.exports = { PRODUCTS, ADMINS, ORDERS };
