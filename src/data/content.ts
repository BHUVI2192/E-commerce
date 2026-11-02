import { ATELIER_IMAGES, AtelierImage } from './images.ts';

export interface ProcessStep {
  number: string;
  title: string;
  japaneseTitle: string;
  stage: string;
  duration: string;
  temperature: string;
  description: string;
  technicalNote: string;
  image: AtelierImage;
}

export interface JournalArticle {
  id: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  author: string;
  image: AtelierImage;
  body: string[];
  takeaway: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Wedging',
    japaneseTitle: '木槌・荒練り',
    stage: 'Clay Preparation',
    duration: '45 min per 20 kg batch',
    temperature: 'Ambient studio (18°C)',
    description:
      'Raw clay bodies must be kneaded in repetitive spiral motions — the classic bullhead wedge — to expel microscopic air pockets and align the mineral platelets.',
    technicalNote:
      'We age our blended clays for a minimum of 90 days in damp cellars before wedging to encourage beneficial microbial plasticity.',
    image: ATELIER_IMAGES.processWedging,
  },
  {
    number: '02',
    title: 'Throwing',
    japaneseTitle: '水挽き・成形',
    stage: 'Wheelwork & Trimming',
    duration: '15–35 min per vessel',
    temperature: 'Leather-hard set (24 hrs)',
    description:
      'Centering requires absolute stillness of torso and forearms. Using minimal lubricating slip and hand-carved cherry ribs, each cylinder rises with calibrated wall thickness.',
    technicalNote:
      'Foot rings are turned by hand on wooden chucks once the vessel reaches the precise hardness of cold wax.',
    image: ATELIER_IMAGES.processThrowing,
  },
  {
    number: '03',
    title: 'Glazing',
    japaneseTitle: '灰釉・浸し掛け',
    stage: 'Mineral Formulations',
    duration: '3–5 second dip',
    temperature: 'Bisque state (950°C)',
    description:
      'Our glazes are mixed exclusively from local raw materials: washed river oak ash, unrefined Portuguese feldspar, silica sand, and iron oxide residue.',
    technicalNote:
      'Ash glaze mixed from oak and rice husk creates a reactive melt that pools into subtle celadon gradients along rim variations.',
    image: ATELIER_IMAGES.processGlazing,
  },
  {
    number: '04',
    title: 'Firing',
    japaneseTitle: '本焼き・還元焼成',
    stage: 'Wood Kiln Reduction',
    duration: '36 hours continuous',
    temperature: '1,260°C peak cone 10',
    description:
      'Loaded into a multi-chamber wood kiln and stoked around the clock with cured red pine. At 1,000°C, oxygen intake is choked to provoke heavy reduction, pulling oxygen out of the clay itself.',
    technicalNote:
      'Airborne wood ash settles on exposed shoulders, melting into glassy olive drops that cannot be replicated by electric or gas firing.',
    image: ATELIER_IMAGES.processFiring,
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'why-we-fire-in-wood',
    date: 'OCTOBER 2026',
    readingTime: '5 MIN READ',
    title: 'Why we fire in wood, not gas',
    excerpt:
      'The unpredictability of airborne pine ash and why volatile flame paths produce irreversible character in high-fired stoneware.',
    author: 'Kenji Takahashi, Master Potter',
    image: ATELIER_IMAGES.journalWood,
    body: [
      'An electric kiln is a sterile oven. Set the digital programmer to 1,260 degrees Celsius, shut the insulating lid, and wake up sixteen hours later to predictable, uniform glass.',
      'A wood kiln is an organism. It breathes, starves, surges, and demands attention every five minutes for a day and a half. The fuel we feed it — split Japanese red pine and cured Portuguese holm oak — does not merely provide BTUs. It deposits volatile ash, resin vapor, and carbon minerals directly onto the bare shoulders of unglazed stoneware.',
      'Where the flame drafts around a vessel, iron within the clay blooms into deep persimmon red. Where the fly-ash settles heavily, it melts into an accidental vitreous celadon. No two pieces can ever share an identical surface, because no two drafts of air take the same path twice.',
    ],
    takeaway: 'Imperfection is not a defect to be forgiven; it is the physical record of combustion.',
  },
  {
    id: 'geography-of-shigaraki-clay',
    date: 'AUGUST 2026',
    readingTime: '7 MIN READ',
    title: 'The geography of Shigaraki clay',
    excerpt:
      'Sourcing high-silica sediments from prehistoric lake beds in central Japan and blending them with coarse Iberian shale.',
    author: 'Sofia Carvalhal, Material Director',
    image: ATELIER_IMAGES.journalClay,
    body: [
      'Four million years ago, the prehistoric basin of Lake Biwa covered what is now the Shiga Prefecture hills. Centuries of decomposition washed weathered granite down granite gorges, settling as thick sedimentary kaolin beds laced with coarse quartz grains.',
      'When thrown, this clay fights the fingers. It is sandy and resistant. But during a reduction firing, the embedded quartz pebbles — what Japanese potters call kairagi or "crab eye" inclusions — heat at different coefficients of expansion than the surrounding matrix, creating microscopic tectonic fractures that hold glazes with astonishing depth.',
      'At KILN, we blend 60% Shigaraki raw sediment with 40% high-iron shale from the Alentejo quarries in Portugal. The marriage of these two distinct geological histories gives our tableware its singular density, sound, and thermal balance.',
    ],
    takeaway: 'The soil of a region carries its mineral memory into the vessel on your table.',
  },
  {
    id: 'care-of-unglazed-stoneware',
    date: 'JUNE 2026',
    readingTime: '4 MIN READ',
    title: 'Care of unglazed stoneware',
    excerpt:
      'How natural oils, tea tannins, and everyday domestic use season unglazed vitrified surfaces over decades of quiet ritual.',
    author: 'Elena Mori, Atelier Conservator',
    image: ATELIER_IMAGES.journalCare,
    body: [
      'Modern industrial design teaches us that tableware should remain permanently frozen in its factory state: glossy, impervious, and identical from year one to year twenty.',
      'High-fired stoneware without a glass glaze operates on a fundamentally different premise. Because our vessels are fired to 1,260°C, the clay body is fully vitrified and completely non-porous — liquids will never seep through. Yet the tactile surface remains open to microscopic friction and the ambient oils of food and hands.',
      'Over seasons of morning matcha, rich olive oils, and hand-washing, the surface develops what Japanese collectors refer to as nioi — an amber warmth and satiny patina that deepens with honest daily devotion.',
    ],
    takeaway: 'A bowl is only half-finished when it exits the kiln. The user completes it through daily use.',
  },
];

