export interface Product {
  name: string;
  cost: number;
}
export interface Serialized<T> extends T {
  counter: Counter;
}
export interface Counter extends Number {
}
