export interface ResponseAPI<T=null> {
  success: boolean;
  data?: T,
  error?: string;
  message: string;
}