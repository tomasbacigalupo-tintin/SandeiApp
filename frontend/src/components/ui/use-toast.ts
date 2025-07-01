type ToastOptions = {
  title?: string;
  description?: string;
  variant?: 'success' | 'destructive' | 'default';
};

export const toast = (options: ToastOptions) => {
  console.log(options);
};
export const useToast = () => ({ toast });
