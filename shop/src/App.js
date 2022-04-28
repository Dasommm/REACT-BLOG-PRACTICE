import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container, Nav, Row,Col } from 'react-bootstrap'
import { useState } from 'react';
import data from './data';
// import {a,b} from './data'; export한 js와 같은 형식으로 import한다.(변수명도 동일하게)

function App() {

  let [shoes] = useState(data);
  //서버에서 보낸 data로 가정. data가 길어져서 data.js에 저장하고, import 해옴
console.log("App render");

  return (
    <div className="App">
     <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      </Container>
    </Navbar>

    
    <div className='main-bg'></div>
    <div>
      <Container>
        <Row>
          {shoes.map((items, i)=>
            <Item key={i} items={shoes[i]} index={i} />
          )}
        </Row>
      </Container>

    </div>
  </div>
  );
}

function Item ({items, index}){

  return (
    <Col sm>
      <img src={items.img} width="80%"/>
      <h4>{items.title}</h4>
      <p>{items.price}</p> 
    </Col>
  )
}

export default App;
