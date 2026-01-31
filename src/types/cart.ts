export interface CartItem {
  id: number;
  menu: {
    id: number;
    foodName: string;
    price: number;
    type: string;
    image: string;
  };
  quantity: number;
  itemTotal: number;
}

export interface CartGroupedByRestaurant {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CartItem[];
  subtotal: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  data: {
    cart: CartGroupedByRestaurant[];
    summary: CartSummary;
  };
}

export interface AddToCartPayload {
  menuId: number;
  restaurantId: number;
  quantity: number;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data: {
    cartItem: {
      id: number;
      restaurant: {
        id: number;
        name: string;
        logo: string;
      };
      menu: {
        id: number;
        foodName: string;
        price: number;
        type: string;
        image: string;
      };
      quantity: number;
      itemTotal: number;
    };
  };
}

export interface ClearCartResponse {
    success: boolean;
    message: string;
    data: null;
}
