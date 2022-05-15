//rsc 입력

import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { addItem } from "../store.js";
import { Context1 } from "./../App.js";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10 px;
`;

let BlackBox = styled.div`
  background: grey;
  padding: 20px;
`;
let copy = styled.button(YellowBtn); // 복사

const Detail = ({ shoes }) => {
  //유저가 id에 입력한 값을 가져올 수 있다.

  let dispatch = useDispatch();

  let { stock } = useContext(Context1); // 보관함 해체 오브잭트 형태로 있음{state, state,,...}

  let [tab, setTab] = useState(0); //탭 UI 조작 스위치
  const [visible, setVisible] = useState(true);
  let [count, setCount] = useState(0);

  // useEffect는 html렌더링 이후에 실행된다. 시간이 오래걸리는 작업들을 많이 쓴다. 서버에서 데이터 가져오는 것 등 timer
  // 등..
  useEffect(() => {
    //처음 실행될떄, update(재렌더링) 될떄 실행해준다.  setTimeout (()=> {실행할코드}, 10000);
    setTimeout(() => {
      // console.log("삭제");
      setVisible(false);
    }, 2000); //2초 이후에 div를 없애준다
  });

  const { state } = useLocation();
  // let {id} = useParams(); console.log(id)
  const item = state["items"];
  // console.log(state) console.log(item)

  let [fade2, setFade2] = useState("");
  useEffect(() => {
    setFade2("end");
    return () => setFade2("");
  }, []);

  //상품 조회시 watched에 저장
  useEffect(() => {
    let watchList = JSON.parse(localStorage.getItem("watched"));
    // console.log("리스트", watchList, itemId);
    let isWatchList = watchList.findIndex((watchList) => {
      return watchList.id === item.id;
    });
    if (isWatchList === -1) {
      watchList.push(item);
      localStorage.setItem("watched", JSON.stringify(watchList));
    }
    // console.log("list", watchList);
  }, []);

  return (
    <div className={"container start " + fade2}>
      <div
        style={
          visible
            ? {
                display: "block",
              }
            : {
                display: "none",
              }
        }
        className='alert alert-warning'>
        2초 이내 구매시 할인
      </div>
      {/* {count} */}
      {/* <button onClick={() => setCount(count + 1)}>버튼</button>
      <BlackBox>
        <YellowBtn bg='blue'>버튼</YellowBtn>
        <YellowBtn bg='green'>버튼</YellowBtn>
      </BlackBox> */}
      <div className='row'>
        <div className='col-md-6'>
          <img src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`} width='100%' />
        </div>
        <div className='col-md-6'>
          <h4 className='pt-5'>{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}원</p>
          <button className='btn btn-danger' onClick={() => dispatch(addItem(item))}>
            주문하기
          </button>
        </div>
      </div>

      <Nav variant='tabs' defaultActiveKey='link0'>
        <Nav.Item>
          <Nav.Link
            eventKey='link0'
            onClick={() => {
              setTab(0);
            }}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey='link1'
            onClick={() => {
              setTab(1);
            }}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey='link2'
            onClick={() => {
              setTab(2);
            }}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabData tab={tab} shoes={shoes} item={item} />
    </div>
  );
};
//if문은 위의 HTML에 쓸수가 없다. 일반 if 조건문을 쓰려면 컴포넌트로 만들어서 위에 넣는다.
function TabData({ tab, shoes, item }) {
  // 컴포넌트는 return을 안넣으면 제 기능을 못한다. if (tab == 0) { 	return <div>내용0</div>; } else
  // if (tab == 1) { 	return <div>내용1</div>; } else { 	return <div>내용2</div>; }
  // array에 넣어서 state에 따라 맞는 값을 꺼내는 식으로 짜면 if문 없이 사용할 수 있다. [<div>내용0</div>,
  // <div>내용0</div>, <div>내용0</div>][0]; tab state가 변하면 end를 부착할거다.
  let [fade, setFade] = useState("");
  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      //cleanup
      clearTimeout(a);
      setFade("");
    };
  }, [tab]);
  // 리액트의 automatic batching 기능 state변경하는게 근처에 있다면, state 변경이다된후합쳐서 한번만 렌더링 한다.
  // 그래서 setTimeout을 줫음

  let { stock } = useContext(Context1); // 보관함 해체 오브잭트 형태로 있음{state, state,,...}
  // console.log(item);
  // console.log(tab);

  return <div className={`start ${fade}`}>{[<div>{shoes[tab].title}</div>, <div>{shoes[tab].content}</div>, <div>{stock}</div>][tab]}</div>;
}

export default Detail;
