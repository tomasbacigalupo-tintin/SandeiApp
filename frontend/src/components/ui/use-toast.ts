type ToastOptions = {
  title?: string;
  description?: string;
  variant?: 'success' | 'destructive' | 'default';
};

import { toast as sonner } from 'sonner';

export const toast = ({ title, description, variant = 'default' }: ToastOptions) => {
  const message = title ?? '';
  if (variant === 'success') {
    sonner.success(message, { description });
    return;
  }
  if (variant === 'destructive') {
    sonner.error(message, { description });
    return;
  }
  sonner(message, { description });
};
export const useToast = () => ({ toast });
