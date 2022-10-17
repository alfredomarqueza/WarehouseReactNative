import { ProductTypeEnum } from "../enums/ProductTypeEnum";

export interface ProductInterface {
    name: string,
    SKU: string,
    brand: string,
    price: number,
    productType: ProductTypeEnum,
    meta1: string,
    meta2: string,
    creationDate: number,
}