export interface AtelierImage {
  id: string;
  url: string;
  fallbackUrl: string;
  alt: string;
  aspectRatio: '4:5' | '3:4' | '1:1' | '16:10' | '16:9';
  placeholderColor: '#E7E2D8' | '#B9AE9C'; // bone or clay
}

export const ATELIER_IMAGES = {
  hero: {
    id: 'hero',
    url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1400&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1400&q=80',
    alt: 'Hand-thrown stoneware sculptural vessels on natural unbleached linen in soft studio window light',
    aspectRatio: '4:5',
    placeholderColor: '#E7E2D8',
  },
  manifesto: {
    id: 'manifesto',
    url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80',
    alt: 'Architectural stoneware vessel casting a sharp diagonal shadow across raw limestone',
    aspectRatio: '3:4',
    placeholderColor: '#B9AE9C',
  },
  // Products
  productTsuki: {
    id: 'product-tsuki',
    url: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=1000&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    alt: 'Tsuki Bowl in raw iron-flecked clay with pale celadon interior glaze',
    aspectRatio: '4:5',
    placeholderColor: '#E7E2D8',
  },
  productHira: {
    id: 'product-hira',
    url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=1000&q=80',
    alt: 'Hira Plate with wide unglazed foot and mineral wash glaze',
    aspectRatio: '4:5',
    placeholderColor: '#B9AE9C',
  },
  productMoku: {
    id: 'product-moku',
    url: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1000&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=80',
    alt: 'Moku Vase with subtle hand-fluted vertical ridges and matte basalt finish',
    aspectRatio: '4:5',
    placeholderColor: '#E7E2D8',
  },
  productNami: {
    id: 'product-nami',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=80',
    alt: 'Nami Cup showing wheel-thrown finger ridge grip and reduction ash glaze',
    aspectRatio: '4:5',
    placeholderColor: '#B9AE9C',
  },
  productSora: {
    id: 'product-sora',
    url: 'https://images.unsplash.com/photo-1576020799627-aeac76d580dc?auto=format&fit=crop&w=1000&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    alt: 'Sora Pitcher with balanced organic pulled handle and precision pouring spout',
    aspectRatio: '4:5',
    placeholderColor: '#E7E2D8',
  },
  productKaze: {
    id: 'product-kaze',
    url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
    alt: 'Kaze Planter in porous coarse stoneware with fitted matching drainage dish',
    aspectRatio: '4:5',
    placeholderColor: '#B9AE9C',
  },
  // Process steps
  processWedging: {
    id: 'process-wedging',
    url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    alt: 'Potter wedging raw stoneware clay in spiral rhythm on a thick untreated beech workbench',
    aspectRatio: '4:5',
    placeholderColor: '#B9AE9C',
  },
  processThrowing: {
    id: 'process-throwing',
    url: 'https://images.unsplash.com/photo-1531875456634-3f5418280d20?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    alt: 'Wet hands centering a cylinder of dark stoneware on a spinning wooden kick wheel',
    aspectRatio: '4:5',
    placeholderColor: '#E7E2D8',
  },
  processGlazing: {
    id: 'process-glazing',
    url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hand dipping bisque-fired vessel into a tub of filtered oak wood ash and feldspar glaze',
    aspectRatio: '4:5',
    placeholderColor: '#B9AE9C',
  },
  processFiring: {
    id: 'process-firing',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
    alt: 'Stoking split Japanese red pine wood into the roaring firebox of an anagama kiln',
    aspectRatio: '4:5',
    placeholderColor: '#E7E2D8',
  },
  // Studio section
  studioWide: {
    id: 'studio-wide',
    url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1920&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1920&q=80',
    alt: 'Quiet sunlit interior of the Kyoto ceramics studio with drying shelves and wooden wheels',
    aspectRatio: '16:10',
    placeholderColor: '#B9AE9C',
  },
  // Journal entries
  journalWood: {
    id: 'journal-wood',
    url: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&w=800&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    alt: 'Carefully stacked split cordwood for kiln firing under shelter',
    aspectRatio: '4:5',
    placeholderColor: '#E7E2D8',
  },
  journalClay: {
    id: 'journal-clay',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    alt: 'Mineral-rich coarse clay beds and geological sediment sample',
    aspectRatio: '4:5',
    placeholderColor: '#B9AE9C',
  },
  journalCare: {
    id: 'journal-care',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    fallbackUrl: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80',
    alt: 'Stoneware cup seasoned with rich sencha tea over several years of morning rituals',
    aspectRatio: '4:5',
    placeholderColor: '#E7E2D8',
  },
} as const satisfies Record<string, AtelierImage>;
