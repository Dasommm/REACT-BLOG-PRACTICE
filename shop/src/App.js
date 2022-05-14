import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { createContext, useState } from "react";
import data from "./data";
// import {a,b} from './data'; export한 js와 같은 형식으로 import한다.(변수명도 동일하게)
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";

export let Context1 = createContext(); // 컨텍스트(state보관함) 만들어 준다

function App() {
	let [shoes, setShoes] = useState(data);
	// 서버에서 보낸 data로 가정. data가 길어져서 data.js에 저장하고, import 해옴 console.log("App
	// render");
	let [stock, setStock] = useState([10, 11, 12]); //Detail, TabData에서 쓰고 싶음.context API 사용

	let navigate = useNavigate(); //패이지 이동 도와주는 함수
	//navigate(1)은 앞으로 가기, navigate(-1)은 뒤로가기

	function upSort() {
		console.log("upSort");
		console.log("shoes::::", shoes);

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
		console.log("result:::", result);

		setShoes(result);
	}

	function downSort() {
		console.log("downSort");
		console.log("shoes::::", shoes);

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
		console.log("result:::", result);

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
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route
					path='/'
					element={
						<>
							{" "}
							<div className='main-bg'> </div>
							<button onClick={upSort}>오름차순</button>
							<button onClick={downSort}>내림차순</button>
							<div>
								{" "}
								<Container>
									<Row>
										{shoes.map((items, i) => (
											<Item key={i} items={shoes[i]} index={i} />
										))}
									</Row>
								</Container>
							</div>
							<button
								onClick={() => {
									axios
										.get("https://codingapple1.github.io/shop/data2.json")
										.then((result) => {
											console.log(result.data);
											//array 합치려면 => .concat()함수 사용해도 된다.
											let temp = [...shoes, ...result.data];
											setShoes(temp);
										})
										.catch(() => {
											console.log("connect failed");
										});
								}}>
								버튼
							</button>
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
			onClick={() =>
				navigate("/detail", {
					state: {
						items,
					},
				})
			}>
			<img src={items.img} width='80%' />
			<h4>{items.title}</h4>
			<p>{items.price}</p>
		</Col>
	);
}

export default App;
//html에서는 파일을 각각 따로 만들어서 사용 react는 html을 하나만 만든다.
//1.컴포넌트 만들어서 상세페이지 내용 채운다.
// 2.datail 접속하면 그 컴포넌트 보여준다. react-router-dom 라이브러리 사용해서 쓴다. npm install
// react-router-dom
