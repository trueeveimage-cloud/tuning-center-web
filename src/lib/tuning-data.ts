import { EXTRA_BRANDS, EXTRA_MODELS } from "./tuning-data-extra";

export type Fuel = "diesel" | "bensin";

export type Engine = {
  name: string;
  fuel: Fuel;
  turbo: boolean;
  hp: number;
  nm: number;
};

export type Model = { name: string; engines: Engine[] };
export type Brand = { name: string; models: Model[] };

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

const CORE_BRANDS: Brand[] = [
  {
    name: "Alfa Romeo",
    models: [
      {
        name: "Giulia",
        engines: [
          d("2.2 JTDm 180", 180, 450),
          d("2.2 JTDm 210", 210, 470),
          b("2.0 Turbo", 200, 330),
          b("2.0 Turbo Veloce", 280, 400),
        ],
      },
      {
        name: "Stelvio",
        engines: [
          d("2.2 JTDm 190", 190, 450),
          d("2.2 JTDm 210", 210, 470),
          b("2.0 Turbo", 280, 400),
        ],
      },
      {
        name: "Giulietta",
        engines: [d("2.0 JTDM", 170, 350), b("1.4 MultiAir", 170, 250), b("1750 TBi", 240, 340)],
      },
    ],
  },
  {
    name: "Audi",
    models: [
      {
        name: "A3 8V",
        engines: [
          d("1.6 TDI", 110, 250),
          d("2.0 TDI", 150, 320),
          b("1.4 TFSI", 150, 250),
          b("2.0 TFSI", 190, 320),
          b("2.0 TFSI S3", 310, 400),
        ],
      },
      {
        name: "A4 B9",
        engines: [
          d("2.0 TDI 150", 150, 320),
          d("2.0 TDI 190", 190, 400),
          d("3.0 TDI", 272, 600),
          b("2.0 TFSI 190", 190, 320),
          b("2.0 TFSI 252", 252, 370),
        ],
      },
      {
        name: "A5 F5",
        engines: [
          d("2.0 TDI", 190, 400),
          d("3.0 TDI", 286, 620),
          b("2.0 TFSI", 252, 370),
          b("3.0 TFSI S5", 354, 500),
        ],
      },
      {
        name: "A6 C7",
        engines: [
          d("2.0 TDI", 190, 400),
          d("3.0 TDI 218", 218, 500),
          d("3.0 TDI 272", 272, 580),
          b("2.0 TFSI", 252, 370),
        ],
      },
      {
        name: "Q5 FY",
        engines: [d("2.0 TDI", 190, 400), d("3.0 TDI", 286, 620), b("2.0 TFSI", 252, 370)],
      },
      {
        name: "Q7 4M",
        engines: [d("3.0 TDI 218", 218, 500), d("3.0 TDI 272", 272, 600), b("3.0 TFSI", 333, 440)],
      },
    ],
  },
  {
    name: "BMW",
    models: [
      {
        name: "1-serie F20",
        engines: [
          d("116d", 116, 270),
          d("120d", 190, 400),
          b("118i", 136, 220),
          b("M140i", 340, 500),
        ],
      },
      {
        name: "3-serie F30",
        engines: [
          d("318d", 150, 320),
          d("320d", 190, 400),
          d("330d", 258, 560),
          b("320i", 184, 270),
          b("330i", 252, 350),
          b("340i", 326, 450),
        ],
      },
      {
        name: "3-serie G20",
        engines: [
          d("318d", 150, 320),
          d("320d", 190, 400),
          d("330d", 286, 650),
          b("320i", 184, 300),
          b("330i", 258, 400),
          b("M340i", 374, 500),
        ],
      },
      {
        name: "5-serie F10",
        engines: [
          d("520d", 190, 400),
          d("525d", 218, 450),
          d("530d", 258, 560),
          b("528i", 245, 350),
          b("535i", 306, 400),
        ],
      },
      {
        name: "5-serie G30",
        engines: [
          d("520d", 190, 400),
          d("530d", 265, 620),
          b("520i", 184, 290),
          b("530i", 252, 350),
          b("540i", 340, 450),
        ],
      },
      {
        name: "X3 G01",
        engines: [d("20d", 190, 400), d("30d", 265, 620), b("20i", 184, 290), b("M40i", 360, 500)],
      },
      {
        name: "X5 F15",
        engines: [d("25d", 231, 500), d("30d", 258, 560), d("40d", 313, 630), b("50i", 450, 650)],
      },
    ],
  },
  {
    name: "Citroën",
    models: [
      { name: "C3", engines: [d("1.6 BlueHDi", 100, 254), b("1.2 PureTech", 110, 205)] },
      { name: "C4", engines: [d("1.5 BlueHDi", 130, 300), b("1.2 PureTech", 130, 230)] },
      {
        name: "C5 Aircross",
        engines: [
          d("1.5 BlueHDi", 130, 300),
          d("2.0 BlueHDi", 180, 400),
          b("1.6 PureTech", 180, 250),
        ],
      },
      {
        name: "Berlingo",
        engines: [d("1.5 BlueHDi 100", 100, 250), d("1.5 BlueHDi 130", 130, 300)],
      },
    ],
  },
  {
    name: "Cupra",
    models: [
      { name: "Ateca", engines: [b("2.0 TSI", 300, 400)] },
      {
        name: "Formentor",
        engines: [
          d("2.0 TDI", 150, 340),
          b("1.5 TSI", 150, 250),
          b("2.0 TSI", 245, 370),
          b("2.0 TSI VZ", 310, 400),
        ],
      },
      { name: "Leon", engines: [b("2.0 TSI", 245, 370), b("2.0 TSI VZ", 300, 400)] },
    ],
  },
  {
    name: "Dacia",
    models: [
      {
        name: "Duster",
        engines: [
          d("1.5 Blue dCi", 115, 260),
          b("1.3 TCe 130", 130, 240),
          b("1.3 TCe 150", 150, 250),
        ],
      },
      { name: "Sandero", engines: [b("0.9 TCe", 90, 140), b("1.0 TCe", 100, 160)] },
    ],
  },
  {
    name: "Fiat",
    models: [
      {
        name: "500 / 500 Abarth",
        engines: [
          b("0.9 TwinAir", 105, 145),
          b("1.4 T-Jet", 145, 206),
          b("1.4 T-Jet Competizione", 180, 250),
        ],
      },
      { name: "Tipo", engines: [d("1.6 MultiJet", 120, 320), b("1.4 T-Jet", 120, 215)] },
      {
        name: "Ducato",
        engines: [
          d("2.3 MultiJet 130", 130, 320),
          d("2.3 MultiJet 150", 150, 350),
          d("2.3 MultiJet 180", 180, 400),
        ],
      },
    ],
  },
  {
    name: "Ford",
    models: [
      {
        name: "Fiesta VII",
        engines: [
          d("1.5 TDCi", 120, 270),
          b("1.0 EcoBoost", 125, 170),
          b("1.5 EcoBoost ST", 200, 290),
        ],
      },
      {
        name: "Focus III",
        engines: [
          d("1.5 TDCi", 120, 270),
          d("2.0 TDCi", 150, 370),
          b("1.0 EcoBoost", 125, 170),
          b("2.0 EcoBoost ST", 250, 360),
        ],
      },
      {
        name: "Focus IV",
        engines: [
          d("1.5 EcoBlue", 120, 300),
          d("2.0 EcoBlue", 150, 370),
          b("1.0 EcoBoost", 125, 170),
          b("2.3 EcoBoost ST", 280, 420),
        ],
      },
      {
        name: "Kuga",
        engines: [d("1.5 TDCi", 120, 270), d("2.0 TDCi", 180, 400), b("1.5 EcoBoost", 150, 240)],
      },
      {
        name: "Ranger",
        engines: [
          d("2.0 EcoBlue", 170, 420),
          d("2.0 EcoBlue BiTurbo", 213, 500),
          d("3.2 TDCi", 200, 470),
        ],
      },
      {
        name: "Transit Custom",
        engines: [
          d("2.0 TDCi 105", 105, 360),
          d("2.0 TDCi 130", 130, 385),
          d("2.0 TDCi 170", 170, 405),
        ],
      },
    ],
  },
  {
    name: "Honda",
    models: [
      {
        name: "Civic X",
        engines: [
          b("1.0 VTEC Turbo", 129, 200),
          b("1.5 VTEC Turbo", 182, 240),
          b("2.0 VTEC Turbo Type R", 320, 400),
        ],
      },
      { name: "CR-V", engines: [d("1.6 i-DTEC", 160, 350), b("1.5 VTEC Turbo", 193, 243)] },
    ],
  },
  {
    name: "Hyundai",
    models: [
      { name: "i20", engines: [b("1.0 T-GDi", 100, 172), b("1.6 T-GDi N", 204, 275)] },
      {
        name: "i30",
        engines: [d("1.6 CRDi", 136, 300), b("1.4 T-GDi", 140, 242), b("2.0 T-GDi N", 275, 353)],
      },
      {
        name: "Tucson",
        engines: [d("1.6 CRDi", 136, 320), d("2.0 CRDi", 185, 400), b("1.6 T-GDi", 177, 265)],
      },
      { name: "Santa Fe", engines: [d("2.2 CRDi", 200, 440)] },
    ],
  },
  {
    name: "Jaguar",
    models: [
      {
        name: "XE",
        engines: [
          d("2.0d", 180, 430),
          d("3.0d S", 300, 700),
          b("2.0t", 250, 365),
          b("3.0 V6 S", 380, 450),
        ],
      },
      { name: "XF", engines: [d("2.0d", 180, 430), d("3.0d", 300, 700), b("2.0t", 250, 365)] },
      { name: "F-Pace", engines: [d("2.0d", 180, 430), d("3.0d", 300, 700), b("2.0t", 250, 365)] },
    ],
  },
  {
    name: "Jeep",
    models: [
      {
        name: "Renegade",
        engines: [d("1.6 MultiJet", 120, 320), d("2.0 MultiJet", 170, 350), b("1.3 T4", 150, 270)],
      },
      {
        name: "Compass",
        engines: [d("1.6 MultiJet", 120, 320), d("2.0 MultiJet", 170, 350), b("1.3 T4", 150, 270)],
      },
      {
        name: "Grand Cherokee",
        engines: [d("3.0 CRD", 250, 570), b("3.0 V6 Supercharged", 354, 520)],
      },
    ],
  },
  {
    name: "Kia",
    models: [
      {
        name: "Ceed",
        engines: [d("1.6 CRDi", 136, 280), b("1.0 T-GDi", 120, 172), b("1.6 T-GDi GT", 204, 265)],
      },
      {
        name: "Sportage",
        engines: [d("1.6 CRDi", 136, 320), d("2.0 CRDi", 185, 400), b("1.6 T-GDi", 177, 265)],
      },
      { name: "Sorento", engines: [d("2.2 CRDi", 200, 440)] },
      {
        name: "Stinger",
        engines: [d("2.2 CRDi", 200, 440), b("2.0 T-GDi", 255, 353), b("3.3 T-GDi GT", 370, 510)],
      },
    ],
  },
  {
    name: "Land Rover",
    models: [
      {
        name: "Discovery Sport",
        engines: [d("2.0 TD4 150", 150, 380), d("2.0 TD4 180", 180, 430), b("2.0 Si4", 240, 340)],
      },
      {
        name: "Range Rover Evoque",
        engines: [d("2.0 TD4 150", 150, 380), d("2.0 TD4 180", 180, 430), b("2.0 Si4", 240, 340)],
      },
      {
        name: "Range Rover Sport",
        engines: [
          d("3.0 TDV6", 258, 600),
          d("3.0 SDV6", 306, 700),
          b("3.0 V6 Supercharged", 340, 450),
        ],
      },
      {
        name: "Defender L663",
        engines: [
          d("D200", 200, 430),
          d("D250", 249, 570),
          d("D300", 300, 650),
          b("P400", 400, 550),
        ],
      },
    ],
  },
  {
    name: "Mazda",
    models: [
      { name: "Mazda 3", engines: [d("2.2 Skyactiv-D", 150, 380), b("2.5 Turbo", 250, 434)] },
      {
        name: "Mazda 6",
        engines: [
          d("2.2 Skyactiv-D 150", 150, 380),
          d("2.2 Skyactiv-D 175", 175, 420),
          b("2.5 Turbo", 250, 420),
        ],
      },
      {
        name: "CX-5",
        engines: [
          d("2.2 Skyactiv-D 150", 150, 380),
          d("2.2 Skyactiv-D 184", 184, 445),
          b("2.5 Turbo", 250, 434),
        ],
      },
    ],
  },
  {
    name: "Mercedes-Benz",
    models: [
      {
        name: "A-Klass W176",
        engines: [
          d("A180d", 109, 260),
          d("A200d", 136, 300),
          b("A200", 156, 250),
          b("A250", 211, 350),
          b("A45 AMG", 381, 475),
        ],
      },
      {
        name: "C-Klass W205",
        engines: [
          d("C200d", 136, 320),
          d("C220d", 170, 400),
          d("C250d", 204, 500),
          b("C200", 184, 300),
          b("C300", 245, 370),
          b("C43 AMG", 390, 520),
        ],
      },
      {
        name: "E-Klass W213",
        engines: [
          d("E200d", 150, 360),
          d("E220d", 194, 400),
          d("E350d", 258, 620),
          b("E200", 184, 300),
          b("E400", 333, 480),
        ],
      },
      {
        name: "GLC X253",
        engines: [
          d("GLC220d", 170, 400),
          d("GLC250d", 204, 500),
          b("GLC250", 211, 350),
          b("GLC43 AMG", 367, 520),
        ],
      },
      {
        name: "Vito W447",
        engines: [d("114 CDI", 136, 330), d("116 CDI", 163, 380), d("119 CDI", 190, 440)],
      },
      {
        name: "Sprinter",
        engines: [d("313 CDI", 129, 305), d("316 CDI", 163, 360), d("319 CDI", 190, 440)],
      },
    ],
  },
  {
    name: "MINI",
    models: [
      {
        name: "Hatch F56",
        engines: [
          d("Cooper D", 116, 270),
          b("Cooper", 136, 220),
          b("Cooper S", 192, 280),
          b("John Cooper Works", 231, 320),
        ],
      },
      {
        name: "Countryman F60",
        engines: [
          d("Cooper D", 150, 330),
          d("Cooper SD", 190, 400),
          b("Cooper S", 192, 280),
          b("JCW", 306, 450),
        ],
      },
    ],
  },
  {
    name: "Mitsubishi",
    models: [
      { name: "L200", engines: [d("2.4 DI-D 154", 154, 380), d("2.4 DI-D 181", 181, 430)] },
      { name: "Outlander", engines: [d("2.2 DI-D", 150, 360)] },
      { name: "Eclipse Cross", engines: [d("2.2 DI-D", 148, 388), b("1.5 Turbo", 163, 250)] },
    ],
  },
  {
    name: "Nissan",
    models: [
      {
        name: "Qashqai J11",
        engines: [
          d("1.5 dCi", 115, 260),
          d("1.6 dCi", 130, 320),
          b("1.2 DIG-T", 115, 190),
          b("1.3 DIG-T", 160, 270),
        ],
      },
      {
        name: "X-Trail",
        engines: [d("1.6 dCi", 130, 320), d("2.0 dCi", 177, 380), b("1.3 DIG-T", 160, 270)],
      },
      { name: "Navara NP300", engines: [d("2.3 dCi", 160, 403), d("2.3 dCi BiTurbo", 190, 450)] },
      { name: "Juke", engines: [b("1.0 DIG-T", 117, 180), b("1.6 DIG-T Nismo", 218, 280)] },
    ],
  },
  {
    name: "Opel",
    models: [
      {
        name: "Astra K",
        engines: [
          d("1.6 CDTI 110", 110, 300),
          d("1.6 CDTI 136", 136, 320),
          b("1.4 Turbo", 150, 245),
          b("1.6 Turbo", 200, 300),
        ],
      },
      {
        name: "Insignia B",
        engines: [
          d("1.6 CDTI", 136, 320),
          d("2.0 CDTI", 170, 400),
          b("1.5 Turbo", 165, 250),
          b("2.0 Turbo GSi", 260, 400),
        ],
      },
      {
        name: "Grandland X",
        engines: [d("1.5 Diesel", 130, 300), d("2.0 Diesel", 177, 400), b("1.2 Turbo", 130, 230)],
      },
      {
        name: "Vivaro",
        engines: [
          d("1.6 CDTI", 120, 300),
          d("1.6 CDTI BiTurbo", 145, 340),
          d("2.0 Diesel", 177, 400),
        ],
      },
    ],
  },
  {
    name: "Peugeot",
    models: [
      {
        name: "208",
        engines: [
          d("1.5 BlueHDi", 100, 250),
          b("1.2 PureTech 110", 110, 205),
          b("1.2 PureTech 130", 130, 230),
          b("1.6 THP GTi", 208, 300),
        ],
      },
      {
        name: "308",
        engines: [
          d("1.5 BlueHDi", 130, 300),
          d("2.0 BlueHDi", 180, 400),
          b("1.2 PureTech", 130, 230),
          b("1.6 THP GTi", 270, 330),
        ],
      },
      {
        name: "508",
        engines: [
          d("1.5 BlueHDi", 130, 300),
          d("2.0 BlueHDi", 180, 400),
          b("1.6 PureTech", 225, 300),
        ],
      },
      {
        name: "3008",
        engines: [
          d("1.5 BlueHDi", 130, 300),
          d("2.0 BlueHDi", 180, 400),
          b("1.6 PureTech", 180, 250),
        ],
      },
      {
        name: "Expert",
        engines: [
          d("1.5 BlueHDi", 120, 300),
          d("2.0 BlueHDi 150", 150, 370),
          d("2.0 BlueHDi 180", 180, 400),
        ],
      },
    ],
  },
  {
    name: "Porsche",
    models: [
      {
        name: "Macan",
        engines: [
          d("3.0 S Diesel", 258, 580),
          b("2.0 Turbo", 252, 370),
          b("3.0 S", 354, 480),
          b("2.9 GTS", 380, 520),
        ],
      },
      {
        name: "Cayenne 958",
        engines: [d("3.0 Diesel", 262, 580), d("4.2 S Diesel", 385, 850), b("3.6 S", 420, 550)],
      },
      {
        name: "Panamera 971",
        engines: [d("4S Diesel", 422, 850), b("3.0", 330, 450), b("4S", 440, 550)],
      },
      {
        name: "911 991.2",
        engines: [b("Carrera", 370, 450), b("Carrera S", 420, 500), b("Turbo S", 580, 750)],
      },
    ],
  },
  {
    name: "Renault",
    models: [
      {
        name: "Clio IV",
        engines: [
          d("1.5 dCi", 90, 220),
          b("0.9 TCe", 90, 135),
          b("1.2 TCe", 120, 205),
          b("1.6 Turbo RS", 220, 260),
        ],
      },
      {
        name: "Mégane IV",
        engines: [
          d("1.5 dCi", 110, 260),
          d("1.6 dCi", 130, 320),
          b("1.3 TCe", 140, 240),
          b("1.8 Turbo RS", 280, 390),
        ],
      },
      {
        name: "Kadjar",
        engines: [d("1.5 dCi", 115, 260), d("1.6 dCi", 130, 320), b("1.3 TCe", 160, 260)],
      },
      {
        name: "Trafic",
        engines: [d("1.6 dCi", 120, 300), d("1.6 dCi BiTurbo", 145, 340), d("2.0 dCi", 170, 380)],
      },
    ],
  },
  {
    name: "Saab",
    models: [
      {
        name: "9-3",
        engines: [
          d("1.9 TiD", 150, 320),
          d("1.9 TTiD", 180, 400),
          b("1.8t", 150, 240),
          b("2.0t", 210, 300),
          b("2.8T V6", 280, 400),
        ],
      },
      {
        name: "9-5",
        engines: [d("1.9 TiD", 150, 320), b("2.0t", 185, 280), b("2.3T Aero", 260, 350)],
      },
    ],
  },
  {
    name: "SEAT",
    models: [
      {
        name: "Ibiza 6J",
        engines: [d("1.6 TDI", 105, 250), b("1.2 TSI", 110, 175), b("1.8 TSI Cupra", 192, 320)],
      },
      {
        name: "Leon III",
        engines: [
          d("1.6 TDI", 110, 250),
          d("2.0 TDI", 150, 320),
          b("1.4 TSI", 150, 250),
          b("1.8 TSI", 180, 250),
          b("2.0 TSI Cupra", 290, 380),
        ],
      },
      {
        name: "Ateca",
        engines: [
          d("1.6 TDI", 115, 250),
          d("2.0 TDI", 190, 400),
          b("1.5 TSI", 150, 250),
          b("2.0 TSI", 190, 320),
        ],
      },
    ],
  },
  {
    name: "Škoda",
    models: [
      { name: "Fabia III", engines: [d("1.4 TDI", 105, 250), b("1.0 TSI", 110, 200)] },
      {
        name: "Octavia III",
        engines: [
          d("1.6 TDI", 110, 250),
          d("2.0 TDI", 150, 320),
          d("2.0 TDI RS", 184, 380),
          b("1.4 TSI", 150, 250),
          b("2.0 TSI RS", 230, 350),
        ],
      },
      {
        name: "Superb III",
        engines: [
          d("1.6 TDI", 120, 250),
          d("2.0 TDI", 190, 400),
          b("1.5 TSI", 150, 250),
          b("2.0 TSI", 280, 350),
        ],
      },
      {
        name: "Kodiaq",
        engines: [
          d("2.0 TDI 150", 150, 340),
          d("2.0 TDI 190", 190, 400),
          b("1.5 TSI", 150, 250),
          b("2.0 TSI", 190, 320),
        ],
      },
    ],
  },
  {
    name: "Toyota",
    models: [
      {
        name: "Auris",
        engines: [d("1.6 D-4D", 112, 270), d("2.0 D-4D", 124, 310), b("1.2 Turbo", 116, 185)],
      },
      { name: "Corolla", engines: [d("1.6 D-4D", 112, 270), b("1.2 Turbo", 116, 185)] },
      { name: "C-HR", engines: [b("1.2 Turbo", 116, 185)] },
      { name: "Hilux", engines: [d("2.4 D-4D", 150, 400), d("2.8 D-4D", 204, 500)] },
      {
        name: "Land Cruiser",
        engines: [d("2.8 D-4D 177", 177, 450), d("2.8 D-4D 204", 204, 500)],
      },
      { name: "GR Yaris", engines: [b("1.6 Turbo", 261, 360)] },
      { name: "GR Supra", engines: [b("2.0 Turbo", 258, 400), b("3.0 Turbo", 340, 500)] },
    ],
  },
  {
    name: "Volkswagen",
    models: [
      {
        name: "Polo 6R / AW",
        engines: [
          d("1.4 TDI", 105, 250),
          d("1.6 TDI", 95, 250),
          b("1.0 TSI", 115, 200),
          b("2.0 TSI GTI", 200, 320),
        ],
      },
      {
        name: "Golf VII",
        engines: [
          d("1.6 TDI", 110, 250),
          d("2.0 TDI", 150, 320),
          d("2.0 TDI GTD", 184, 380),
          b("1.4 TSI", 150, 250),
          b("2.0 TSI GTI", 230, 350),
          b("2.0 TSI R", 310, 400),
        ],
      },
      {
        name: "Golf VIII",
        engines: [
          d("2.0 TDI", 150, 360),
          b("1.5 TSI", 150, 250),
          b("2.0 TSI GTI", 245, 370),
          b("2.0 TSI R", 320, 420),
        ],
      },
      {
        name: "Passat B8",
        engines: [
          d("1.6 TDI", 120, 250),
          d("2.0 TDI 150", 150, 340),
          d("2.0 TDI 190", 190, 400),
          d("2.0 TDI BiTurbo", 240, 500),
          b("1.5 TSI", 150, 250),
          b("2.0 TSI", 280, 350),
        ],
      },
      {
        name: "Tiguan II",
        engines: [
          d("2.0 TDI 150", 150, 340),
          d("2.0 TDI 190", 190, 400),
          d("2.0 TDI BiTurbo", 240, 500),
          b("1.5 TSI", 150, 250),
          b("2.0 TSI", 220, 350),
        ],
      },
      {
        name: "Arteon",
        engines: [d("2.0 TDI", 190, 400), d("2.0 TDI BiTurbo", 240, 500), b("2.0 TSI", 280, 350)],
      },
      {
        name: "Caddy",
        engines: [d("1.6 TDI", 102, 250), d("2.0 TDI 122", 122, 320), d("2.0 TDI 150", 150, 340)],
      },
      {
        name: "Transporter T6",
        engines: [
          d("2.0 TDI 102", 102, 250),
          d("2.0 TDI 150", 150, 340),
          d("2.0 TDI BiTurbo", 204, 450),
        ],
      },
    ],
  },
  {
    name: "Volvo",
    models: [
      {
        name: "V40",
        engines: [
          d("D2", 120, 280),
          d("D3", 150, 320),
          d("D4", 190, 400),
          b("T3", 152, 250),
          b("T5", 245, 350),
        ],
      },
      {
        name: "V60 I",
        engines: [
          d("D3", 150, 350),
          d("D4", 190, 400),
          d("D5", 225, 470),
          b("T5", 245, 350),
          b("T6", 306, 400),
        ],
      },
      {
        name: "V60 II",
        engines: [
          d("D3", 150, 320),
          d("D4", 190, 400),
          b("T4", 190, 300),
          b("T5", 250, 350),
          b("T6", 310, 400),
        ],
      },
      {
        name: "V90",
        engines: [
          d("D3", 150, 320),
          d("D4", 190, 400),
          d("D5", 235, 480),
          b("T5", 250, 350),
          b("T6", 310, 400),
        ],
      },
      {
        name: "XC40",
        engines: [
          d("D3", 150, 320),
          d("D4", 190, 400),
          b("T3", 163, 265),
          b("T4", 190, 300),
          b("T5", 247, 350),
        ],
      },
      {
        name: "XC60 I",
        engines: [d("D4", 190, 400), d("D5", 220, 440), b("T5", 245, 350), b("T6", 306, 400)],
      },
      {
        name: "XC60 II",
        engines: [d("D4", 190, 400), d("D5", 235, 480), b("T5", 250, 350), b("T6", 310, 400)],
      },
      {
        name: "XC90 II",
        engines: [d("D4", 190, 400), d("D5", 235, 480), b("T5", 250, 350), b("T6", 320, 400)],
      },
    ],
  },
];

