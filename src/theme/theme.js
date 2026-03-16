// src/theme/theme.js
// LE COEUR DE L'IDENTITÉ VISUELLE - ESPOIR VIDEO (ROUGE CINÉMATIQUE / NOIR PROFOND)

// ═══════════════════════════════════════════════════════════════
// 1. PALETTE PRIMITIVE (Les ingrédients bruts)
// ═══════════════════════════════════════════════════════════════
export const PALETTE = {
  // Le Rouge Espoir (Identité)
  redCinematic: '#E50914',
  redDark: '#B81D24',
  redLight: '#FF4545',

  // Les Achromatiques (Fonds et Textes)
  pureBlack: '#000000',
  richBlack: '#0A0A0A',
  charcoal: '#1A1A1A',
  borderDark: '#262626',
  
  pureWhite: '#FFFFFF',
  softGray: '#A3A3A3',

  // Fonctionnel
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
};

// ═══════════════════════════════════════════════════════════════
// 2. COULEURS SÉMANTIQUES (L'usage dans l'application)
// ═══════════════════════════════════════════════════════════════
export const COLORS = {
  // Fonds
  background: PALETTE.richBlack,
  surface: PALETTE.charcoal,
  
  // Marque
  primary: PALETTE.redCinematic,
  primaryHover: PALETTE.redDark,

  // Textes
  textMain: PALETTE.pureWhite,
  textMuted: PALETTE.softGray,
  textInverse: PALETTE.pureWhite, // Pour le texte sur bouton primaire

  // UI
  border: PALETTE.borderDark,
  overlay: 'rgba(0, 0, 0, 0.75)',
  
  // Alertes
  success: PALETTE.success,
  error: PALETTE.danger,
};

// ═══════════════════════════════════════════════════════════════
// 3. TYPOGRAPHIE ET ESPACEMENTS (Design Tokens)
// ═══════════════════════════════════════════════════════════════
export const FONTS = {
  family: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },
  weights: {
    regular: '400', medium: '500', bold: '700', extrabold: '800'
  }
};

export const SPACING = {
  xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', xxl: '3rem'
};

export const BORDERS = {
  radius: {
    sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', pill: '9999px'
  }
};

const THEME = {
  PALETTE,
  COLORS,
  FONTS,
  SPACING,
  BORDERS
};

export default THEME;