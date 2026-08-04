import type { Brand, Engine, Model } from "./tuning-data";

const d = (name: string, hp: number, nm: number, turbo = true): Engine => ({
  name,
  fuel: "diesel",
  turbo,
  hp,
  nm,
});

const b = (name: string, hp: number, nm: number, turbo = true): Engine => ({
  name,
  fuel: "bensin",
  turbo,
  hp,
  nm,
});

export const EXTRA_MODELS: Record<string, Model[]> = {
  Audi: [
    {
      name: "A3 8P",
      engines: [
        d("1.9 TDI 105", 105, 250),
        d("2.0 TDI 140", 140, 320),
        d("2.0 TDI 170", 170, 350),
        b("1.8 TFSI 160", 160, 250),
        b("2.0 TFSI 200", 200, 280),
        b("2.0 TFSI S3 265", 265, 350),
      ],
    },
    {
      name: "A4 B8",
      engines: [
        d("2.0 TDI 143", 143, 320),
        d("2.0 TDI 177", 177, 380),
        d("3.0 TDI 245", 245, 500),
        b("1.8 TFSI 170", 170, 320),
        b("2.0 TFSI 211", 211, 350),
      ],
    },
    {
      name: "A6 C8",
      engines: [
        d("40 TDI", 204, 400),
        d("50 TDI", 286, 620),
        b("45 TFSI", 245, 370),
        b("55 TFSI", 340, 500),
      ],
    },
    {
      name: "TT 8J / 8S",
      engines: [
        d("2.0 TDI", 184, 380),
        b("1.8 TFSI", 180, 250),
        b("2.0 TFSI", 230, 370),
        b("2.5 TFSI RS", 400, 480),
      ],
    },
  ],
  BMW: [
    {
      name: "3-serie E90/E91",
      engines: [
        d("318d", 143, 300),
        d("320d", 184, 380),
        d("330d", 245, 520),
        b("320i", 170, 210, false),
        b("335i", 306, 400),
      ],
    },
    {
      name: "5-serie E60/E61",
      engines: [
        d("520d", 177, 350),
        d("525d", 197, 400),
        d("530d", 235, 500),
        d("535d", 286, 580),
        b("535i", 306, 400),
      ],
    },
    {
      name: "7-serie G11/G12",
      engines: [d("730d", 265, 620), d("740d", 320, 680), b("740i", 326, 450), b("750i", 530, 750)],
    },
    {
      name: "X1 F48",
      engines: [
        d("sDrive18d", 150, 350),
        d("xDrive20d", 190, 400),
        d("xDrive25d", 231, 450),
        b("xDrive25i", 231, 350),
      ],
    },
  ],
  "Mercedes-Benz": [
    {
      name: "C-klass W204",
      engines: [
        d("C 200 CDI", 136, 360),
        d("C 220 CDI", 170, 400),
        d("C 250 CDI", 204, 500),
        b("C 180 CGI", 156, 250),
        b("C 250 CGI", 204, 310),
      ],
    },
    {
      name: "E-klass W212",
      engines: [
        d("E 200 CDI", 136, 360),
        d("E 220 CDI", 170, 400),
        d("E 250 CDI", 204, 500),
        d("E 350 CDI", 265, 620),
        b("E 400", 333, 480),
      ],
    },
    {
      name: "CLA C117/C118",
      engines: [
        d("CLA 200 d", 150, 320),
        d("CLA 220 d", 190, 400),
        b("CLA 200", 163, 250),
        b("CLA 250", 224, 350),
        b("AMG CLA 35", 306, 400),
      ],
    },
    {
      name: "GLE W166/V167",
      engines: [
        d("GLE 250 d", 204, 500),
        d("GLE 350 d", 258, 620),
        d("GLE 400 d", 330, 700),
        b("GLE 450", 367, 500),
        b("AMG GLE 53", 435, 520),
      ],
    },
  ],
  Volvo: [
    {
      name: "S60 II",
      engines: [
        d("D3", 150, 350),
        d("D4", 190, 400),
        d("D5", 215, 440),
        b("T4", 190, 300),
        b("T5", 245, 350),
        b("T6", 306, 400),
      ],
    },
    {
      name: "S90",
      engines: [
        d("D3", 150, 320),
        d("D4", 190, 400),
        d("D5", 235, 480),
        b("T5", 250, 350),
        b("T6", 310, 400),
      ],
    },
    {
      name: "V70 II / III",
      engines: [
        d("1.6D", 109, 240),
        d("D3", 163, 400),
        d("D4", 181, 400),
        d("D5", 215, 440),
        b("T5", 245, 350),
      ],
    },
    {
      name: "XC70 II",
      engines: [
        d("D3", 163, 400),
        d("D4", 181, 420),
        d("D5", 215, 440),
        b("T5", 254, 360),
        b("T6", 304, 440),
      ],
    },
  ],
  Volkswagen: [
    {
      name: "Golf VI",
      engines: [
        d("1.6 TDI", 105, 250),
        d("2.0 TDI", 140, 320),
        b("1.4 TSI", 160, 240),
        b("2.0 TSI GTI", 210, 280),
        b("2.0 TSI R", 270, 350),
      ],
    },
    {
      name: "Touareg II / III",
      engines: [
        d("3.0 V6 TDI 204", 204, 450),
        d("3.0 V6 TDI 286", 286, 600),
        d("4.2 V8 TDI", 340, 800),
        b("3.0 TSI", 340, 450),
      ],
    },
    {
      name: "T-Roc",
      engines: [
        d("1.6 TDI", 115, 250),
        d("2.0 TDI", 150, 340),
        b("1.5 TSI", 150, 250),
        b("2.0 TSI", 190, 320),
        b("2.0 TSI R", 300, 400),
      ],
    },
    {
      name: "Crafter II",
      engines: [
        d("2.0 TDI 102", 102, 300),
        d("2.0 TDI 140", 140, 340),
        d("2.0 BiTDI 177", 177, 410),
      ],
    },
  ],
  Ford: [
    {
      name: "Mondeo Mk4 / Mk5",
      engines: [
        d("1.6 TDCi", 115, 270),
        d("2.0 TDCi 150", 150, 350),
        d("2.0 TDCi 180", 180, 400),
        b("1.5 EcoBoost", 160, 240),
        b("2.0 EcoBoost", 240, 340),
      ],
    },
    {
      name: "Mustang VI",
      engines: [b("2.3 EcoBoost", 317, 432), b("5.0 V8 GT", 450, 529, false)],
    },
    {
      name: "S-Max / Galaxy",
      engines: [
        d("2.0 TDCi 150", 150, 350),
        d("2.0 TDCi 180", 180, 400),
        d("2.0 Bi-Turbo TDCi", 210, 450),
        b("2.0 EcoBoost", 240, 345),
      ],
    },
  ],
  Toyota: [
    {
      name: "RAV4 III / IV",
      engines: [
        d("2.0 D-4D", 124, 310),
        d("2.2 D-4D", 150, 340),
        d("2.2 D-CAT", 177, 400),
        b("2.0 Valvematic", 152, 196, false),
      ],
    },
    {
      name: "Proace",
      engines: [d("1.5 D-4D", 120, 300), d("2.0 D-4D 145", 145, 340), d("2.0 D-4D 180", 180, 400)],
    },
    {
      name: "Hilux VIII",
      engines: [d("2.4 D-4D", 150, 400), d("2.8 D-4D", 204, 500)],
    },
  ],
  Peugeot: [
    {
      name: "2008",
      engines: [
        d("1.5 BlueHDi", 130, 300),
        d("1.6 BlueHDi", 120, 300),
        b("1.2 PureTech", 130, 230),
      ],
    },
    {
      name: "5008",
      engines: [
        d("1.5 BlueHDi", 130, 300),
        d("2.0 BlueHDi", 180, 400),
        b("1.6 PureTech", 180, 250),
      ],
    },
    {
      name: "Boxer",
      engines: [
        d("2.0 BlueHDi", 130, 340),
        d("2.2 BlueHDi 140", 140, 340),
        d("2.2 BlueHDi 165", 165, 370),
      ],
    },
  ],
  Renault: [
    {
      name: "Master III",
      engines: [
        d("2.3 dCi 125", 125, 310),
        d("2.3 dCi 145", 145, 360),
        d("2.3 dCi 165", 165, 380),
        d("2.3 dCi 180", 180, 400),
      ],
    },
    {
      name: "Talisman",
      engines: [
        d("1.6 dCi", 130, 320),
        d("1.6 dCi BiTurbo", 160, 380),
        d("2.0 Blue dCi", 200, 400),
        b("1.8 TCe", 225, 300),
      ],
    },
  ],
  Fiat: [
    {
      name: "Doblo",
      engines: [
        d("1.3 MultiJet", 95, 200),
        d("1.6 MultiJet", 120, 320),
        d("2.0 MultiJet", 135, 320),
      ],
    },
    {
      name: "Talento",
      engines: [
        d("1.6 MultiJet", 125, 320),
        d("1.6 MultiJet TwinTurbo", 145, 340),
        d("2.0 EcoJet", 170, 380),
      ],
    },
  ],
  Opel: [
    {
      name: "Corsa E / F",
      engines: [
        d("1.3 CDTI", 95, 190),
        d("1.5 Diesel", 102, 250),
        b("1.2 Turbo", 130, 230),
        b("1.6 Turbo OPC", 207, 280),
      ],
    },
    {
      name: "Mokka",
      engines: [d("1.6 CDTI", 136, 320), b("1.4 Turbo", 140, 200), b("1.2 Turbo", 130, 230)],
    },
    {
      name: "Movano",
      engines: [
        d("2.3 CDTI 125", 125, 310),
        d("2.3 CDTI 145", 145, 360),
        d("2.3 BiTurbo CDTI", 170, 380),
      ],
    },
  ],
  Nissan: [
    {
      name: "Pulsar",
      engines: [d("1.5 dCi", 110, 260), b("1.2 DIG-T", 115, 190), b("1.6 DIG-T", 190, 240)],
    },
    {
      name: "Navara D40 / NP300",
      engines: [d("2.3 dCi", 190, 450), d("2.5 dCi", 190, 450), d("3.0 V6 dCi", 231, 550)],
    },
    {
      name: "NV300 / Primastar",
      engines: [d("1.6 dCi", 125, 320), d("1.6 dCi BiTurbo", 145, 340), d("2.0 dCi", 170, 380)],
    },
  ],
  Hyundai: [
    {
      name: "Kona",
      engines: [
        d("1.6 CRDi", 136, 320),
        b("1.0 T-GDi", 120, 172),
        b("1.6 T-GDi", 177, 265),
        b("2.0 T-GDi N", 280, 392),
      ],
    },
    {
      name: "Santa Fe III / IV",
      engines: [d("2.0 CRDi", 185, 400), d("2.2 CRDi", 200, 440), b("2.0 T-GDi", 235, 353)],
    },
  ],
  Kia: [
    {
      name: "Rio",
      engines: [d("1.4 CRDi", 90, 240), b("1.0 T-GDi 100", 100, 172), b("1.0 T-GDi 120", 120, 172)],
    },
    { name: "Optima", engines: [d("1.7 CRDi", 141, 340), b("2.0 T-GDi", 245, 353)] },
  ],
  Honda: [
    {
      name: "Accord VIII",
      engines: [
        d("2.2 i-DTEC 150", 150, 350),
        d("2.2 i-DTEC 180", 180, 380),
        b("2.0 i-VTEC", 156, 192, false),
        b("2.4 i-VTEC", 201, 234, false),
      ],
    },
  ],
  "Land Rover": [
    {
      name: "Discovery 4",
      engines: [
        d("2.7 TDV6", 190, 440),
        d("3.0 TDV6", 211, 520),
        d("3.0 SDV6", 256, 600),
        b("3.0 V6 Supercharged", 340, 450),
      ],
    },
  ],
  Porsche: [
    {
      name: "Boxster / Cayman 718",
      engines: [
        b("2.0 Turbo", 300, 380),
        b("2.5 S Turbo", 350, 420),
        b("2.5 GTS Turbo", 365, 430),
        b("4.0 GTS", 400, 420, false),
      ],
    },
  ],
  Citroën: [
    {
      name: "Jumper",
      engines: [
        d("2.0 BlueHDi", 130, 340),
        d("2.2 BlueHDi 140", 140, 340),
        d("2.2 BlueHDi 165", 165, 370),
      ],
    },
    {
      name: "Berlingo III (2018-)",
      engines: [
        d("1.5 BlueHDi 100", 100, 250),
        d("1.5 BlueHDi 130", 130, 300),
        d("1.6 BlueHDi", 120, 300),
      ],
    },
  ],
  Škoda: [
    {
      name: "Superb II",
      engines: [
        d("1.6 TDI", 105, 250),
        d("2.0 TDI 140", 140, 320),
        d("2.0 TDI 170", 170, 350),
        b("1.8 TSI", 160, 250),
        b("2.0 TSI", 200, 280),
      ],
    },
  ],
  SEAT: [
    {
      name: "Leon 1P",
      engines: [
        d("1.9 TDI", 105, 250),
        d("2.0 TDI", 170, 350),
        b("1.8 TSI", 160, 250),
        b("2.0 TFSI Cupra", 240, 300),
      ],
    },
  ],
};

