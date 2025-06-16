export interface Property {
  features: string[];
  id: string;
  images: string[];
  location: LocationAddress;
  price: number;
  title: string;
}

export interface LocationAddress {
  address: string;
  city: string;
  state: string;
  coordinates: LatLng;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}
