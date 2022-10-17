import { ProductInterface } from '../interfaces/ProductInterface';
import { ConnectionString } from '../ConnectionString';

/**
 * Regresa el listado de productos 
 * @returns {number} - Listado de productos
 */
export const getProducts = async (): Promise<Array<ProductInterface>> => {

    try {
        const result = await fetch(ConnectionString.connectionString + '/list')

        return await result.json();

    } catch (error) {
        console.log(error)
    }

    return [];
}

/**
 * Checa si el sevidor está disponible y es posible conectar
 * @returns {boolean} - True = válido, False = inválido
 */
export const isServerValid = async (): Promise<boolean> => {

    try {
        const result = await fetch(ConnectionString.connectionString + '/ping')

        return await result.text() === 'serverconffirmed';

    } catch (error) {
        console.log(error)
    }

    return false;
}

/**
 * Publica un nuevo producto
 * @param {ProductInterface} product - Producto a publicar
 */
export const publishProduct = async (product: ProductInterface): Promise<void> => {

    product.creationDate = (new Date()).getTime();

    fetch(ConnectionString.connectionString + '/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then(response => console.log(JSON.stringify(response)))
        .catch((error) => {
            console.error('Error:', error);
        });

}


/**
 * Borra un producto por Id
 * @param {string} id - Id del producto a borrar
 */
export const deleteProduct = async (id: string): Promise<void> => {

    try {
        const response = await fetch(ConnectionString.connectionString + '/delete?id=' + id, {
            method: 'DELETE',
        });
        console.log(JSON.stringify(response));
    } catch (error) {
        console.error('Error:', error);
    }

}