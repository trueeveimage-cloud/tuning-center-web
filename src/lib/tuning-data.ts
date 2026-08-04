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

export const BRANDS: Brand[] = [
  {
    name: "Volkswagen",
    models: [
      { name: "Golf VII", engines: [d("2.0 TDI", 150, 320), d("1.6 TDI", 110, 250), b("1.4 TSI", 150, 250), b("2.0 TSI GTI", 230, 350)] },
      { name: "Passat B8", engines: [d("2.0 TDI", 150, 340), d("2.0 TDI BiTurbo", 240, 500), b("1.8 TSI", 180, 250)] },
      { name: "Transporter T6", engines: [d("2.0 TDI", 150, 340), d("2.0 TDI", 102, 250)] },
    ],
  },
  {
    name: "Audi",
    models: [
      { name: "A4 B9", engines: [d("2.0 TDI", 190, 400), b("2.0 TFSI", 190, 320), b("2.0 TFSI", 252, 370)] },
      { name: "A6 C7", engines: [d("3.0 TDI", 272, 580), d("2.0 TDI", 190, 400)] },
      { name: "Q5", engines: [d("2.0 TDI", 190, 400), b("2.0 TFSI", 252, 370)] },
    ],
  },
  {
    name: "BMW",
    models: [
      { name: "3-serie F30", engines: [d("320d", 190, 400), d("330d", 258, 560), b("330i", 252, 350)] },
      { name: "5-serie F10", engines: [d("520d", 190, 400), d("530d", 258, 560), b("535i", 306, 400)] },
      { name: "X5 F15", engines: [d("30d", 258, 560), d("40d", 313, 630)] },
    ],
  },
  {
    name: "Mercedes-Benz",
    models: [
      { name: "C-Klass W205", engines: [d("C220d", 170, 400), d("C250d", 204, 500), b("C200", 184, 300)] },
      { name: "Sprinter", engines: [d("313 CDI", 129, 305), d("316 CDI", 163, 360)] },
    ],
  },
  {
    name: "Volvo",
    models: [
      { name: "V60", engines: [d("D4", 190, 400), d("D3", 150, 320), b("T5", 245, 350)] },
      { name: "XC60", engines: [d("D4", 190, 400), d("D5", 235, 480), b("T6", 320, 400)] },
    ],
  },
  {
    name: "Ford",
    models: [
      { name: "Focus III", engines: [d("2.0 TDCi", 150, 370), b("1.0 EcoBoost", 125, 170), b("2.3 ST", 280, 440)] },
      { name: "Transit Custom", engines: [d("2.0 TDCi", 130, 385), d("2.0 TDCi", 170, 405)] },
    ],
  },
  {
    name: "Škoda",
    models: [
      { name: "Octavia III", engines: [d("2.0 TDI", 150, 320), b("1.4 TSI", 150, 250), b("2.0 TSI RS", 230, 350)] },
      { name: "Superb III", engines: [d("2.0 TDI", 190, 400), b("2.0 TSI", 280, 350)] },
    ],
  },
  {
    name: "Seat",
    models: [
      { name: "Leon III", engines: [d("2.0 TDI", 150, 320), b("1.8 TSI", 180, 250), b("2.0 TSI Cupra", 290, 380)] },
    ],
  },
];

export type Stage = "stage1" | "stage2";

const GAINS: Record<Stage, Record<"dieselTurbo" | "bensinTurbo" | "sug", { hp: number; nm: number }>> = {
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
  const g = GAINS[stage][key];
  const hp = Math.round((engine.hp * (1 + g.hp)) / 5) * 5;
  const nm = Math.round((engine.nm * (1 + g.nm)) / 5) * 5;
  return {
    stockHp: engine.hp,
    stockNm: engine.nm,
    tunedHp: hp,
    tunedNm: nm,
    gainHp: hp - engine.hp,
    gainNm: nm - engine.nm,
  };
}
