interface Product {
  name: string;
  cost: number;
}
interface Serialized<T> extends T {
  counter: Counter;
}
interface Counter extends Number {
}
