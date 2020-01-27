export interface Test {
  s1: ShortString;
  s2: AliasString;
  m1: { [key: string]: number; };
  m2: { [key: string]: number; };
}
export interface AliasString extends ShortString {
}
export interface ShortString extends String {
}
