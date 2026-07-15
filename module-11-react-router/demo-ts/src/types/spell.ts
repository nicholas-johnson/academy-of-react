export interface Spell {
  id: number;
  name: string;
  element: string;
  power: number;
  description: string;
}

export type TTheme = "light" | "dark";

type ThemeRecord = Partial<Record<TTheme, string>> | null;

const themeRecord: ThemeRecord = {
  light: "white",
  dark: "black",
};

let x: TTheme = "light";

export { x };
