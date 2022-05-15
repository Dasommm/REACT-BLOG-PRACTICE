import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { createContext, useEffect, useState } from "react";
import data from "./data";
// import {a,b} from './data'; export한 js와 같은 형식으로 import한다.(변수명도 동일하게)
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";
import Cart from "./routes/Cart";

export let Context1 = createContext(); // 컨텍스트(state보관함) 만들어 준다

function App() {
  // let obj = { name: "kim" };
  // localStorage.setItem("data", JSON.stringify(obj));
  // let out = localStorage.getItem("data");
  // console.log(JSON.parse(out));

  useEffect(() => {
    //열어본 상품 목록 초기화
    //이미 watchlist에 값이 있으면 set하지 않는식으로 변경해보기
    //모든 state를 localstorage에 담으려면 redux-persist 같은 라이브러리 알아보기
    //redux와 비슷한 jotai, Zustand 같은 라이브러리가 많으니 찾아보기
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  let [shoes, setShoes] = useState(data);
  // 서버에서 보낸 data로 가정. data가 길어져서 data.js에 저장하고, import 해옴 console.log("App
  // render");
  let [stock, setStock] = useState([10, 11, 12]); //Detail, TabData에서 쓰고 싶음.context API 사용
  let [click, setClick] = useState(2);
  let [visible, setVisible] = useState(true);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate(); //패이지 이동 도와주는 함수
  //navigate(1)은 앞으로 가기, navigate(-1)은 뒤로가기

  function upSort() {
    // console.log("upSort");
    // console.log("shoes::::", shoes);

    let copy = [...shoes];
    let result = copy.sort(function (a, b) {
      let x = a.price;
      let y = b.price;

      if (x < y) {
        return -1;
      } else if (x > y) {
        return 1;
      } else return 0;
    });
    // console.log("result:::", result);

    setShoes(result);
  }

  function downSort() {
    // console.log("downSort");
    // console.log("shoes::::", shoes);

    let copy = [...shoes];
    let result = copy.sort(function (a, b) {
      let x = a.price;
      let y = b.price;

      if (x < y) {
        return 1;
      } else if (x > y) {
        return -1;
      } else return 0;
    });
    // console.log("result:::", result);

    setShoes(result);
  }

  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}>
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}>
              Features
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}>
              Event
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}>
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='sidenav'>
        <a href='#about'>열어본 상품</a>
        <WatchSidebar />
      </div>

      <Routes>
        <Route
          path='/'
          element={
            <>
              <div className='main-bg'> </div>
              <button onClick={upSort}>오름차순</button>
              <button onClick={downSort}>내림차순</button>
              <div>
                <Container>
                  <Row>
                    {shoes.map((items, i) => (
                      <Item key={i} items={shoes[i]} index={i} />
                    ))}
                  </Row>
                </Container>
              </div>
              {loading ? <div>loading....</div> : null}
              <button
                style={visible ? { visibility: "visible" } : { visibility: "hidden" }}
                onClick={() => {
                  setLoading(true);
                  setClick((current) => current + 1);
                  console.log(click);
                  console.log(loading);
                  click < 4
                    ? axios
                        .get(`https://codingapple1.github.io/shop/data${click}.json`)
                        .then((result) => {
                          console.log(result.data);
                          //array 합치려면 => .concat()함수 사용해도 된다.
                          let temp = [...shoes, ...result.data];
                          setShoes(temp);
                          setLoading(false);
                        })
                        .catch(() => {
                          console.log("connect failed");
                          setLoading(false);
                        })
                    : setVisible(false);
                  //   setLoading(false);
                }}>
                버튼
              </button>
              {visible ? null : <div>마지막 상품입니다.</div>}
            </>
          }
        />
        <Route
          path='/detail'
          element={
            <Context1.Provider value={{ stock }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          } //<Deatil shoes={shoes}/> 여기 안의 모든 컴포넌트는 props 전송 없이도 stock 사용가능하다.
        />
        <Route path='/cart' element={<Cart />} />

        <Route path='/about' element={<About />}>
          <Route path='member' element={<div> 멤버임</div>} />
          <Route path='location' element={<div> 위치임</div>} />
        </Route>

        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div> 첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div> 생일기념 쿠폰받기</div>} />
        </Route>

        <Route path='*' element={<div> 없는페이지입니다.</div>} />
      </Routes>
    </div>
  );
}
//*는 이외의 모든것 Nested Routes

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Item({ items, index }) {
  let navigate = useNavigate();

  return (
    <Col
      sm='sm'
      onClick={
        () =>
          navigate("/detail", {
            state: {
              items,
            },
          })
        //
      }>
      <img src={`https://codingapple1.github.io/shop/shoes${items.id + 1}.jpg`} width='50%' />
      <h4>{items.title}</h4>
      <p>{items.price}</p>
    </Col>
  );
}

function WatchSidebar() {
  let jsonResult = JSON.parse(localStorage.getItem("watched"));
  // console.log("열어본", jsonResult);
  return (
    <>
      {jsonResult.map((data, i) => (
        <div key={i}>
          <p>{data.title}</p>
        </div>
      ))}
    </>
  );
}

export default App;
//html에서는 파일을 각각 따로 만들어서 사용 react는 html을 하나만 만든다.
//1.컴포넌트 만들어서 상세페이지 내용 채운다.
// 2.datail 접속하면 그 컴포넌트 보여준다. react-router-dom 라이브러리 사용해서 쓴다. npm install
// react-router-dom
