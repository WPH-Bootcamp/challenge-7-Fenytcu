export interface Menu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

export interface Review {
  id: number;
  star: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
}

export interface RestaurantDetail {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: {
    lat: number;
    long: number;
  };
  distance: number;
  logo: string;
  images: string[];
  category: string;
  totalMenus: number;
  totalReviews: number;
  menus: Menu[];
  reviews: Review[];
}

export interface RestaurantDetailResponse {
  success: boolean;
  message: string;
  data: RestaurantDetail;
}


export interface RestaurantListItem {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  distance: number;
}

export interface PaginationMetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchRestaurantItem {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  distance: number;
}

export interface SearchRestaurantResponse {
  success: boolean;
  message?: string;
  data: {
    restaurants: SearchRestaurantItem[];
    pagination: PaginationMetaData;
    searchQuery: string;
  };
}

export interface RestaurantListResponse {
  success: boolean;
  data: {
    restaurants: RestaurantListItem[];
    pagination: PaginationMetaData;
  };
}

export interface NearbyRestaurantItem {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  distance: number;
}

export interface NearbyRestaurantResponse {
  success: boolean;
  data: {
    restaurants: NearbyRestaurantItem[];
  };
}

export interface RecommendedRestaurantItem {
  id: number;
  name: string;
  star: number;
  place: string;
  lat: number;
  long: number;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  sampleMenus: Menu[];
  isFrequentlyOrdered: boolean;
  distance: number;
}

export interface RecommendedRestaurantResponse {
  success: boolean;
  data: {
    recommendations: RecommendedRestaurantItem[];
    message: string;
  };
}

export interface BestSellerRestaurantItem {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  distance: number;
}

export interface BestSellerRestaurantResponse {
  success: boolean;
  data: {
    restaurants: BestSellerRestaurantItem[];
    pagination: PaginationMetaData;
  };
}

export interface ReviewMenu {
  menuId: number;
  menuName: string;
  price: number;
  type: string;
  image: string;
  quantity: number;
}

export interface CreatedReview {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
  restaurant: {
    id: number;
    name: string;
  };
  transactionId: string;
  menus: ReviewMenu[];
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data: {
    review: CreatedReview;
  };
}

export interface UserReviewItem {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  transactionId: string;
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  menus: ReviewMenu[];
}

export interface MyReviewResponse {
  success: boolean;
  message?: string; // made optional as it might be missing or present
  data: {
    reviews: UserReviewItem[];
    pagination: PaginationMetaData;
  };
}

export interface RestaurantReviewItem {
  id: number;
  star: number;
  comment: string;
  transactionId: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  menus: ReviewMenu[];
}

export interface RestaurantReviewResponse {
  success: boolean;
  data: {
    reviews: RestaurantReviewItem[];
    pagination: PaginationMetaData;
  };
}

export interface ReviewDetail {
  id: number;
  star: number;
  comment: string;
  updatedAt: string;
  restaurant: {
    id: number;
    name: string;
  };
}

export interface ReviewDetailResponse {
  success: boolean;
  data: {
    review: ReviewDetail;
  };
}

export interface DeleteReviewResponse {
  success: boolean;
  message: string;
}