export const STUDIO_INFO = {
  quote: 'Every piece is a record of an afternoon.',
  subtext:
    'Our work proceeds without haste. We operate dual ateliers: a historic wooden timber workshop in Kyoto’s Gojōzaka district, and an open-vault stone studio in Lisbon’s Graça quarter. Both spaces welcome visitors by appointment during batch release periods.',
  locations: [
    {
      city: 'Kyoto Atelier',
      neighborhood: 'Gojōzaka, Higashiyama-ku',
      address: '4-chōme-18-2 Gojōbashi Higashi',
      postal: 'Kyoto 605-0846, Japan',
      hours: 'Thu – Sun, 11:00 – 17:00 (By Appointment)',
      phone: '+81 75 531 8842',
      email: 'kyoto@kiln-atelier.com',
      notes: 'Anagama kiln firings twice annually in November and April.',
    },
    {
      city: 'Lisbon Studio',
      neighborhood: 'Graça / Santa Engrácia',
      address: 'Rua da Senhora do Monte 42',
      postal: '1170-358 Lisboa, Portugal',
      hours: 'Wed – Sat, 10:30 – 18:30 (Walk-ins Welcome)',
      phone: '+351 21 887 4190',
      email: 'lisbon@kiln-atelier.com',
      notes: 'Showroom, glaze archive, and direct batch dispatch.',
    },
  ],
};
