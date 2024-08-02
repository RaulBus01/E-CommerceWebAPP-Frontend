import { productData } from "./ProductType";

interface favouriteData{
    user:string;
    products:productData[];
    createdAt:Date;
    updatedAt:Date;
}
export default favouriteData;