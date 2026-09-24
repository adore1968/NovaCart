export type Product = {
  id: string;
  name: string;
  description: string;
  category: "electronics" | "clothing" | "home";
  price: number;
  imageUrl: string;
};

export type ProductFormType = {
  name: string;
  description: string;
  category: string;
  price: number;
  image: FileList;
};

export type ProductValid = {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
};
