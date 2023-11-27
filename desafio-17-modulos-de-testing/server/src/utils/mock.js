import { faker } from "@faker-js/faker";

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(), 
        status: true,
        code: faker.commerce.isbn(),
        stock: faker.number.int(),
        category: faker.commerce.productMaterial(),
        thumbnail: faker.image.avatar(),
        id: faker.database.mongodbObjectId()
    }
}