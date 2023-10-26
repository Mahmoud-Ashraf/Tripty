import { Place } from "./place";

export interface Category {
  id: number,
  name: string,
  icon: string,
  places?: Place[],
  parent?: Category,
}
