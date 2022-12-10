import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShoppingCartModalActive: false,
  isHotelModalActive: false,
  isTourModalActive: false,
  isRestaurantModalActive: false,
  isSkiSchoolModalActive: false,
  hotelModalData: {},
  tourModalData: {},
  restaurantModalData: {},
  skiSchoolModalData: {},
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    stateSetter: (state, action) => {
      state[action.payload.name] = action.payload.state;
    },
  },
});

export const { stateSetter } = modalSlice.actions;

export default modalSlice.reducer;
