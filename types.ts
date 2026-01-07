
export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  subcategory?: string;
  image: string;
  description: string;
  isNew?: boolean;
  sizes?: string[];
  colors?: string[];
  gender?: 'men' | 'women' | 'unisex';
  material?: string;
  features?: string[];
}

export interface Collection {
  title: string;
  tagline: string;
  products: Product[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
