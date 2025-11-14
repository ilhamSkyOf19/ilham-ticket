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

    addSeats: (state, action: PayloadAction<number[]>) => {
      action.payload.forEach((seat) => {
        if (!state.seats.includes(seat)) {
          state.seats.push(seat);
        }
      });
    },

    // reset
    resetTransaction: () => initialState, // kembali ke nilai awal
  },
});

// remove

// export
export const { setMovieId, setTheaterId, setTime, addSeats, resetTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
