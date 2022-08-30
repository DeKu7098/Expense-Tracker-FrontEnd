import { createSlice, configureStore } from "@reduxjs/toolkit";

 const initialToken = localStorage.getItem('token')
 const userIsLoggedIn = !!initialToken
const authslice = createSlice({
  name: "auth",
  initialState: { loggedIn: userIsLoggedIn, IDTOKEN: initialToken },
  reducers: {
    isLoggedIn(state) {
      state.loggedIn = !state.loggedIn;
          
    },
    tokenId(state, action) {
      state.IDTOKEN = action.payload;
      localStorage.setItem('token', action.payload)
    },
    deletetokenId(state) {
      state.IDTOKEN = null;
      localStorage.removeItem('token')
    },
  },
});
const itemslice = createSlice({
  name: "items",
  initialState: { items: [] },
  reducers: {
    inputData(state, action) {
      state.items = [...state.items, action.payload];
    },
    ReceivedData(state, action) {
      state.items = action.payload;
    },
    removeItem(state,action){
            const updatedItems = state.items.filter(items => items.id !== action.payload)
            state.items = updatedItems
    },
    updateItem(state){
        state.items = [...state.items]
    },
  },
});

const initialState = {
    isPremium: false,
    changeTheme: false,
}


const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers:{
        Premium(state){
            state.isPremium = true
        },
        switch(state){
            state.changeTheme = !state.changeTheme
        },
        normal(state){
            state.isPremium = false
        }
    }
});

const store = configureStore({
    reducer: { auth: authslice.reducer, data: itemslice.reducer, theme: themeSlice.reducer },
  });
  
  



export const authsliceactions = authslice.actions;
export const itemsliceactions = itemslice.actions;
export const themeSliceActions = themeSlice.actions;

export default store;
