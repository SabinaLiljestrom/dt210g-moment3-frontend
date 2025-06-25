export interface Author {
    _id: string;
    username: string;
  }
  
  export interface Post {
    _id: string;
    title: string;
    content: string;
    author: Author;
    createdAt: string;
  }
  