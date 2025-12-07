export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  condition: string;
  imageBase64?: string;
  ownerId?: string;
  createdAt?: string;
}
