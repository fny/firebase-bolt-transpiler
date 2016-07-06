interface Nickname extends String {
}
interface UserID extends String {
}
interface MessageString extends String {
}
interface Timestamp extends Number {
}
interface Message {
  user: UserID;
  message: MessageString;
  timestamp: Timestamp;
}
