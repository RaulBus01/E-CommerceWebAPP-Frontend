interface productDataForOrder{
    productId: string;
    quantity: number;
}
interface productData {
    _id: string;            
    id: string;             
    name: string;
    price: number;
    category: string[];
    description: string;
    image: string;
    stock: number;
    distributorId: string;
    createdAt: string;
    updatedAt: string;
    ratingProduct: number;
    numberOfReviews: number;
  }
interface productFormData {
    
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
    stock: string;
}

  
export type {productDataForOrder, productData, productFormData}; 