//rsc 입력

import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

let YellowBtn = styled.button `
background : ${props => props.bg};
color : ${props => props.bg == 'blue'
    ? 'white'
    : 'black'};
padding :10 px;
`

let BlackBox = styled.div `
  background : grey;
  padding : 20px;
`
let copy = styled.button(YellowBtn) // 복사

const Detail = () => { //유저가 id에 입력한 값을 가져올 수 있다.

    const [visible, setVisible] = useState(true);
    // useEffect는 html렌더링 이후에 실행된다. 시간이 오래걸리는 작업들을 많이 쓴다. 서버에서 데이터 가져오는 것 등 timer
    // 등..
    useEffect(() => { //처음 실행될떄, update(재렌더링) 될떄 실행해준다.
        //  setTimeout (()=> {실행할코드}, 10000);
        setTimeout(() => {
            console.log("삭제")
            setVisible(false)
        }, 2000) //2초 이후에 div를 없애준다

    })

    let [count, setCount] = useState(0)

    const {state} = useLocation();
    // let {id} = useParams(); console.log(id)
    const item = state["items"]
    // console.log(state) console.log(item)
    return (
        <div className="container">
            <div
                style={visible
                    ? {
                        display: 'block'
                    }
                    : {
                        display: 'none'
                    }}
                className='alert alert-warning'>
                2초 이내 구매시 할인
            </div>
            {count}
            <button onClick={() => setCount(count + 1)}>버튼</button>
            <BlackBox>
                <YellowBtn bg="blue">버튼</YellowBtn>
                <YellowBtn bg="green">버튼</YellowBtn>
            </BlackBox>
            <div className="row">
                <div className="col-md-6">
                    <img src={item.img} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
};

export default Detail;