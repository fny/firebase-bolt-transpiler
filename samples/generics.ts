export interface App {
  users: { [key: string]: User; };
  products: { [key: string]: Product; };
}
export interface User {
  name: string;
  age: number;
}
export interface Product {
  id: ProductID;
  cost: number;
}
export interface ProductID extends String {
}
export interface PushID extends String {
}
