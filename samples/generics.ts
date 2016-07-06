interface App {
  users: { [key: string]: User; };
  products: { [key: string]: Product; };
}
interface User {
  name: string;
  age: number;
}
interface Product {
  id: ProductID;
  cost: number;
}
interface ProductID extends String {
}
interface PushID extends String {
}
