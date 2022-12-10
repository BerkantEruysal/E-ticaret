import { createSlice } from "@reduxjs/toolkit";
import { getLocationText } from "../Hooks";

const initialState = {
  userCredentials: {
    Token: null,
  },
  WishList: [],
  LastViews: [],
  ShoppingCart: [],
  isLoggedIn: false,
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.userCredentials = action.payload;
    },
    logout: (state) => {
      state.userCredentials = {
        Token: null,
      };
      state.isLoggedIn = false;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    toggleWishListItem: (state, action) => {
      const index = state.WishList.findIndex((item) => {
        return (
          item.EntityGroup == action.payload.RecordEntityGroup &&
          item.EntityKey == action.payload.Id
        );
      });

      if (index == -1) {
        state.WishList.push({
          EntityGroup: action.payload.RecordEntityGroup,
          EntityKey: action.payload.Id,
          EntityName: action.payload.Title,
          EntityImage: action.payload.Image,
        });
        return state;
      }
      state.WishList.splice(index, 1);
      return state;
    },
    setWishList: (state, action) => {
      state.WishList = action.payload.WishList.Wishes;
      return state;
    },
    addToLastViews: (state, action) => {
      const index = state.LastViews.findIndex((item) => {
        return (
          item.EntityKey == action.payload.Id &&
          item.EntityGroup == action.payload.RecordEntityGroup
        );
      });

      if (index == -1) {
        state.LastViews.push({
          EntityKey: action.payload.Id,
          EntityGroup: action.payload.RecordEntityGroup,
          EntityName: action.payload.Title,
          EntityImage: action.payload.Image,
          EntityObject: {
            SeName: action.payload.SeName,
            Location: getLocationText(action.payload),
          },
        });

        return state;
      }

      let mockList = [...state.LastViews];
      mockList.splice(index, 1);
      mockList = [
        {
          EntityKey: action.payload.Id,
          EntityGroup: action.payload.RecordEntityGroup,
          EntityName: action.payload.Title,
          EntityImage: action.payload.Image,
          EntityObject: {
            SeName: action.payload.SeName,
            Location: getLocationText(action.payload),
          },
        },
        ...mockList,
      ];
      state.LastViews = mockList;
      return state;
    },
    setLastViews: (state, action) => {
      state.LastViews = action.payload.map((element) => {
        element.EntityObject.Location = getLocationText(element.EntityObject);
        return element;
      });
    },
    addToShoppingCart: (state, action) => {
      state.ShoppingCart.push(action.payload);
    },
    removeFromShoppingCart: (state, action) => {
      const index = state.ShoppingCart.findIndex((item) => {
        return JSON.stringify(item) === JSON.stringify(action.payload);
      });

      if (index == -1) {
        return state;
      }
      state.WishList.splice(index, 1);
      return state;
    },
    setShoppingCart: (state, action) => {
      state.ShoppingCart = action.payload;
      return state;
    },
  },
});

export const {
  setUserCredentials,
  logout,
  login,
  toggleWishListItem,
  setWishList,
  addToLastViews,
  setLastViews,
  addToShoppingCart,
  removeFromShoppingCart,
  setShoppingCart,
} = accountSlice.actions;

export default accountSlice.reducer;
