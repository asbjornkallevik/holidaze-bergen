/* export const API_URL = process.env.API_URL;
export const API_BASE_URL = process.env.API_BASE_URL;

export const ACCOMMODATION_ENDPOINT = "accommodation/";
export const REQUESTS_ENDPOINT = "hotel-request/";
export const MEDIA_ENDPOINT = "media/";

export const TOKEN_PATH = "jwt-auth/v1/token"; */

export const API = {
  API_BASE_URL: process.env.API_BASE_URL,
  API_URL: process.env.API_URL,
  ACCOMMODATION_ENDPOINT: "accommodation/",
  REQUESTS_ENDPOINT: "hotel-request/",
  CONTACT_ENDPOINT: "contact/",
  MEDIA_ENDPOINT: "media/",
  CATEGORIES_ENDPOINT: "categories/",
  TOKEN_PATH: "jwt-auth/v1/token",
  GUEST_USER: {
    username: "guest",
    password: "guest123",
  },
};
