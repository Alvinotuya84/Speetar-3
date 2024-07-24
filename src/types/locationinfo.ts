// Represents the location information
interface Location {
  lat: number;
  lng: number;
}

// Represents the viewport information
interface Viewport {
  northeast: Location;
  southwest: Location;
}

// Represents the geometry of the place
interface Geometry {
  location: Location;
  viewport: Viewport;
}

// Represents the opening hours of the place
interface OpeningHours {
  open_now: boolean;
}

// Represents the photos associated with the place
interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

// Represents the Plus Code information
interface PlusCode {
  compound_code: string;
  global_code: string;
}

// Represents each restaurant in the list
interface Restaurant {
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level?: number; // Optional, as not all places may have a price level
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
  business_status: string;
}

// Represents the overall response from the API
export interface NearbyRestaurantsResponse {
  html_attributions: any[]; // Can be more specific if needed
  results: Restaurant[];
  status: string;
}
