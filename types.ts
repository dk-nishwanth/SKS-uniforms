
export interface Product {
  id: string;
  name: string;
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

export interface EnquiryItem extends Product {
  selectedSize?: string;
  selectedColor?: string;
  quantity?: number;
  notes?: string;
}
