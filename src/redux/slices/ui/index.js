import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    confirmModal: { isOpen: false, props: null },
  },
  sort: {
    username: {
      order: null
    }
  }
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      if (state.modals[action.payload.name]) {
        // toggle if modal exists
        state.modals[action.payload.name].isOpen =
          !state.modals[action.payload.name].isOpen;
        state.modals[action.payload.name].props = action.payload.props;
      }
    },
    toggleSort: (state, action) => {
      if(state.sort[action.payload.name]) {
        state.sort[action.payload.name].order = action.payload.direction
      }
    },
    resetSort: (state, action) => {
      Object.keys(state.sort).forEach((name) => {
        (state.sort)[name].order = null;
      });
    }
  },
});

export const { toggleModal, toggleSort, resetSort } = uiSlice.actions;

export default uiSlice.reducer;
