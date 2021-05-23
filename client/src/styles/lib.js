export function invertColors(invert = false) {
  const root = document.documentElement;
  const COLORS = ["#f6f5f5", "#d3e0ea", "#1687a7", "#276678"];

  if (invert) {
    root.style.setProperty("--primary-light", COLORS[2]);
    root.style.setProperty("--secondary-light", COLORS[3]);
    root.style.setProperty("--secondary-dark", COLORS[0]);
    root.style.setProperty("--primary-dark", COLORS[1]);
  } else {
    root.style.setProperty("--primary-light", COLORS[0]);
    root.style.setProperty("--secondary-light", COLORS[1]);
    root.style.setProperty("--secondary-dark", COLORS[2]);
    root.style.setProperty("--primary-dark", COLORS[3]);
  }
}
