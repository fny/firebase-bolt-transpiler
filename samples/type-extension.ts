interface PositiveInteger extends Number {
}
interface UnixTimestamp extends PositiveInteger {
}
interface NonEmptyString extends String {
}
interface URL extends String {
}
interface Test {
  time: UnixTimestamp;
  name: NonEmptyString;
  url: URL;
}
