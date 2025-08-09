import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./../types/product";
import * as api from "./../lib/api";
import { RootState } from "./../store"; // Adjust path as needed

interface ProductsState {
  items: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  categoryFilter: string;
  page: number;
  limit: number;
  selectedProduct?: Product | null;
  deletingProductId?: number | null;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  searchTerm: "",
  categoryFilter: "",
  page: 1,
  limit: 6,
  selectedProduct: null,
  deletingProductId: null,
};

function isError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "message" in error;
}

export const fetchProducts = createAsyncThunk<
  { products: Product[]; total: number },
  void,
  { state: RootState; rejectValue: string }
>("products/fetchProducts", async (_, { getState, rejectWithValue }) => {
  const state = getState();
  try {
    const data = await api.fetchProducts(
      state.products.page,
      state.products.limit,
      state.products.searchTerm,
      state.products.categoryFilter
    );
    return data;
  } catch (err: unknown) {
    if (isError(err)) return rejectWithValue(err.message);
    return rejectWithValue("Unknown error occurred");
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("products/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    return await api.fetchProductById(id);
  } catch (err: unknown) {
    if (isError(err)) return rejectWithValue(err.message);
    return rejectWithValue("Unknown error occurred");
  }
});

export const createProduct = createAsyncThunk<
  Product,
  Omit<Product, "id" | "rating">,
  { rejectValue: string }
>("products/createProduct", async (data, { rejectWithValue }) => {
  try {
    return await api.createProduct(data);
  } catch (err: unknown) {
    if (isError(err)) return rejectWithValue(err.message);
    return rejectWithValue("Unknown error occurred");
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  { id: number; data: Partial<Omit<Product, "id" | "rating">> },
  { rejectValue: string }
>("products/updateProduct", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await api.updateProduct(id, data);
  } catch (err: unknown) {
    if (isError(err)) return rejectWithValue(err.message);
    return rejectWithValue("Unknown error occurred");
  }
});

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("products/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    await api.deleteProduct(id);
    return id;
  } catch (err: unknown) {
    if (isError(err)) return rejectWithValue(err.message);
    return rejectWithValue("Unknown error occurred");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setDeletingProductId(state, action: PayloadAction<number | null>) {
      state.deletingProductId = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch product";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update product";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete product";
      });
  },
});

export const {
  setSearchTerm,
  setCategoryFilter,
  setPage,
  setDeletingProductId,
  clearSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
