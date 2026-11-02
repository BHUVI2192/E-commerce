import { ATELIER_IMAGES, AtelierImage } from './images.ts';

export interface Product {
  id: string;
  index: string;
  name: string;
  japaneseName: string;
  tagline: string;
  price: number;
  image: AtelierImage;
  clayBody: string;
  firingTemp: string;
  glaze: string;
  dimensions: string;
  weight: string;
  batchNumber: string;
  description: string;
  details: string[];
  care: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'tsuki-bowl',
    index: '01',
    name: 'Tsuki Bowl',
    japaneseName: '月鉢',
    tagline: 'Shallow stoneware bowl with raw iron-flecked exterior and milky celadon glaze.',
    price: 68,
    image: ATELIER_IMAGES.productTsuki,
    clayBody: 'Coarse Shigaraki iron stoneware',
    firingTemp: '1,260°C reduction atmosphere',
    glaze: 'Oak wood ash & natural feldspar celadon',
    dimensions: 'Ø 18.5 cm × H 5.2 cm',
    weight: '420 g',
    batchNumber: 'Batch 14 / No. 06 of 36',
    description:
      'Thrown on a slow wooden wheel and left unglazed along the lower third to reveal coarse mineral aggregates. The interior pool catches morning light with faint jade-grey depth.',
    details: [
      'Food and dishwasher safe; hand washing recommended',
      'Naturally vitrified non-porous ceramic body',
      'Each piece exhibits distinct iron bloom variations',
      'Turned foot with incised atelier mark',
    ],
    care: 'Rinse with warm water after use. Over time, tea tannins and rich broths will slowly patinate the micro-craquelure of the glaze.',
  },
  {
    id: 'hira-plate',
    index: '02',
    name: 'Hira Plate',
    japaneseName: '平皿',
    tagline: 'Flat rim plate thrown from coarse Shigaraki clay, unglazed rim.',
    price: 54,
    image: ATELIER_IMAGES.productHira,
    clayBody: 'High-silica gray stoneware',
    firingTemp: '1,250°C neutral soak',
    glaze: 'Milled chalk & washed river ash',
    dimensions: 'Ø 22.0 cm × H 1.8 cm',
    weight: '510 g',
    batchNumber: 'Batch 14 / No. 12 of 36',
    description:
      'Engineered with an ultra-low profile rim and a broad, stable base. The unglazed perimeter is burnished with smooth river stones before the bisque firing to yield a velvet-dry tactile contrast.',
    details: [
      'Stackable profile with foot recess',
      'Thermal shock resistant to 180°C',
      'Textured rim grip for serving',
      'Fired in third tier of down-draft chamber',
    ],
    care: 'Dry thoroughly before stacking. Safe for everyday hot dish service and acidic foods.',
  },
  {
    id: 'moku-vase',
    index: '03',
    name: 'Moku Vase',
    japaneseName: '木花器',
    tagline: 'Fluted cylindrical vessel inspired by Japanese hinoki wood bark.',
    price: 145,
    image: ATELIER_IMAGES.productMoku,
    clayBody: 'Portuguese red iron shale stoneware',
    firingTemp: '1,270°C wood flame impingement',
    glaze: 'Unglazed vitrified basalt wash',
    dimensions: 'Ø 10.5 cm × H 26.0 cm',
    weight: '1,180 g',
    batchNumber: 'Batch 14 / No. 04 of 18',
    description:
      'Carved vertically by hand using a tempered steel scraper while the vessel is leather-hard. Airborne wood ash deposits create natural streaks of amber slag during the 36-hour reduction cycle.',
    details: [
      'Watertight interior with transparent feldspar liner',
      'Weighted base for stable stem display',
      'Sculptural presence when standing unadorned',
      'Individually numbered atelier stamp at the base',
    ],
    care: 'Wipe exterior with a dry or lightly damp lint-free cloth. Interior can be cleaned with lukewarm water and coarse salt.',
  },
  {
    id: 'nami-cup',
    index: '04',
    name: 'Nami Cup',
    japaneseName: '波湯呑',
    tagline: 'Tumbler with wave tactile ridge, fired in a reduction atmosphere.',
    price: 38,
    image: ATELIER_IMAGES.productNami,
    clayBody: 'Fine-milled sedimentary stoneware',
    firingTemp: '1,260°C heavy reduction',
    glaze: 'Rice husk ash & iron slip wash',
    dimensions: 'Ø 7.8 cm × H 9.0 cm',
    weight: '210 g',
    batchNumber: 'Batch 14 / No. 19 of 48',
    description:
      'A single deliberate circumferential wave is pressed into the cylinder wall during the final rotation of throwing. It fits the crook of the thumb and middle finger naturally, retaining warmth without burning.',
    details: [
      'Comfortable 240 ml volume for sencha, filter brew, or water',
      'Thin rim tapered on the leather-hard trim bat',
      'Retains heat through dense vitrified body',
      'Smooth satiny interior slip finish',
    ],
    care: 'Safe for tea, espresso, and spirits. Seasoning occurs naturally over months of daily touch.',
  },
  {
    id: 'sora-pitcher',
    index: '05',
    name: 'Sora Pitcher',
    japaneseName: '空注器',
    tagline: 'Balanced pouring vessel with pinched spout and ash-washed handle.',
    price: 120,
    image: ATELIER_IMAGES.productSora,
    clayBody: 'Buff stoneware with crushed quartz',
    firingTemp: '1,260°C reduction flame',
    glaze: 'Pale celadon exterior with unglazed handle',
    dimensions: 'W 14.0 cm × D 11.0 cm × H 19.5 cm',
    weight: '760 g',
    batchNumber: 'Batch 14 / No. 08 of 24',
    description:
      'The handle is pulled directly from a lump of clay attached to the shoulder, tapering down to a single thumb-press terminal. The hand-pinched spout cuts cleanly without dripping.',
    details: [
      '750 ml capacity for water, sake, or iced infusions',
      'Zero-drip tapered pouring lip',
      'Balanced center of gravity when full',
      'Fired with natural kiln draft markings',
    ],
    care: 'Rinse promptly after pouring wine or citrus liquids. Air dry upside down on linen.',
  },
  {
    id: 'kaze-planter',
    index: '06',
    name: 'Kaze Planter',
    japaneseName: '風鉢',
    tagline: 'Breathable porous planter with matching unglazed stoneware saucer.',
    price: 95,
    image: ATELIER_IMAGES.productKaze,
    clayBody: 'Coarse grog-tempered porous stoneware',
    firingTemp: '1,180°C low-sinter vitrification',
    glaze: 'Raw buff exterior with iron oxide wash',
    dimensions: 'Ø 16.0 cm × H 15.0 cm',
    weight: '920 g',
    batchNumber: 'Batch 14 / No. 15 of 30',
    description:
      'Formulated with 25% coarse grog to maximize root oxygenation while remaining structurally immutable. Ships with an individually ground water saucer turned from the same clay batch.',
    details: [
      'Center drainage hole (20 mm) with bevelled lip',
      'Precision fitted catch dish included',
      'Porous wall promotes healthy rhizosphere aeration',
      'Resistant to frost cracking when drained',
    ],
    care: 'Mineral deposits from tap water will gently patina the outer wall over seasons. Wipe with lemon water if you prefer a clean look.',
  },
];