export const EXTRA_BRANDS: Brand[] = [
  {
    name: "Abarth",
    models: [
      {
        name: "500 / 595 / 695",
        engines: [
          b("1.4 T-Jet 135", 135, 206),
          b("1.4 T-Jet 165", 165, 230),
          b("1.4 T-Jet Competizione", 180, 250),
        ],
      },
      { name: "124 Spider", engines: [b("1.4 MultiAir Turbo", 170, 250)] },
    ],
  },
  {
    name: "Bentley",
    models: [
      { name: "Continental GT", engines: [b("4.0 V8", 550, 770), b("6.0 W12", 635, 900)] },
      {
        name: "Bentayga",
        engines: [d("4.0 V8 TDI", 435, 900), b("4.0 V8", 550, 770), b("6.0 W12", 608, 900)],
      },
      { name: "Flying Spur", engines: [b("4.0 V8", 550, 770), b("6.0 W12", 635, 900)] },
    ],
  },
  {
    name: "Cadillac",
    models: [
      { name: "ATS", engines: [b("2.0 Turbo", 276, 400), b("3.6 V6 Twin Turbo ATS-V", 470, 603)] },
      {
        name: "CTS",
        engines: [
          b("2.0 Turbo", 276, 400),
          b("3.6 V6 Twin Turbo", 420, 583),
          b("6.2 V8 Supercharged CTS-V", 649, 855),
        ],
      },
      { name: "Escalade", engines: [b("6.2 V8", 426, 623, false), d("3.0 Duramax", 281, 623)] },
    ],
  },
  {
    name: "Chevrolet",
    models: [
      {
        name: "Camaro VI",
        engines: [
          b("2.0 Turbo", 275, 400),
          b("6.2 V8", 455, 617, false),
          b("6.2 V8 Supercharged ZL1", 650, 881),
        ],
      },
      {
        name: "Corvette C7 / C8",
        engines: [
          b("6.2 V8 Stingray C7", 466, 630, false),
          b("6.2 V8 Z06 C7", 659, 881),
          b("6.2 V8 Stingray C8", 482, 613, false),
        ],
      },
      {
        name: "Silverado",
        engines: [
          d("3.0 Duramax", 277, 624),
          d("6.6 Duramax", 445, 1234),
          b("6.2 V8", 420, 624, false),
        ],
      },
    ],
  },
  {
    name: "Chrysler",
    models: [
      {
        name: "300C",
        engines: [
          d("3.0 CRD", 239, 550),
          b("3.6 V6", 292, 353, false),
          b("5.7 V8 HEMI", 363, 534, false),
        ],
      },
      { name: "Pacifica", engines: [b("3.6 V6", 287, 355, false)] },
    ],
  },
  {
    name: "Dodge",
    models: [
      {
        name: "Challenger",
        engines: [
          b("3.6 V6", 305, 363, false),
          b("5.7 V8 HEMI", 375, 555, false),
          b("6.2 V8 Supercharged Hellcat", 717, 889),
        ],
      },
      {
        name: "Charger",
        engines: [
          b("3.6 V6", 292, 353, false),
          b("5.7 V8 HEMI", 370, 536, false),
          b("6.2 V8 Supercharged Hellcat", 717, 881),
        ],
      },
      {
        name: "Durango",
        engines: [
          b("3.6 V6", 295, 353, false),
          b("5.7 V8 HEMI", 360, 529, false),
          b("6.2 V8 Supercharged SRT", 710, 875),
        ],
      },
    ],
  },
  {
    name: "DS Automobiles",
    models: [
      {
        name: "DS 3",
        engines: [
          d("1.5 BlueHDi", 130, 300),
          d("1.6 BlueHDi", 120, 300),
          b("1.2 PureTech", 130, 230),
          b("1.6 THP Performance", 208, 300),
        ],
      },
      {
        name: "DS 4",
        engines: [
          d("1.5 BlueHDi", 130, 300),
          d("2.0 BlueHDi", 180, 400),
          b("1.6 PureTech", 225, 300),
        ],
      },
      {
        name: "DS 7",
        engines: [
          d("1.5 BlueHDi", 130, 300),
          d("2.0 BlueHDi", 180, 400),
          b("1.6 PureTech", 225, 300),
        ],
      },
    ],
  },
  {
    name: "Ferrari",
    models: [
      {
        name: "488",
        engines: [b("3.9 V8 Twin Turbo GTB", 670, 760), b("3.9 V8 Twin Turbo Pista", 720, 770)],
      },
      {
        name: "Portofino",
        engines: [b("3.9 V8 Twin Turbo", 600, 760), b("3.9 V8 Twin Turbo M", 620, 760)],
      },
      { name: "F8 Tributo", engines: [b("3.9 V8 Twin Turbo", 720, 770)] },
    ],
  },
  {
    name: "Infiniti",
    models: [
      {
        name: "Q30 / QX30",
        engines: [
          d("1.5d", 109, 260),
          d("2.2d", 170, 350),
          b("1.6t", 156, 250),
          b("2.0t", 211, 350),
        ],
      },
      { name: "Q50", engines: [d("2.2d", 170, 400), b("2.0t", 211, 350), b("3.0t", 405, 475)] },
      {
        name: "FX / QX70",
        engines: [d("3.0d", 238, 550), b("3.7 V6", 320, 360, false), b("5.0 V8", 390, 500, false)],
      },
    ],
  },
  {
    name: "Isuzu",
    models: [
      {
        name: "D-Max",
        engines: [d("1.9 Ddi", 164, 360), d("2.5 Twin Turbo", 163, 400), d("3.0 Ddi", 177, 430)],
      },
      { name: "N-Series", engines: [d("3.0 TD", 150, 375), d("5.2 TD", 190, 510)] },
    ],
  },
  {
    name: "Iveco",
    models: [
      {
        name: "Daily IV / V",
        engines: [
          d("2.3 HPI", 126, 290),
          d("3.0 HPI", 146, 350),
          d("3.0 HPT", 170, 400),
          d("3.0 Twin Turbo", 205, 470),
        ],
      },
      {
        name: "Daily VI",
        engines: [
          d("2.3 F1A 136", 136, 350),
          d("2.3 F1A 156", 156, 380),
          d("3.0 F1C 180", 180, 430),
          d("3.0 F1C 210", 210, 470),
        ],
      },
    ],
  },
  {
    name: "Lamborghini",
    models: [
      {
        name: "Urus",
        engines: [b("4.0 V8 Twin Turbo", 650, 850), b("4.0 V8 Twin Turbo Performante", 666, 850)],
      },
      {
        name: "Huracán",
        engines: [b("5.2 V10", 610, 560, false), b("5.2 V10 Performante", 640, 600, false)],
      },
      {
        name: "Aventador",
        engines: [b("6.5 V12", 700, 690, false), b("6.5 V12 SVJ", 770, 720, false)],
      },
    ],
  },
  {
    name: "Lexus",
    models: [
      {
        name: "IS",
        engines: [
          d("200d", 150, 340),
          d("220d", 177, 400),
          b("200t", 245, 350),
          b("3.5 V6 IS 350", 311, 380, false),
        ],
      },
      { name: "NX", engines: [b("200t / 300", 238, 350), b("2.5 NX 250", 203, 249, false)] },
      {
        name: "RX",
        engines: [b("2.0 Turbo RX 300", 238, 350), b("3.5 V6 RX 350", 295, 363, false)],
      },
      { name: "RC F", engines: [b("5.0 V8", 477, 530, false)] },
    ],
  },
  {
    name: "MAN",
    models: [
      {
        name: "TGE",
        engines: [
          d("2.0 TDI 102", 102, 300),
          d("2.0 TDI 140", 140, 340),
          d("2.0 BiTDI 177", 177, 410),
        ],
      },
    ],
  },
  {
    name: "Maserati",
    models: [
      {
        name: "Ghibli",
        engines: [
          d("3.0 V6 Diesel", 275, 600),
          b("3.0 V6 Twin Turbo", 350, 500),
          b("3.0 V6 Twin Turbo S", 430, 580),
        ],
      },
      {
        name: "Levante",
        engines: [
          d("3.0 V6 Diesel", 275, 600),
          b("3.0 V6 Twin Turbo S", 430, 580),
          b("3.8 V8 Twin Turbo Trofeo", 580, 730),
        ],
      },
      {
        name: "Quattroporte",
        engines: [
          d("3.0 V6 Diesel", 275, 600),
          b("3.0 V6 Twin Turbo", 430, 580),
          b("3.8 V8 Twin Turbo", 530, 710),
        ],
      },
    ],
  },
  {
    name: "MG",
    models: [
      { name: "MG3", engines: [b("1.5 VTi-Tech", 106, 137, false)] },
      { name: "MG6", engines: [b("1.5 T-GDi", 169, 250)] },
      { name: "ZS", engines: [b("1.0 T-GDi", 111, 160), b("1.5 VTi-Tech", 106, 141, false)] },
    ],
  },
  {
    name: "RAM",
    models: [
      {
        name: "1500",
        engines: [
          d("3.0 EcoDiesel", 260, 651),
          b("3.0 Hurricane", 420, 636),
          b("5.7 V8 HEMI", 395, 556, false),
        ],
      },
      {
        name: "2500 / 3500",
        engines: [
          d("6.7 Cummins", 370, 1152),
          d("6.7 Cummins High Output", 420, 1458),
          b("6.4 V8 HEMI", 410, 582, false),
        ],
      },
    ],
  },
  {
    name: "Smart",
    models: [
      {
        name: "Fortwo 451",
        engines: [d("0.8 CDI", 54, 130), b("1.0 Turbo", 84, 120), b("1.0 Turbo Brabus", 102, 147)],
      },
      { name: "Fortwo 453", engines: [b("0.9 Turbo", 90, 135), b("0.9 Turbo Brabus", 109, 170)] },
    ],
  },
  {
    name: "SsangYong",
    models: [
      {
        name: "Korando",
        engines: [d("1.6 e-XDi", 136, 324), d("2.0 e-XDi", 175, 360), b("1.5 GDI Turbo", 163, 280)],
      },
      {
        name: "Rexton",
        engines: [
          d("2.2 e-XDi 181", 181, 420),
          d("2.2 e-XDi 202", 202, 441),
          d("2.7 XDi", 186, 402),
        ],
      },
      {
        name: "Musso",
        engines: [d("2.2 e-XDi 181", 181, 420), d("2.2 e-XDi 202", 202, 441)],
      },
    ],
  },
  {
    name: "Subaru",
    models: [
      {
        name: "Impreza WRX / STI",
        engines: [b("2.0 Turbo WRX", 268, 350), b("2.5 Turbo WRX STI", 300, 407)],
      },
      {
        name: "Forester",
        engines: [d("2.0D Boxer", 147, 350), b("2.0 XT", 240, 350), b("2.5 XT", 230, 320)],
      },
      {
        name: "Legacy / Outback",
        engines: [d("2.0D Boxer", 150, 350), b("2.5 Turbo", 265, 350), b("3.6R", 260, 350, false)],
      },
      { name: "BRZ", engines: [b("2.0 Boxer", 200, 205, false), b("2.4 Boxer", 234, 250, false)] },
    ],
  },
  {
    name: "Suzuki",
    models: [
      {
        name: "Swift",
        engines: [
          d("1.3 DDiS", 75, 190),
          b("1.0 Boosterjet", 111, 170),
          b("1.4 Boosterjet Sport", 140, 230),
        ],
      },
      {
        name: "Vitara",
        engines: [
          d("1.6 DDiS", 120, 320),
          b("1.0 Boosterjet", 111, 170),
          b("1.4 Boosterjet", 140, 220),
        ],
      },
      {
        name: "S-Cross",
        engines: [
          d("1.6 DDiS", 120, 320),
          b("1.0 Boosterjet", 111, 170),
          b("1.4 Boosterjet", 140, 220),
        ],
      },
      { name: "Jimny", engines: [b("1.3 VVT", 85, 110, false), b("1.5 VVT", 102, 130, false)] },
    ],
  },
];
