export class Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    description: string;
    stock: number;

    constructor(id: number, title: string, price: number, images: string[], description: string, stock: number){
        this.id = id;
        this.title = title;
        this.price = price;
        this.images = images;
        this.description = description;
        this.stock = stock;
    }
}
