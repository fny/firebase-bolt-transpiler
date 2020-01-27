export interface Nickname extends String {
}
export interface UserID extends String {
}
export interface MessageString extends String {
}
export interface Timestamp extends Number {
}
export interface Message {
  user: UserID;
  message: MessageString;
  timestamp: Timestamp;
}
