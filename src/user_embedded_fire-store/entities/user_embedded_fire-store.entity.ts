export interface ProductEmbedded {
  name: string;
  price: number;
}

export interface EmbeddedUser {
  id?: string;
  name: string;
  email: string;
  products: ProductEmbedded[];
}