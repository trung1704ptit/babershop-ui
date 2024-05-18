import { IService } from "../../components/BookingEntrance/types";
import { IProduct } from "../../components/Products/types";
import { ITeam } from "../../components/Team/type";

export interface IHomeProps {
  products: IProduct[]
  barbers: ITeam[]
  services: IService[]
}