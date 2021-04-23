export function invertColors(invert = false) {
  const root = document.documentElement;

  if (invert) {
    root.style.setProperty("--primary-light", "#1687a7");
    root.style.setProperty("--secondary-light", "#314e52");
    root.style.setProperty("--secondary-dark", "#f7f6e7");
    root.style.setProperty("--primary-dark", "#f6f5f5");
  } else {
    root.style.setProperty("--primary-light", "#f6f5f5");
    root.style.setProperty("--secondary-light", "#f7f6e7");
    root.style.setProperty("--secondary-dark", "#1687a7");
    root.style.setProperty("--primary-dark", "#314e52");
  }
}

/* --primary-light: #f6f5f5;
--secondary-light: #f7f6e7;
--secondary-dark: #1687a7;
--primary-dark: #314e52;
} */