export const BRANDS: Brand[] = [
  ...CORE_BRANDS.map((brand) => ({
    ...brand,
    models: [...brand.models, ...(EXTRA_MODELS[brand.name] ?? [])],
  })),
  ...EXTRA_BRANDS,
].sort((left, right) => left.name.localeCompare(right.name, "sv"));

export type Stage = "stage1" | "stage2";

const GAINS: Record<
  Stage,
  Record<"dieselTurbo" | "bensinTurbo" | "sug", { hp: number; nm: number }>
> = {
  stage1: {
    dieselTurbo: { hp: 0.25, nm: 0.24 },
    bensinTurbo: { hp: 0.24, nm: 0.26 },
    sug: { hp: 0.06, nm: 0.05 },
  },
  stage2: {
    dieselTurbo: { hp: 0.38, nm: 0.36 },
    bensinTurbo: { hp: 0.4, nm: 0.42 },
    sug: { hp: 0.1, nm: 0.08 },
  },
};

export function calculateTuning(engine: Engine, stage: Stage) {
  const key = !engine.turbo ? "sug" : engine.fuel === "diesel" ? "dieselTurbo" : "bensinTurbo";
  const gain = GAINS[stage][key];
  const estimatedHp = Math.round((engine.hp * (1 + gain.hp)) / 5) * 5;
  const estimatedNm = Math.round((engine.nm * (1 + gain.nm)) / 5) * 5;

  // Show a conservative range instead of presenting the optimistic ceiling as a promise.
  const tunedHpMin = Math.max(engine.hp, estimatedHp - 15);
  const tunedHpMax = Math.max(tunedHpMin, estimatedHp - 5);
  const tunedNmMin = Math.max(engine.nm, estimatedNm - 25);
  const tunedNmMax = Math.max(tunedNmMin, estimatedNm - 10);

  return {
    stockHp: engine.hp,
    stockNm: engine.nm,
    tunedHp: tunedHpMax,
    tunedNm: tunedNmMax,
    tunedHpMin,
    tunedHpMax,
    tunedNmMin,
    tunedNmMax,
    gainHp: tunedHpMax - engine.hp,
    gainNm: tunedNmMax - engine.nm,
    gainHpMin: tunedHpMin - engine.hp,
    gainHpMax: tunedHpMax - engine.hp,
    gainNmMin: tunedNmMin - engine.nm,
    gainNmMax: tunedNmMax - engine.nm,
  };
}
