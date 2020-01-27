export interface Child {
  age: number;
}
export interface Parent {
  children: { [key: string]: Child; };
}
