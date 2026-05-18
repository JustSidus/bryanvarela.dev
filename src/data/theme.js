/**
 * Theme configuration - edit this file to change accent color, density, font, etc.
 */
export const THEME = {
  accent: "#58A6FF",
  density: "compact",
  fontProse: "Inter",
  showActivityRail: true,
  perFileAccent: true,
};

/**
 * Convert a hex color to a soft (semi-transparent) version.
 */
export const hexToSoft = (hex, alpha) => {
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return hex + a;
};
