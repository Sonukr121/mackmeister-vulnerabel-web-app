export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: number;
  userId: number;
  products: Product[];
  total: number;
  status: string;
}

export interface Coupon {
  code: string;
  discount: number;
  validUntil: string;
}