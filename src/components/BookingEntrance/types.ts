export interface IServiceItem {
  data: IServiceDataItem
  handleSelect: (id: string) => void;
  serviceSelected: string[]
}

export interface IServiceDataItem {
  id: string;
  title: string,
  previewImage: string,
  price: string | number,
  todos: string[];
}