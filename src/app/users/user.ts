export interface Geo<Object> {
  lat: string;
  lng: string;
}

export interface Address<Object> {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo<Object>;
}

export interface Company<Object> {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address<Object>;
  phone: string;
  website: string;
  company: Company<Object>;
}
