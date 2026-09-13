import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant, CartItem } from '@/types';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/utils';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  discountCode: string | null;
  discountPercent: number;
  discountAmountFixed: number;
  
  // Actions
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
  applyDiscount: (code: string, percent?: number, fixed?: number) => void;
  removeDiscount: () => void;
  
  // Computed helpers
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingAmount: () => number;
  getTaxAmount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      discountCode: null,
      discountPercent: 0,
      discountAmountFixed: 0,

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === product.id && item.variantId === variant.id
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems, isDrawerOpen: true };
          }

          const newItem: CartItem = {
            id: `cart-${product.id}-${variant.id}-${Date.now()}`,
            productId: product.id,
            product,
            variantId: variant.id,
            variant,
            quantity,
          };

          return { items: [...state.items, newItem], isDrawerOpen: true };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], discountCode: null, discountPercent: 0, discountAmountFixed: 0 });
      },

      setDrawerOpen: (isDrawerOpen) => {
        set({ isDrawerOpen });
      },

      applyDiscount: (code, percent = 0, fixed = 0) => {
        set({ discountCode: code, discountPercent: percent, discountAmountFixed: fixed });
      },

      removeDiscount: () => {
        set({ discountCode: null, discountPercent: 0, discountAmountFixed: 0 });
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => {
          const price = item.product.basePrice + (item.variant.priceAdjustment || 0);
          return sum + price * item.quantity;
        }, 0);
      },

      getDiscountAmount: () => {
        const { discountPercent, discountAmountFixed } = get();
        const subtotal = get().getSubtotal();
        if (discountPercent > 0) {
          return (subtotal * discountPercent) / 100;
        }
        return Math.min(subtotal, discountAmountFixed);
      },

      getShippingAmount: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
          return 0;
        }
        return 195; // Standard freight & white glove setup for outdoor pieces under threshold
      },

      getTaxAmount: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        return (subtotal - discount) * 0.08; // 8% estimated luxury goods tax
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingAmount();
        const tax = get().getTaxAmount();
        return Math.max(0, subtotal - discount + shipping + tax);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'silvex-cart-v1',
      partialize: (state) => ({
        items: state.items,
        discountCode: state.discountCode,
        discountPercent: state.discountPercent,
        discountAmountFixed: state.discountAmountFixed,
      }),
    }
  )
);
