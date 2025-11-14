import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// type transaction
export interface TransactionState {
  movieId: number | null;
  theaterId: number | null;
  time: string | null;
  seats: number[];
}

const initialState: TransactionState = {
  movieId: null,
  theaterId: null,
  time: null,
  seats: [],
};

// slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<number>) => {
      state.movieId = action.payload;
    },

    setTheaterId: (state, action: PayloadAction<number>) => {
      state.theaterId = action.payload;
    },

    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },

    addSeat: (state, action: PayloadAction<number>) => {
      if (!state.seats.includes(action.payload)) {
        state.seats.push(action.payload);
      }
    },

    // reset
    resetTransaction: () => initialState, // kembali ke nilai awal
  },
});

// remove

// export
export const { setMovieId, setTheaterId, setTime, addSeat, resetTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
