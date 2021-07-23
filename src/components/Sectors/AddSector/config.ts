export interface Sector {
  id: string;
  value: string;
  title: string;
}

export const SECTORS: Sector[] = [
  {
    id: "1",
    value: "energy",
    title: "Energy",
  },
  {
    id: "2",
    value: "materials",
    title: "Materials",
  },
  {
    id: "3",
    value: "services",
    title: "Services",
  },
];

export const INDUSTRIES: Sector[] = [
  {
    id: "1",
    value: "Energy Equipment & Services",
    title: "Energy Equipment & Services",
  },
  {
    id: "2",
    value: "Oil Gas & Consumable Fuels",
    title: "Oil Gas & Consumable Fuels",
  },
  {
    id: "3",
    value: "Chemicals",
    title: "Chemicals",
  },
  {
    id: "4",
    value: "Consumer Services",
    title: "Consumer Services",
  },
];
