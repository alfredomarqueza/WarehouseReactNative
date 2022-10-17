import { ProductTypeEnum } from '../enums/ProductTypeEnum';

/**
 * Regresa el margen de ganancia dependiendo del tipo de producto
 * @param {number} price - Precio del producto
 * @param {number} productType - Tipo de producto
 * @returns {number} - Margen de ganancia
 */
export const getMarkup = (price: number, productType: ProductTypeEnum): number => {
    switch (productType) {
        case ProductTypeEnum.TV: return price * .35;
        case ProductTypeEnum.Laptop: return price * .40;
        case ProductTypeEnum.Shoe: return price * .30;
        default: return 0;
    }
}