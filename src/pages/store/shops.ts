import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clientService from '../helpers/client';
import { Api } from '../constants/api';

interface ShopState {
  shops: any[];         
  isFetching: boolean;
  isCreating: boolean;
  isArchiving: boolean;
  isNameUpdating: boolean;
  loadSuccess: boolean | null;
  creatorsLoading: boolean;
  creatorsLoadSuccess: boolean;
  updateSuccess: string | null;
  archiveSuccess: string | null;
  isNameUpdateSuccess: string | null;
  selectedStoreId: number | null;
  selectedStoreName: string | null;
  selectedStoreRegion: string | null;
}

const initialState: ShopState = {
  shops: [],
  isFetching: false,
  isCreating: false,
  isArchiving: false,
  isNameUpdating: false,
  loadSuccess: null,
  creatorsLoading: false,
  creatorsLoadSuccess: true,
  updateSuccess: null,
  archiveSuccess: null,
  isNameUpdateSuccess: null,
  selectedStoreId: null,
  selectedStoreName: null,
  selectedStoreRegion: null,
};

export const getShopsList = createAsyncThunk(
    'shops/getShopsList',
    async (payload) => {
      const response = await clientService.post(Api.shops.list, payload);
      return response.data;
    }
);

export const uploadCreatorsListToOmit = createAsyncThunk(
    'shops/uploadCreatorsListToOmit',
    async (payload) => {
      const response = await clientService.post(Api.shops.updateCreatorsToOmit, payload);
      return response.data;
    }
);

export const createShop = createAsyncThunk(
    'shops/createShop',
    async (payload) => {
      const response = await clientService.post(Api.shops.create, payload);
      return response.data;
    }
);

export const archiveShop = createAsyncThunk(
    'shops/archiveShop',
    async (payload) => {
      const response = await clientService.post(Api.shops.archive, payload);
      return response.data;
    }
);

export const updateShopName = createAsyncThunk(
    'shops/updateShop',
    async (payload) => {
      const response = await clientService.post(Api.shops.update, payload);
      return response.data;
    }
);

const ShopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setSelectedStoreName: (state, action) => {
      state.selectedStoreName = action.payload;
    },
    setSelectedStoreId: (state, action) => {
      state.selectedStoreId = action.payload; // Update the selected store ID
      state.selectedStoreName = state.shops.find((shop) => shop.shop_id === action.payload)?.shop_name; // Update the selected store name
      state.selectedStoreRegion = state.shops.find((shop) => shop.shop_id === action.payload)?.shop_region; // Update the selected store region

      // Save to session storage
      sessionStorage.setItem('selectedStoreId', JSON.stringify(state.selectedStoreId));
    },
    clearSelectedStoreId: (state) => {
      state.selectedStoreId = null; // Clear the selected store ID
      state.selectedStoreName = null; // Clear the selected store name
      state.selectedStoreRegion = null; // Clear the selected store region

      // Remove from session storage
      sessionStorage.removeItem('selectedStoreId');
    },
    adminChangedCustomer: (state) => {
      state.selectedStoreId = null;
      state.selectedStoreName = null;
      state.selectedStoreRegion = null;
      state.loadSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getShopsList.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getShopsList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.shops = action.payload;
      state.loadSuccess = true;
      state.creatorsLoadSuccess = true;
    });
    builder.addCase(getShopsList.rejected, (state, action) => {
      state.isFetching = false;
      state.loadSuccess = null;
    });
    builder.addCase(uploadCreatorsListToOmit.pending, (state) => {
      state.creatorsLoading = true;
    });
    builder.addCase(uploadCreatorsListToOmit.fulfilled, (state, action) => {
      state.creatorsLoading = false;
      state.creatorsLoadSuccess = false;
    });
    builder.addCase(uploadCreatorsListToOmit.rejected, (state, action) => {
      state.creatorsLoading = false;
    });
    builder.addCase(createShop.pending, (state) => {
      state.isCreating = true;
    });
    builder.addCase(createShop.fulfilled, (state, action) => {
      state.isCreating = false;
      state.updateSuccess = action.payload.message;
      state.loadSuccess = false;
    });
    builder.addCase(createShop.rejected, (state, action) => {
      state.isCreating = false;
      state.updateSuccess = null;
    });
    builder.addCase(archiveShop.pending, (state) => {
      state.isArchiving = true;
    }); 
    builder.addCase(archiveShop.fulfilled, (state, action) => {
      state.isArchiving = false;
      state.archiveSuccess = action.payload.message;
      state.loadSuccess = false;
    });
    builder.addCase(archiveShop.rejected, (state, action) => {
      state.isArchiving = false;
      state.archiveSuccess = null;
    });
    builder.addCase(updateShopName.pending, (state) => {
      state.isNameUpdating = true;
    });
    builder.addCase(updateShopName.fulfilled, (state, action) => {
      state.isNameUpdating = false;
      state.isNameUpdateSuccess = action.payload.message;
      state.loadSuccess = false;
    });
    builder.addCase(updateShopName.rejected, (state, action) => {
      state.isNameUpdating = false;
      state.isNameUpdateSuccess = null;
    });
  },
});

export const { setSelectedStoreName, setSelectedStoreId, clearSelectedStoreId, adminChangedCustomer } = ShopsSlice.actions;
export default ShopsSlice.reducer;

