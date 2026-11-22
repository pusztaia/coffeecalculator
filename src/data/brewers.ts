import type { Brewer, MokaPotSize, RoastLevel, GrindSize } from '../types/coffee';

export interface GrinderClickRecommendation {
  min: number;
  max: number;
  recommended: number;
  descHu: string;
  descEn: string;
}

export const TIMEMORE_C2_CLICKS: Record<GrindSize, GrinderClickRecommendation> = {
  'fine': {
    min: 11,
    max: 15,
    recommended: 13,
    descHu: 'Kotyogós / Moka (C2: 11 klikk világos, 12-14 klikk közepes)',
    descEn: 'Moka Pot (C2: 11 clicks light, 12-14 clicks medium)'
  },
  'medium-fine': {
    min: 11,
    max: 18,
    recommended: 13,
    descHu: 'AeroPress (C2: 11 klikk világos, 12-14 klikk közepes)',
    descEn: 'AeroPress (C2: 11 clicks light, 12-14 clicks medium)'
  },
  'medium': {
    min: 13,
    max: 22,
    recommended: 18,
    descHu: 'Filter / V60 (13-22 klikk)',
    descEn: 'Pour over / V60 (13-22 clicks)'
  },
  'medium-coarse': {
    min: 20,
    max: 26,
    recommended: 24,
    descHu: 'Chemex / Áztatás (20-26 klikk)',
    descEn: 'Chemex / Steep (20-26 clicks)'
  },
  'coarse': {
    min: 22,
    max: 30,
    recommended: 26,
    descHu: 'French Press & Cold Brew (22-30 klikk)',
    descEn: 'French Press & Cold Brew (22-30 clicks)'
  },
};

export const getC2Clicks = (grindSize: GrindSize, roastLevel?: RoastLevel): GrinderClickRecommendation => {
  const roast = roastLevel || 'medium';

  switch (grindSize) {
    case 'fine':
      if (roast === 'light') {
        return {
          min: 11,
          max: 11,
          recommended: 11,
          descHu: 'Timemore C2: 11 klikk világos pörköléshez (Kotyogós / Fine)',
          descEn: 'Timemore C2: 11 clicks for light roast (Moka / Fine)',
        };
      }
      if (roast === 'medium') {
        return {
          min: 12,
          max: 14,
          recommended: 13,
          descHu: 'Timemore C2: 12-14 klikk közepes pörköléshez (Kotyogós / Fine)',
          descEn: 'Timemore C2: 12-14 clicks for medium roast (Moka / Fine)',
        };
      }
      return {
        min: 14,
        max: 15,
        recommended: 14,
        descHu: 'Timemore C2: 14-15 klikk sötét pörköléshez (Kotyogós / Fine)',
        descEn: 'Timemore C2: 14-15 clicks for dark roast (Moka / Fine)',
      };

    case 'medium-fine':
      if (roast === 'light') {
        return {
          min: 11,
          max: 12,
          recommended: 11,
          descHu: 'Timemore C2: 11 klikk világos pörköléshez (AeroPress)',
          descEn: 'Timemore C2: 11 clicks for light roast (AeroPress)',
        };
      }
      if (roast === 'medium') {
        return {
          min: 12,
          max: 14,
          recommended: 13,
          descHu: 'Timemore C2: 12-14 klikk közepes pörköléshez (AeroPress)',
          descEn: 'Timemore C2: 12-14 clicks for medium roast (AeroPress)',
        };
      }
      return {
        min: 15,
        max: 17,
        recommended: 16,
        descHu: 'Timemore C2: 15-17 klikk sötét pörköléshez (AeroPress)',
        descEn: 'Timemore C2: 15-17 clicks for dark roast (AeroPress)',
      };

    case 'medium':
      if (roast === 'light') {
        return {
          min: 13,
          max: 16,
          recommended: 15,
          descHu: 'Timemore C2: 14-16 klikk világos pörköléshez (Filter / V60)',
          descEn: 'Timemore C2: 14-16 clicks for light roast (Filter / V60)',
        };
      }
      if (roast === 'medium') {
        return {
          min: 16,
          max: 20,
          recommended: 18,
          descHu: 'Timemore C2: 17-19 klikk közepes pörköléshez (Filter / V60)',
          descEn: 'Timemore C2: 17-19 clicks for medium roast (Filter / V60)',
        };
      }
      return {
        min: 20,
        max: 22,
        recommended: 21,
        descHu: 'Timemore C2: 20-22 klikk sötét pörköléshez (Filter / V60)',
        descEn: 'Timemore C2: 20-22 clicks for dark roast (Filter / V60)',
      };

    case 'medium-coarse':
      if (roast === 'light') {
        return {
          min: 20,
          max: 23,
          recommended: 21,
          descHu: 'Timemore C2: 20-23 klikk világos pörköléshez (Chemex)',
          descEn: 'Timemore C2: 20-23 clicks for light roast (Chemex)',
        };
      }
      if (roast === 'medium') {
        return {
          min: 23,
          max: 25,
          recommended: 24,
          descHu: 'Timemore C2: 23-25 klikk közepes pörköléshez (Chemex)',
          descEn: 'Timemore C2: 23-25 clicks for medium roast (Chemex)',
        };
      }
      return {
        min: 25,
        max: 27,
        recommended: 26,
        descHu: 'Timemore C2: 25-27 klikk sötét pörköléshez (Chemex)',
        descEn: 'Timemore C2: 25-27 clicks for dark roast (Chemex)',
      };

    case 'coarse':
      if (roast === 'light') {
        return {
          min: 22,
          max: 26,
          recommended: 24,
          descHu: 'Timemore C2: 23-25 klikk világos pörköléshez (French / Cold)',
          descEn: 'Timemore C2: 23-25 clicks for light roast (French / Cold)',
        };
      }
      if (roast === 'medium') {
        return {
          min: 25,
          max: 28,
          recommended: 27,
          descHu: 'Timemore C2: 26-28 klikk közepes pörköléshez (French / Cold)',
          descEn: 'Timemore C2: 26-28 clicks for medium roast (French / Cold)',
        };
      }
      return {
        min: 28,
        max: 30,
        recommended: 29,
        descHu: 'Timemore C2: 28-30 klikk sötét pörköléshez (French / Cold)',
        descEn: 'Timemore C2: 28-30 clicks for dark roast (French / Cold)',
      };

    default:
      return TIMEMORE_C2_CLICKS[grindSize];
  }
};

