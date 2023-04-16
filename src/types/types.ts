export interface IBlog {
  parentId: number;
  id: number;
  name: string;
  email: string;
  comment: string;
  raiting: number;
  date: number;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
}
