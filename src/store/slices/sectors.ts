import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SliceState {
  sectors: any[];
}

const initialState: SliceState = {
  sectors: [],
};

export const fetchSectorsAsync = createAsyncThunk(
  "sectors/fetchSectors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);

export const sectorsSlice = createSlice({
  name: "sectors",
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<any[]>) => {
      state.sectors.push(...action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSectorsAsync.fulfilled, (state, action) => {
        state.sectors.push(action.payload);
      })
      .addCase(fetchSectorsAsync.rejected, (state, action) => {
        console.log("action", action.payload);
      });
  },
});

export const {
  reducer: sectorsReducer,
  actions: { fetchUsers },
} = sectorsSlice;