export const MOKA_POT_SIZES: MokaPotSize[] = [
  { cups: 1, label: '1-Cup (Bialetti Express)', coffeeGrams: 7, waterMl: 60, yieldMl: 40 },
  { cups: 2, label: '2-Cup (Bialetti Express)', coffeeGrams: 11, waterMl: 100, yieldMl: 70 },
  { cups: 3, label: '3-Cup (Standard Bialetti)', coffeeGrams: 16, waterMl: 150, yieldMl: 110 },
  { cups: 4, label: '4-Cup (Medium)', coffeeGrams: 20, waterMl: 190, yieldMl: 140 },
  { cups: 6, label: '6-Cup (Large Family)', coffeeGrams: 30, waterMl: 300, yieldMl: 220 },
  { cups: 9, label: '9-Cup (Extra Large)', coffeeGrams: 45, waterMl: 450, yieldMl: 330 },
];

export const BREWERS: Brewer[] = [
  {
    id: 'aeropress',
    nameEn: 'AeroPress (Standard)',
    nameHu: 'AeroPress (Hagyományos)',
    category: 'immersion',
    subtitleEn: 'Clean, versatile immersion filter brew',
    subtitleHu: 'Tiszta, sokoldalú immerziós és nyomásos kávé',
    defaultRatio: 15, // 1:15
    minRatio: 6,
    maxRatio: 18,
    defaultCoffee: 15,
    defaultWater: 225,
    defaultGrind: 'medium-fine',
    tempRangeC: [80, 92],
    recipes: [
      {
        id: 'hoffmann-aeropress',
        nameEn: 'James Hoffmann Ultimate',
        nameHu: 'James Hoffmann Mesterfőzete',
        creatorEn: 'James Hoffmann (World Barista Champion)',
        creatorHu: 'James Hoffmann (Világbajnok barista)',
        descEn: 'Low temperature (80-85°C), Timemore C2: 11 clicks for light roast, 12-14 clicks for medium roast, gentle 30s press.',
        descHu: 'Alacsonyabb hőfok (80-85°C), Timemore C2: 11 klikk világos, 12-14 klikk közepes pörköléshez, kíméletes lassú lenyomás.',
        defaultRatio: 18, // 11g to 200g water (approx 1:18.2)
        minRatio: 14,
        maxRatio: 20,
        defaultCoffee: 11,
        defaultWater: 200,
        recommendedTempC: 85,
        grindSize: 'medium-fine',
        brewTimeSec: 150,
        steps: [
          { timeSec: 0, titleEn: 'Rinse & Prep', titleHu: 'Öblítés és Előkészület', descEn: 'Rinse paper filter into cap. Place AeroPress on mug, add 11g coffee (Timemore C2: 11 clicks for light roast, 12-14 clicks for medium roast; C2 = C2 Max).', descHu: 'Nedvesítsd be a szűrőpapírt, tedd a bögrére, önts bele 11g kávét (Timemore C2: 11 klikk világos, 12-14 klikk közepes pörköléshez; C2 = C2 Max).' },
          { timeSec: 10, titleEn: 'Pour Water', titleHu: 'Víz Felöntése', descEn: 'Pour 200g water at ~85°C, ensuring all grounds are saturated.', descHu: 'Önts rá 200g 85°C körüli vizet, hogy minden kávé átnedvesedjen.', waterTarget: 200 },
          { timeSec: 25, titleEn: 'Insert Plunger (Seal)', titleHu: 'Dugattyú behelyezése (Vákuum)', descEn: 'Insert plunger just a few mm to stop coffee dripping through.', descHu: 'Helyezd be a dugattyút pár mm mélyen, hogy a vákuum megfogja a csepegést.' },
          { timeSec: 120, titleEn: 'Gentle Swirl', titleHu: 'Gyengéd Körözés', descEn: 'At 2:00, gently swirl the AeroPress and wait 30s for grounds to settle.', descHu: '2 percnél óvatosan mozgasd körbe az eszközt, hagyd leülepedni 30 mp-ig.' },
          { timeSec: 150, titleEn: 'Gentle Press', titleHu: 'Finom Lenyomás', descEn: 'Gently press down for 30s until you hear the first hiss. Stop immediately!', descHu: 'Lassan és egyenletesen nyomd le 30 másodperc alatt. Az első sziszegésnél állj meg!' },
        ],
        tag: 'Champion'
      },
      {
        id: 'tim-wendelboe-aeropress',
        nameEn: 'Tim Wendelboe Nordic Style',
        nameHu: 'Tim Wendelboe Északi Stílus',
        creatorEn: 'Tim Wendelboe',
        creatorHu: 'Tim Wendelboe',
        descEn: '14g coffee to 200g water (1:14.3). Clean, aromatic, highlighting origin notes.',
        descHu: '14g kávé 200g vízhez (1:14.3). Kiemelkedően tiszta, gyümölcsös és aromás ízvilág.',
        defaultRatio: 14.3,
        minRatio: 12,
        maxRatio: 16,
        defaultCoffee: 14,
        defaultWater: 200,
        recommendedTempC: 92,
        grindSize: 'medium',
        brewTimeSec: 120,
        steps: [
          { timeSec: 0, titleEn: 'Add Coffee & Pour', titleHu: 'Kávé és Víz', descEn: 'Add 14g medium grind. Pour 200g boiling/near-boiling water rapidly.', descHu: 'Tölts 14g közepes őrleményt, majd önts rá 200g friss forró vizet.', waterTarget: 200 },
          { timeSec: 15, titleEn: 'Stir 3 Times', titleHu: '3 Keverés', descEn: 'Stir back and forth 3 times with the paddle to integrate all coffee.', descHu: 'Keverd át előre-hátra 3 alkalommal a lapáttal.' },
          { timeSec: 25, titleEn: 'Insert Plunger', titleHu: 'Dugattyú Rögzítése', descEn: 'Insert plunger to create vacuum seal. Steep until 1:00.', descHu: 'Tedd be a dugattyút, hozz létre vákuumot, áztasd 1 percig.' },
          { timeSec: 60, titleEn: 'Remove & Stir Again', titleHu: 'Levétel és Újabb Keverés', descEn: 'Take off plunger, stir 3 times back-and-forth.', descHu: 'Vedd le a dugattyút, keverj 3-at.' },
          { timeSec: 75, titleEn: 'Slow Plunge', titleHu: 'Lassú Lenyomás', descEn: 'Press smoothly over ~30 seconds. Enjoy!', descHu: 'Egyenletesen nyomd le 30 másodperc alatt.' },
        ],
        tag: 'Nordic'
      },
      {
        id: 'concentrate-aeropress',
        nameEn: 'Intense Short Shot / Concentrate',
        nameHu: 'Intenzív Sűrítmény / Koncentrátum',
        creatorEn: 'Alan Adler (AeroPress Creator)',
        creatorHu: 'Alan Adler (AeroPress feltalálója)',
        descEn: 'Short, intense shot (1:5 to 1:6 ratio). Perfect for Americanos, Lattes or Iced Coffee.',
        descHu: 'Rövid, sűrű koncentrátum (1:5 - 1:6). Kiváló tejeskávéhoz, jegeskávéhoz vagy americanóhoz.',
        defaultRatio: 5.5,
        minRatio: 4,
        maxRatio: 7,
        defaultCoffee: 18,
        defaultWater: 100,
        recommendedTempC: 85,
        grindSize: 'fine',
        brewTimeSec: 60,
        steps: [
          { timeSec: 0, titleEn: 'Dose Fine Coffee', titleHu: 'Finom Őrlemény Betöltése', descEn: 'Add 18g finely ground coffee into AeroPress chamber.', descHu: 'Tölts 18g finomra őrölt kávét a hengerbe.' },
          { timeSec: 10, titleEn: 'Fast Water Pour', titleHu: 'Gyors Felöntés', descEn: 'Pour 100g water (around number 2 mark on chamber).', descHu: 'Önts rá 100g 85°C körüli vizet (kb. 2-es jelzés).', waterTarget: 100 },
          { timeSec: 20, titleEn: 'Vigorous Stir', titleHu: 'Intenzív Keverés', descEn: 'Stir vigorously for 10 seconds to fully extract.', descHu: 'Keverd intenzíven 10 másodpercig az extrakcióért.' },
          { timeSec: 35, titleEn: 'Firm Press', titleHu: 'Határozott Lenyomás', descEn: 'Press firmly all the way down into your cup (~25s).', descHu: 'Nyomd le határozott mozdulattal (~25 mp).' },
        ],
        tag: 'Shot'
      }
    ]
  },
  {
    id: 'aeropress-inverted',
    nameEn: 'AeroPress (Inverted / Fordított)',
    nameHu: 'AeroPress (Fordított Módszer)',
    category: 'immersion',
    subtitleEn: 'Zero drip-through, maximum immersion control',
    subtitleHu: 'Nulla korai csepegés, teljes áztatási kontroll',
    defaultRatio: 14,
    minRatio: 11,
    maxRatio: 17,
    defaultCoffee: 15,
    defaultWater: 210,
    defaultGrind: 'medium-fine',
    tempRangeC: [85, 94],
    recipes: [
      {
        id: 'classic-inverted',
        nameEn: 'Classic Championship Inverted',
        nameHu: 'Klasszikus Bajnoki Fordított',
        creatorEn: 'AeroPress Champions',
        creatorHu: 'AeroPress Bajnokok',
        descEn: 'Upside down AeroPress: bloom, steep, flip and press. Full body and rich extraction.',
        descHu: 'Fordított henger: előáztatás, teljes merülés, átfordítás és préselés.',
        defaultRatio: 14,
        minRatio: 11,
        maxRatio: 17,
        defaultCoffee: 15,
        defaultWater: 210,
        recommendedTempC: 90,
        grindSize: 'medium-fine',
        brewTimeSec: 120,
        steps: [
          { timeSec: 0, titleEn: 'Set Inverted Position', titleHu: 'Fordított Pozíció', descEn: 'Position plunger at #4 line upside down. Add 15g coffee.', descHu: 'Állítsd a dugattyút a 4-es jelzésnél fejjel lefelé, önts bele 15g kávét.' },
          { timeSec: 10, titleEn: 'Bloom Pour', titleHu: 'Előáztatás (Bloom)', descEn: 'Pour 50g water, stir gently to wet all grounds, wait 30s.', descHu: 'Önts rá 50g vizet, keverd el, várj 30 mp-et a kigázosodásra.', waterTarget: 50 },
          { timeSec: 40, titleEn: 'Fill to Top', titleHu: 'Feltöltés', descEn: 'Pour remaining water up to 210g. Attach pre-rinsed cap & filter.', descHu: 'Öntsd fel a maradék vízzel 210g-ig. Csavard rá a nedvesített szűrőkupakot.', waterTarget: 210 },
          { timeSec: 90, titleEn: 'The Flip', titleHu: 'Átfordítás', descEn: 'Carefully and swiftly flip onto mug at 1:30.', descHu: '1:30-nál határozott, biztos mozdulattal fordítsd a bögrére.' },
          { timeSec: 100, titleEn: 'Press Smoothly', titleHu: 'Lassú Préselés', descEn: 'Press steadily for 20-25s. Stop when air hisses.', descHu: 'Nyomd le egyenletesen 20-25 másodperc alatt.' },
        ],
        tag: 'Inverted'
      }
    ]
  },
  {
    id: 'moka-pot',
    nameEn: 'Moka Pot / Kotyogós',
    nameHu: 'Kotyogós (Moka Pot)',
    category: 'stovetop',
    subtitleEn: 'Iconic rich & bold stovetop brewer',
    subtitleHu: 'Klasszikus kotyogós intenzív, testes kávéélmény',
    defaultRatio: 8.5, // ~ 1:8.5 (e.g. 16g coffee to 140g water in 3-cup)
    minRatio: 6,
    maxRatio: 11,
    defaultCoffee: 16,
    defaultWater: 140,
    defaultGrind: 'fine',
    tempRangeC: [98, 100],
    recipes: [
      {
        id: 'hoffmann-moka',
        nameEn: 'James Hoffmann Specialty Technique',
        nameHu: 'James Hoffmann Újhullámos Kotyogós',
        creatorEn: 'James Hoffmann',
        creatorHu: 'James Hoffmann',
        descEn: 'Boiling water in base, medium-low flame, cold wet towel wrap right when blonding starts.',
        descHu: 'Forrásban lévő víz a tartályba, közepes-alacsony láng, azonnali hűtés amint habosodik.',
        defaultRatio: 8.5,
        minRatio: 7,
        maxRatio: 10,
        defaultCoffee: 16,
        defaultWater: 140,
        recommendedTempC: 98,
        grindSize: 'fine',
        brewTimeSec: 180,
        steps: [
          { timeSec: 0, titleEn: 'Preheat Boiler Water', titleHu: 'Víz Felforralása', descEn: 'Boil water in a kettle. Fill moka base up to safety valve.', descHu: 'Forralj vizet vízforralóban. Töltsd a biztonsági szelep alá a tartályba.', waterTarget: 140 },
          { timeSec: 30, titleEn: 'Fill Funnel Basket', titleHu: 'Szűrőkosár Töltése', descEn: 'Fill basket with fine coffee (Timemore C2: 11 clicks for light roast, 12-14 clicks for medium roast). Level flat with finger — DO NOT TAMP!', descHu: 'Töltsd meg a kosarat finom őrleménnyel (Timemore C2: 11 klikk világos pörköléshez, 12-14 klikk közepes pörköléshez). Simítsd el egyenesre — NE tömörítsd/tampereld!' },
          { timeSec: 60, titleEn: 'Assemble Safely', titleHu: 'Összeszerelés Konyharuhával', descEn: 'Use a towel (base is hot!) to screw the upper chamber tightly.', descHu: 'Használj konyharuhát a forró alsó részhez, és szorosan csavard rá a felsőt.' },
          { timeSec: 90, titleEn: 'Low Heat Extraction', titleHu: 'Kíméletes Melegítés', descEn: 'Place on low/medium-low heat with lid open. Watch the spout.', descHu: 'Tedd alacsony lángra nyitott fedéllel. Figyeld a kifolyócsövet.' },
          { timeSec: 150, titleEn: 'Golden Flow to Crema', titleHu: 'Krémes Folyás', descEn: 'Coffee should flow rich and dark, gradually turning honey-colored.', descHu: 'A kávé sötét, szirupos sugárban indul, majd mézszínűvé válik.' },
          { timeSec: 180, titleEn: 'Cool Under Cold Water', titleHu: 'Azonnali Hűtés Hideg Vízzel', descEn: 'The moment coffee starts sputtering/blonding, take off heat and run base under cold tap!', descHu: 'Amint sziszegni/habzani kezd, vedd le és hűtsd le az alját hideg csapvíz alatt!' },
        ],
        tag: 'Specialty'
      },
      {
        id: 'classic-italian-moka',
        nameEn: 'Classic Italian Household',
        nameHu: 'Hagyományos Olasz Családi',
        creatorEn: 'Bialetti Tradition',
        creatorHu: 'Bialetti Hagyomány',
        descEn: 'Cold fresh water, gentle stovetop heat, pure bold Italian wake-up coffee.',
        descHu: 'Hideg friss víz, hagyományos kotyogás a tűzhelyen, határozott olasz reggeli kávé.',
        defaultRatio: 9,
        minRatio: 7,
        maxRatio: 11,
        defaultCoffee: 16,
        defaultWater: 145,
        recommendedTempC: 95,
        grindSize: 'fine',
        brewTimeSec: 240,
        steps: [
          { timeSec: 0, titleEn: 'Cold Water to Valve', titleHu: 'Hideg Víz a Szelep Alá', descEn: 'Fill boiler with fresh cold filtered water just below the brass valve.', descHu: 'Tölts hideg szűrt vizet a réz biztonsági szelep alsó pereméig.', waterTarget: 145 },
          { timeSec: 20, titleEn: 'Heaping Coffee Basket', titleHu: 'Laza Kávékúp a Kosárba', descEn: 'Fill the funnel loosely (Timemore C2: 11 clicks for light roast, 12-14 clicks for medium roast), tap sides gently to settle.', descHu: 'Töltsd meg lazán a kosarat (Timemore C2: 11 klikk világos pörköléshez, 12-14 klikk közepes pörköléshez), finoman kocogtasd meg az oldalát.' },
          { timeSec: 40, titleEn: 'Screw Tight', titleHu: 'Szoros Összetekerés', descEn: 'Screw top and bottom together firmly to ensure airtight pressure.', descHu: 'Teker össze szorosan, hogy a gumi megfelelően tömítsen.' },
          { timeSec: 60, titleEn: 'Medium-Low Stovetop', titleHu: 'Közepes Tűzhely', descEn: 'Put on heat. Keep flame within the base diameter.', descHu: 'Helyezd a tűzhelyre, a láng ne érjen túl az alján.' },
          { timeSec: 210, titleEn: 'Listen for Gurgle', titleHu: 'Kotyogás Figyelése', descEn: 'When the classic gurgle sound starts, remove from flame immediately.', descHu: 'Amikor meghallod a klasszikus kotyogó hangot, azonnal zárd el a lángot.' },
        ],
        tag: 'Classic'
      }
    ]
  },
  {
    id: 'v60',
    nameEn: 'Hario V60 (Pour Over)',
    nameHu: 'Hario V60 (Kézi Csepegtető)',
    category: 'pourover',
    subtitleEn: 'Clarity and bright fruit notes with conical spiral filter',
    subtitleHu: 'Tiszta, gyümölcsös és világos ízjegyek kúpos filterrel',
    defaultRatio: 16, // 1:16
    minRatio: 14,
    maxRatio: 18,
    defaultCoffee: 15,
    defaultWater: 240,
    defaultGrind: 'medium-fine',
    tempRangeC: [90, 96],
    recipes: [
      {
        id: 'tetsu-4-6',
        nameEn: 'Tetsu Kasuya 4:6 Method',
        nameHu: 'Tetsu Kasuya 4:6 Módszer',
        creatorEn: 'Tetsu Kasuya (WBrC Champion)',
        creatorHu: 'Tetsu Kasuya (Világbajnok)',
        descEn: 'Coarse grind, 5 pours: first 40% tunes sweetness/acidity, remaining 60% adjusts strength.',
        descHu: 'Durvább őrlés, 5 felöntés: az első 40% az édességet, a maradék 60% a testességet szabályozza.',
        defaultRatio: 15,
        minRatio: 13,
        maxRatio: 17,
        defaultCoffee: 20,
        defaultWater: 300,
        recommendedTempC: 92,
        grindSize: 'medium-coarse',
        brewTimeSec: 210,
        steps: [
          { timeSec: 0, titleEn: '1st Pour: 50g (Sweetness)', titleHu: '1. Felöntés: 50g (Édesség)', descEn: 'Pour 50g in circular motion, let drain until 0:45.', descHu: 'Önts 50g vizet körkörösen, hagyd lefolyni 0:45-ig.', waterTarget: 50 },
          { timeSec: 45, titleEn: '2nd Pour: 70g (Balance)', titleHu: '2. Felöntés: 70g (Egyensúly)', descEn: 'Pour 70g up to 120g total. Drains until 1:30.', descHu: 'Önts 70g-ot (összesen 120g-ig). Lefolyik 1:30-ig.', waterTarget: 120 },
          { timeSec: 90, titleEn: '3rd Pour: 60g (Strength 1)', titleHu: '3. Felöntés: 60g (Testesség 1)', descEn: 'Pour 60g up to 180g total.', descHu: 'Önts 60g-ot 180g-ig.', waterTarget: 180 },
          { timeSec: 135, titleEn: '4th Pour: 60g (Strength 2)', titleHu: '4. Felöntés: 60g (Testesség 2)', descEn: 'Pour 60g up to 240g total.', descHu: 'Önts 60g-ot 240g-ig.', waterTarget: 240 },
          { timeSec: 175, titleEn: '5th Pour: 60g (Final)', titleHu: '5. Felöntés: 60g (Zárás)', descEn: 'Pour final 60g up to 300g. Total drawdown by 3:30.', descHu: 'Öntsd fel a végső 300g-ra. 3:30-ra lefolyik.', waterTarget: 300 },
        ],
        tag: 'WBrC'
      }
    ]
  },
  {
    id: 'french-press',
    nameEn: 'French Press',
    nameHu: 'French Press (Dugattyús)',
    category: 'immersion',
    subtitleEn: 'Full immersion with heavy body and natural oils',
    subtitleHu: 'Teljes testes kávé gazdag természetes olajokkal',
    defaultRatio: 15,
    minRatio: 12,
    maxRatio: 17,
    defaultCoffee: 30,
    defaultWater: 450,
    defaultGrind: 'coarse',
    tempRangeC: [92, 96],
    recipes: [
      {
        id: 'hoffmann-french-press',
        nameEn: 'James Hoffmann French Press',
        nameHu: 'James Hoffmann French Press Technika',
        creatorEn: 'James Hoffmann',
        creatorHu: 'James Hoffmann',
        descEn: 'Coarse-medium grind, 4 min steep, break crust, spoon foam, 5 min settle, plunge only surface.',
        descHu: '4 perc áztatás, kéreg feltörése, hab leszedése, 5 perc leülepedés, szűrő csak a felszínig.',
        defaultRatio: 16.6,
        minRatio: 14,
        maxRatio: 18,
        defaultCoffee: 30,
        defaultWater: 500,
        recommendedTempC: 95,
        grindSize: 'medium-coarse',
        brewTimeSec: 480,
        steps: [
          { timeSec: 0, titleEn: 'Add Coffee & Pour All Water', titleHu: 'Kávé és Teljes Víz', descEn: 'Pour 500g boiling water directly onto 30g coffee.', descHu: 'Önts 500g forrásban lévő vizet a 30g kávéra.', waterTarget: 500 },
          { timeSec: 240, titleEn: 'Break Crust & Scoop Foam', titleHu: 'Kéreg Feltörése és Hab Leszedése', descEn: 'At 4:00, gently stir the crust on top. Scoop off floating foam & silty grounds with 2 spoons.', descHu: '4:00-nál keverd meg a felszínt. Szedd le a lebegő habot két kanállal.' },
          { timeSec: 300, titleEn: 'The Silent Settle (5 mins)', titleHu: 'Pihentetés és Ülepítés', descEn: 'Wait 5-8 more minutes without plunging. Grounds settle to bottom creating a clean cup.', descHu: 'Várj még 4-5 percet lenyomás nélkül. A finom zacc leülepszik az aljára.' },
          { timeSec: 480, titleEn: 'Insert Screen (Don\'t Compress)', titleHu: 'Szűrő Behelyezése', descEn: 'Place the plunger just under the liquid surface to act as a sieve. Pour gently!', descHu: 'Csak a folyadék tetejéig engedd a szűrőt, ne nyomd le a zaccig. Óvatosan töltsd ki!' },
        ],
        tag: 'Clean'
      }
    ]
  },
  {
    id: 'cold-brew',
    nameEn: 'Cold Brew',
    nameHu: 'Cold Brew (Hideg Áztatás)',
    category: 'cold',
    subtitleEn: '12-24h smooth, ultra-low acidity cold brew',
    subtitleHu: '12-24 órás selymes, savmentes hideg kávé',
    defaultRatio: 10, // 1:10
    minRatio: 5,
    maxRatio: 18,
    defaultCoffee: 80,
    defaultWater: 800,
    defaultGrind: 'coarse',
    tempRangeC: [4, 20],
    recipes: [
      {
        id: 'hoffmann-cold-brew',
        nameEn: 'James Hoffmann 18h Concentrate',
        nameHu: 'James Hoffmann 18 órás Koncentrátum',
        creatorEn: 'James Hoffmann (calculate.coffee)',
        creatorHu: 'James Hoffmann',
        descEn: 'Coarse grind, 1:10 ratio, 18-24 hours cold steeping. Versatile concentrate to pour over ice with water, milk or tonic.',
        descHu: 'Durva őrlés, 1:10 arány, 18-24 órás áztatás szobahőn vagy hűtőben. Sokoldalú koncentrátum jégre, vízzel, tejjel vagy tonikkal hígítva.',
        defaultRatio: 10,
        minRatio: 6,
        maxRatio: 12,
        defaultCoffee: 80,
        defaultWater: 800,
        recommendedTempC: 20,
        grindSize: 'coarse',
        brewTimeSec: 64800, // 18 hours
        steps: [
          { timeSec: 0, titleEn: 'Coarse Grind & Dose', titleHu: 'Durva Őrlés & Kimérés', descEn: 'Grind 80g coarsely (Timemore C2: 25-28 clicks). Place in a clean jar or cold brew vessel.', descHu: 'Őrölj 80g kávét durvára (Timemore C2: 25-28 klikk). Tedd tiszta üvegbe vagy cold brew edénybe.' },
          { timeSec: 30, titleEn: 'Slow Cold Water Pour', titleHu: 'Lassú Hideg Felöntés', descEn: 'Slowly pour 800g fresh cold filtered water over grounds, ensuring all are submerged.', descHu: 'Lassan önts rá 800g friss hideg szűrt vizet, hogy minden kávé átnedvesedjen.', waterTarget: 800 },
          { timeSec: 60, titleEn: 'Gently Stir', titleHu: 'Gyengéd Átkeverés', descEn: 'Stir gently for 30s with a spoon to break up any dry clumps and fully saturate.', descHu: 'Keverd át 30 másodpercig kanállal, hogy ne maradjon száraz csomó.' },
          { timeSec: 120, titleEn: 'Seal & Steep 18h', titleHu: 'Lezárás & 18 Óra Áztatás', descEn: 'Seal jar with airtight lid. Let steep for 18h at room temp (or 24h in the fridge).', descHu: 'Zárd le légmentesen. Hagyd állni szobahőmérsékleten 18 órát (vagy hűtőben 24 órát).' },
          { timeSec: 64800, titleEn: 'Filter & Dilute 1:1', titleHu: 'Leszűrés & 1:1 Fogyasztás', descEn: 'Filter through a fine sieve or paper filter. Dilute 1:1 with cold water, milk or tonic over ice!', descHu: 'Szűrd le finom szűrőn vagy papírfilteren. Hígítsd 1:1 arányban hideg vízzel, tejjel vagy tonikkal jégre töltve!' },
        ],
        tag: 'Concentrate'
      },
      {
        id: 'classic-toddy-cold-brew',
        nameEn: 'Classic Toddy Ready-to-Drink',
        nameHu: 'Klasszikus Toddy (Azonnal Fogyasztható)',
        creatorEn: 'Classic 1964 Toddy Recipe',
        creatorHu: 'Klasszikus Toddy Recept',
        descEn: '1:15 to 1:16 ratio, 12-16 hours steep. Smooth, refreshing cold brew you can pour straight over ice with zero dilution.',
        descHu: '1:15 - 1:16 arány, 12-16 óra áztatás. Selymes, üdítő hideg kávé, amit hígítás nélkül közvetlenül jégre tölthetsz.',
        defaultRatio: 15,
        minRatio: 12,
        maxRatio: 17,
        defaultCoffee: 60,
        defaultWater: 900,
        recommendedTempC: 18,
        grindSize: 'coarse',
        brewTimeSec: 43200, // 12 hours
        steps: [
          { timeSec: 0, titleEn: 'Grind & Place in Brewer', titleHu: 'Őrlés & Edénybe Töltés', descEn: 'Coarse grind 60g coffee into cold brew vessel.', descHu: 'Őrölj 60g kávét durvára a Cold Brew edénybe.' },
          { timeSec: 30, titleEn: 'Pour 900g Cold Water', titleHu: '900g Hideg Víz Felöntése', descEn: 'Pour 900g fresh cold water slowly in circles.', descHu: 'Önts rá körkörösen 900g friss hideg vizet.', waterTarget: 900 },
          { timeSec: 60, titleEn: 'Stir & Cover', titleHu: 'Keverés & Lefedés', descEn: 'Stir to submerge all grounds, seal lid.', descHu: 'Keverd el, hogy minden szemcse átázzon, majd zárd le a tetejét.' },
          { timeSec: 120, titleEn: 'Steep 12-16 Hours', titleHu: '12-16 Óra Áztatás', descEn: 'Leave undisturbed at room temperature for 12 hours or fridge for 16 hours.', descHu: 'Hagyd pihenni szobahőn 12 órát vagy a hűtőben 16 órát.' },
          { timeSec: 43200, titleEn: 'Strain & Enjoy Straight', titleHu: 'Leszűrés & Jégre Töltés', descEn: 'Strain coffee through filter. Pour directly over ice cubes — no dilution required!', descHu: 'Engedd át a szűrőn. Töltsd egyenesen jégkockákra — nem igényel hígítást!' },
        ],
        tag: 'Ready-to-Drink'
      },
      {
        id: 'aeropress-rapid-cold-brew',
        nameEn: 'AeroPress 2-Min Cold Brew',
        nameHu: 'AeroPress 2 Perces Gyors Hidegfőzet',
        creatorEn: 'Alan Adler (AeroPress Creator)',
        creatorHu: 'Alan Adler (AeroPress feltalálója)',
        descEn: 'Medium-fine grind, room temp or chilled water, brisk 1-minute stir and smooth press over ice cubes. Delicious cold coffee in 2 minutes flat!',
        descHu: 'Közepesen finom őrlemény, szoba-hőmérsékletű vagy hideg víz, 1 perces intenzív keverés, lassú préselés jégre. Frissítő hideg kávé 2 perc alatt!',
        defaultRatio: 7.5,
        minRatio: 6,
        maxRatio: 10,
        defaultCoffee: 16,
        defaultWater: 120,
        recommendedTempC: 20,
        grindSize: 'medium-fine',
        brewTimeSec: 120,
        steps: [
          { timeSec: 0, titleEn: 'Dose & Cold Water', titleHu: 'Kávé & Hideg Víz', descEn: 'Add 16g medium-fine coffee to AeroPress chamber. Pour 120g room-temp or cold water.', descHu: 'Tegyél 16g közepesen finom kávét a hengerbe. Önts rá 120g hideg/szoba-hőmérsékletű vizet.', waterTarget: 120 },
          { timeSec: 15, titleEn: 'Brisk 1-Min Stir', titleHu: '1 Perces Intenzív Keverés', descEn: 'Stir briskly and continuously for 60 seconds. The agitation accelerates cold extraction.', descHu: 'Keverd intenzíven és folyamatosan 60 másodpercig. A turbulencia felgyorsítja a hideg kioldódást.' },
          { timeSec: 75, titleEn: 'Insert Plunger & Press', titleHu: 'Dugattyú & Préselés', descEn: 'Insert plunger and press gently over 40 seconds directly into a glass filled with ice.', descHu: 'Helyezd be a dugattyút és nyomd le lassan 40 mp alatt közvetlenül egy jéggel teli pohárba.' },
        ],
        tag: 'Rapid Cold'
      }
    ]
  }
];
