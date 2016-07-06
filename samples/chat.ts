interface RoomInfo {
  name: NameString;
  creator: UserID;
  members: { [key: string]: Member; };
}
interface Post {
  from: UserID;
  message: MessageString;
}
interface MessageString extends String {
}
interface Member {
  nickname: NameString;
  isBanned: boolean;
}
interface NameString extends Any {
}
interface Timestamped<T> extends T {
  created: Created;
}
interface Created extends Number {
}
interface Modified extends Number {
}
interface PushID extends String {
}
interface RoomID extends String {
}
interface UserID extends String {
}
