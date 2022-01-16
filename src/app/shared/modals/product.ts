
export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: Rating;
}


export interface Rating {
    rate: number;
    count: number;
}