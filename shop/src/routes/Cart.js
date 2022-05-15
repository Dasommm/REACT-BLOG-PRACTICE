import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeCount, changeName, deleteItem } from "../store";

const Cart = () => {
  let state = useSelector((state) => {
    return state;
  });
  //console.log(state);

  const cartIn = state.cartIn;
  //console.log(cartIn);

  let dispatch = useDispatch(); // store.js 로 요청 보내주는 함수

  return (
    <div>
      {/* {state.user.name}의 장바구니{state.user.age}
      <button
        onClick={() => {
          dispatch(changeName());
        }}>
        버튼
      </button> */}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cartIn.map((data, i) => (
            <CartData cartIn={data} dispatch={dispatch} index={i} key={i} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

function CartData({ cartIn, dispatch, index }) {
  //console.log("카트", cartIn);
  //console.log("index", index);
  return (
    <tr>
      <td>{cartIn.id}</td>
      <td>{cartIn.name}</td>
      <td>{cartIn.count}</td>
      <td>
        <button
          onClick={() => {
            dispatch(changeCount(index));
          }}>
          +
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            dispatch(deleteItem(cartIn));
          }}>
          삭제
        </button>
      </td>
    </tr>
  );
}

export default Cart;
