import { PaginatedResponse } from './../models/pagination';
import { IFilters } from './../models/filter';
import { IProduct } from '../models/product';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IBasket } from '../models/basket';
import { User } from '../models/user';
import { useUserStore } from '../../stores/User';
import { Order, OrderDto } from '../models/order';

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

interface IResponseData {
  title: string;
  errors?: Record<string, Array<string>>;
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.request.use((config) => {
  const token = useUserStore.getState().user?.token;

  if (token) config.headers!.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep();

    const pagination = response.headers['pagination'];

    if (pagination) {
      response.data = new PaginatedResponse(response.data, JSON.parse(pagination));

      return response;
    }

    return response;
  },
  (error: AxiosError<IResponseData>) => {
    const { data, status } = error.response!;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: Array<string>[] = [];

          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title || 'Unauthorized');
        break;
      case 500:
        history.push('/server-error', { error: data });
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
};

function createFormData(item: any) {
  const formData = new FormData();
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      formData.append(key, item[key]);
    }
  }
  return formData;
}

const Admin = {
  createProduct: (product: any) => requests.post('products', createFormData(product)),
  updateProduct: (product: any) =>
    requests.putForm(`products/${product.id}`, createFormData(product)),
  deleteProduct: (id: string) => requests.delete(`products/${id}`),
};

const Catalog = {
  products: (params?: URLSearchParams): Promise<PaginatedResponse<Array<IProduct>>> =>
    requests.get('products', params),
  productDetails: (id: string): Promise<IProduct> => requests.get(`products/${id}`),
  filters: (): Promise<IFilters> => requests.get('products/filters'),
};

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorized'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  validationError: () => requests.get('buggy/validation-error'),
};

const Basket = {
  get: (): Promise<IBasket> => requests.get('basket'),
  addItem: (productId: number, quantity = 1): Promise<IBasket> =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  deleteItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
} & LoginCredentials;

const Account = {
  login: (values: LoginCredentials): Promise<User> =>
    requests.post('account/login', values),
  register: (values: RegisterCredentials) => requests.post('account/register', values),
  currentUser: (): Promise<User> => requests.get('account/currentuser'),
  savedAddress: () => requests.get('account/savedAddress'),
};

const Orders = {
  get: (): Promise<Array<OrderDto>> => requests.get('orders'),
  getById: (id: string | undefined): Promise<OrderDto> => requests.get(`orders/${id}`),
  create: (order: Order): Promise<number> => requests.post('orders', order),
};

const Payments = {
  createPaymentIntet: () => requests.post('payments', {}),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
  Account,
  Orders,
  Payments,
  Admin,
};

export default agent;
