export interface Author {
    _id: string;
    username: string;
  }
  
  export interface Post {
    image?: string; 
    _id: string;
    title: string;
    content: string;
    author: Author;
    createdAt: string;
    
  }
  