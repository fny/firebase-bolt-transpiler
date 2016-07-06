interface Test {
  s1: ShortString;
  s2: AliasString;
  m1: { [key: string]: number; };
  m2: { [key: string]: number; };
}
interface AliasString extends ShortString {
}
interface ShortString extends String {
}
