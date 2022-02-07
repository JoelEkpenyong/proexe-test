import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    confirmModal: { isOpen: false, props: null },
  },
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
  },
});

export const { toggleModal } = uiSlice.actions;

export default uiSlice.reducer;
