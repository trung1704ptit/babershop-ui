export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  priceLabel: string;
  brand: string;
  discount: string | number;
  image: string;
}