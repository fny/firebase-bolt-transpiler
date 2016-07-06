interface Child {
  age: number;
}
interface Parent {
  children: { [key: string]: Child; };
}
