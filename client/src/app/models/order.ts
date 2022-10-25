export interface ShippingAddress {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface OrderDto {
  id: number;
  buyerId: string;
  shippingAddress: ShippingAddress;
  orderDate: string;
  orderItems: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  orderStatus: string;
  total: number;
}

export interface Order {
  saveAddress: boolean;
  shippingAddress: ShippingAddress;
}

export interface OrderFormData {
  address1: string;
  address2: string;
  city: string;
  country: string;
  fullName: string;
  nameOnCard: string;
  saveAddress: boolean;
  state: string;
  zip: string;
}
