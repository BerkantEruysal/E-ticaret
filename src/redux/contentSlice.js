import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skiResortList: { SkiResorts: [] },
  hotelList: { Hotels: [] },
  tourList: { Tours: [] },
  skiSchoolList: { SkiSchools: [] },
  restaurantList: { Restaurants: [] },
  skiResortDetailList: [],
  hotelDetailList: [],
  tourDetailList: [],
  skiSchoolDetailList: [],
  restaurantDetailList: [],
  mainScreenContent: {},
  isDataLoading: false,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContentData: (state, action) => {
      state[action.payload.target] = action.payload.content;

      return state;
    },
    setDetailContentData: (state, action) => {
      const index = state[action.payload.target].findIndex((content) => {
        return content.Id == action.payload.content.Id;
      });

      if (index != -1) {
        state[action.payload.target][index] = action.payload.content;
        return state;
      }
      state[action.payload.target].push(action.payload.content);
    },
    resetContentData: (state, action) => {
      state = {
        skiResortList: { SkiResorts: [] },
        hotelList: { Hotels: [] },
        tourList: { Tours: [] },
        skiSchoolList: { SkiSchools: [] },
        restaurantList: { Restaurants: [] },
        skiResortDetailList: [],
        hotelDetailList: [],
        tourDetailList: [],
        skiSchoolDetailList: [],
        restaurantDetailList: [],
        mainScreenContent: {},
      };
    },
    setIsDataLoading: (state, action) => {
      state.isDataLoading = action.payload;
    },
  },
});

export const {
  setContentData,
  setDetailContentData,
  resetContentData,
  setIsDataLoading,
} = contentSlice.actions;

export default contentSlice.reducer;
