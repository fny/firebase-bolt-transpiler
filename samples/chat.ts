export interface RoomInfo {
  name: NameString;
  creator: UserID;
  members: { [key: string]: Member; };
}
export interface Post {
  from: UserID;
  message: MessageString;
}
export interface MessageString extends String {
}
export interface Member {
  nickname: NameString;
  isBanned: boolean;
}
export interface NameString extends Any {
}
export interface Timestamped<T> extends T {
  created: Created;
}
export interface Created extends Number {
}
export interface Modified extends Number {
}
export interface PushID extends String {
}
export interface RoomID extends String {
}
export interface UserID extends String {
}
