import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  //useState의 역할
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    //state 수정함수
    changeName(state) {
      state.age = state.age + 1;
    },
  },
});

export let { changeName } = user.actions;

let stock = createSlice({
  //useState의 역할
  name: "stock",
  initialState: [10, 11, 12],
});

let cartIn = createSlice({
  name: "cartIn",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state, action) {
      //   console.log(index);
      //   console.log(index.payload);
      let i = action.payload;
      state[i].count++;
      //findIndex로 array index 찾아서 바꿔준다
    },
    addItem(state, action) {
      //   console.log("addItem", state, action);
      let isId = state.findIndex((state) => {
        return state.id === action.payload.id;
      });
      //console.log("id", isId);

      if (isId === -1) {
        state.push({ id: action.payload.id, name: action.payload.title, count: 1 });
      } else {
        state[isId].count++;
      }
    },
    deleteItem(state, action) {
      console.log("삭제", action);
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export let { changeCount, addItem, deleteItem } = cartIn.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cartIn: cartIn.reducer,
  },
});
