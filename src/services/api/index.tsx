import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from "axios";
import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
const BASE_API = "http://localhost:3001";
// Define HTTP Methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Define the configuration for the API request
export interface ApiRequestConfig {
  url: string;
  method: HttpMethod;
  bodyData?: Record<string, any>; // Optional payload for POST, PUT, etc.
  params?: Record<string, any>; // Optional query parameters
  isBaseUrl?: boolean; // Whether to prefix BASE_API to the URL
}

// Generic response structure for API responses
export interface ApiResponse<T> {
  data: T; // The actual response data
  message?: string; // Optional success or error message
  status?: HttpStatusCode; // HTTP status code
}

// Reusable API request function
const fetcher = async <T,>({
  url,
  method,
  bodyData = {},
  params = {},
  isBaseUrl = true,
  ...props
}: ApiRequestConfig): Promise<ApiResponse<T>> => {
  try {
    // Retrieve token from the store
    // Set up the Axios request configuration
    const config: AxiosRequestConfig = {
      method,
      url: isBaseUrl ? `${BASE_API}${url}` : url, // Add BASE_API prefix if required
      data: bodyData, // Request payload
      params: params, // Query parameters
      headers: {
        "Content-Type":
          bodyData instanceof FormData
            ? "multipart/form-data"
            : "application/json", // Default content type
      },
      ...props,
      withCredentials: false,
      // withCredentials: true, // Enable credentials for CORS mode
    };

    const request = () => axios(config);

    const { data, status } = await handleRequest(request);

    return {
      data: data,
      message: "Request successful",
      status: status,
    };
  } catch (error: any) {
    if (error?.status === HttpStatusCode.Unauthorized) {
      return refreshToken();
    }

    // Handle errors
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";

    // Throw a descriptive error
    throw new Error(errorMessage);
  }
};

const handleRequest = async (request: () => Promise<AxiosResponse>) => {
  try {
    return await request();
  } catch (error: any) {
    if (error?.status === HttpStatusCode.Unauthorized) {
      await refreshToken();
      return await request();
    }
    throw new Error(
      error?.response?.data?.message || error.message || "Request failed"
    );
  }
};

const refreshToken = () => {
  return axios({
    url: `${BASE_API}${"/auth/refresh"}`,
    method: "POST",
    withCredentials: true,
  });
};
export { fetcher };
