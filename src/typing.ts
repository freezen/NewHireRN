export interface IVideoItem<T> {
  id: number;
  uname: string;
  upic?: string;
  name: string;
  url: string;
  likes: boolean;
  pic: T;
}
