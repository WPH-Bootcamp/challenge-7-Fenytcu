import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  category: string;
  sortBy: string;
}

const initialState: FilterState = {
  searchQuery: '',
  category: 'All',
  sortBy: 'popular',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchQuery, setCategory, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;
