import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductStoreType } from '../../types';

interface WishlistTypes {
  wishlistItems: ProductStoreType[];
}

const initialState: WishlistTypes = {
  wishlistItems: []
};

// Helper to find product index in the wishlist
const indexSameProduct = (state: WishlistTypes, action: ProductStoreType) => {
  return state.wishlistItems.findIndex(
    (product) =>
      product.id === action.id &&
      product.color === action.color &&
      product.size === action.size
  );
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<ProductStoreType>) {
      const index = indexSameProduct(state, action.payload);
      if (index === -1) {
        state.wishlistItems.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<ProductStoreType>) {
      const index = indexSameProduct(state, action.payload);
      if (index !== -1) {
        state.wishlistItems.splice(index, 1);
      }
    },
    toggleWishlist(state, action: PayloadAction<ProductStoreType>) {
      const index = indexSameProduct(state, action.payload);
      if (index === -1) {
        state.wishlistItems.push(action.payload);
      } else {
        state.wishlistItems.splice(index, 1);
      }
    }
  }
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
