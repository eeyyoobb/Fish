export interface Category {
    id: string;
    name: string;
  }
  
  export interface Creator {
    id: string;
    name: string;
    email: string;
    username: string;
    img?: string;
    phone?: string;
    address?: string;
    categories: Category[];
  }