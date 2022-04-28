//eslint-disable 치면 워닝메세지 안뜨게 할 수 있다. 
//import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {
  //자료를 잠깐 보관할떄는 let, const, var 같은 변수를 쓴다.
  //변수는 변경이 되면 html에 자동으로 반영이 안됨
  //state는 자동으로 html에 재렌더링 된다. 
  //변동시 자동으로 html에 반영되게 만들고 싶을때 state를 쓴다.

  let [list,setList]= useState([
    {id: 1, title:'남자 코트 추천', like :0, color: 'red'},
    {id: 2, title:'강남 우동맛집', like :0, color :'blue' },
    {id: 3, title:'파이썬독학', like :0, color :'green'},
  ]);

  let[modal, setModal] = useState(false);
  let[selectIndex,setSelectIndex] = useState(0);
  let[inputMsg, setInputMsg] = useState("");

  function changeCount(flag,i){
    ///setCount(count= count+1)
   console.log(i)
   // console.log(list.like)
   let copy = [...list];
  flag === "good" ? copy[i].like += 1 : copy[i].like -= 1
  if(copy[i].like < 0){
    copy[i].like = 0
  }

   setList(copy);
  }

  function showModal (i){
    setSelectIndex(i);
    setModal(!modal);
  }
  
  //map함수
  //1. array자료 갯수만큼 함수 안의 코드 실행해줌
  // 2. 함수의 파라미터는 array 안에 있던 자료임
  // 3..return에 뭐 적으면 array로 담아줌

  function addInputText(){
    console.log(inputMsg)
    let copy = [...list];
    copy.unshift({id: 0, title:inputMsg, like:0, color: 'pink'});
    setList(copy);
  }

  function deleteTitle(e, i){
    e.stopPropagation();
    setModal(false)

    let copy = [...list]
    copy.splice(i,1);
    setList(copy)
}

  console.log("-------refresh");
  return (
    <div className="App">
     <div className="black-nav">
       <h4 style={{color :'red', fontSize:'16px'}}>bloggggg</h4>
     </div>
     {/* <div className="list">
      <h4>{title[0]} <span onClick={changeCount}>👍</span> {count} </h4>
      <p>2월 17일 발행</p>
     </div>

     <div className="list">
      <h4>{title[1]}</h4>
      <p>2월 17일 발행</p>
     </div> */}

     {
      //  [1,2,3].map(function(){
      list.map(function(list,i){  //i는 반복문을 돌때 마다 0부터 1까지 증가하는 정수
        ////{title[i]}로 적어도 된다. 
         return (
          <div className="list" key={i} >
          <h4 onClick={()=>showModal(i)}>{list.title} 
            {list["like"]} 
            <button onClick={(e)=> {e.stopPropagation(); changeCount("good",i)}}>👍</button>  
            <button onClick={(e)=>{e.stopPropagation(); changeCount("hate",i)}}>👎</button>
          </h4>
          <p>2월 17일 발행</p>
          <button onClick={(e)=>  deleteTitle(e, i)}>삭제</button>
        </div>
        )
       })
     }
      <input onChange={(e)=>setInputMsg(e.target.value)}></input>
      <button onClick={addInputText}>추가</button>

     {/* <div className="list">
      <h4 onClick={() => {setModal(!modal)}}>{title[2]}</h4>
      <p>2월 17일 발행</p>
     </div> */}
     {
      modal ? <Modal list={list} index={selectIndex} /> : null
    }
    
    </div>
  );
}

function Modal({list,index}){
  //console.log(props)

  return(
    //가장 바깥의 tag에서 의미 없는 div을 쓰기 싫은경우 <> </>로 묶어도 된다.
    <div className='modal' style={{backgroundColor: list[index].color}}>
      <h4>제목 : {list[index].title}</h4>
      <p>날짜</p>
      <p>상세내용</p>
     </div>
  )  
}

//자식이 부모의 state를 사용할 수 있음 
//부모 -> 자식 state 전송하는 법


// let Modal = () =>{
  
// }


//컴포넌트 쓰기 좋을떄
//1. 반복적인 html 축약할때
//2. 큰 페이지들
//3. 자주 변경되는 것들  

// state 가져다쓸떄 문제가 생김 
// A함수에서 정의한 state를 B함수에서 쓸 수 없음 

//[동적인 UI 만들기]
//1. html css로 미리 디자인 완성
// 2. UI의 현재 상태를 state로 저장
// 3.sate에 따라 UI가 어떻게 보일지 작성
export default App;
