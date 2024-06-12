import { CartProvider } from '@/context/CartContext';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
