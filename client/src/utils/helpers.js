export function formatDate(date) {
  return new Intl.DateTimeFormat("no").format(date);
}

export function getObjectSize(obj) {
  let size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

export function validateProducts(product) {
  const objectSize = getObjectSize(product);

  if (objectSize < 6) return false;

  if (product.name.length === 0) {
    return false;
  } else if (product.price <= 0) {
    return false;
  } else if (product.shortDescription.length === 0) {
    return false;
  } else if (product.description.length === 0) {
    return false;
  } else if (product.stockQuantity < 0) {
    return false;
  } else {
    return true;
  }
}

//kanskje returnere Strong, weak etc?
export function passwordChecker(password) {
  // 1 lowercase, 1 uppercase, 1 tall, 1 spesiell char ie. !@# osv, 8 char langt
  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  // minst 6 og alle andre kravene inntreffer, 1 tall osv. eller ingen tall men møter de andre kravene
  let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  if (strongPassword.test(password)) {
    return 1;
  } else if (mediumPassword.test(password)) {
    return 2;
  } else {
    return 3;
  }
}
