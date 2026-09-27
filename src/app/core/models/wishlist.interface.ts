
export interface WishlistResponse {
    status: string;
    count: number;
    data: Wishlist[];
}

export interface Wishlist {
    _id: string;
    id: string;

    title: string;
    slug: string;
    description: string;

    price: number;
    priceAfterDiscount?: number;

    quantity: number;
    sold: number;

    imageCover: string;
    images: string[];

    ratingsAverage: number;
    ratingsQuantity: number;

    category: Category;
    brand: Brand;
    subcategory: Subcategory[];

    createdAt: string;
    updatedAt: string;

    __v?: number;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}