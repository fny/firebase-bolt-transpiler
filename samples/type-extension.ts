export interface PositiveInteger extends Number {
}
export interface UnixTimestamp extends PositiveInteger {
}
export interface NonEmptyString extends String {
}
export interface URL extends String {
}
export interface Test {
  time: UnixTimestamp;
  name: NonEmptyString;
  url: URL;
}
