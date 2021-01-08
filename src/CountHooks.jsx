/* 
* 学习memo useMemo useCallback 
* 学习useRef ==> 如何使用？ ==> useRef要用在类组件、 countRef.current拿到组件 
* 自定义HOOKS ==> 写了哪些自定义hooks函数 ==> useNum useSize
*
*/

import React, { useState, useMemo, memo, useCallback, useRef, PureComponent, useEffect } from 'react'

const Count = (props) => {
    const size = useSize();
    return(
        <h1>{props.count}; size:{size.width}x{size.height}</h1>
    )
}

// 使用memo的组件
const CountMemo = memo(function CountMemo(props) {
    console.log('Counter render')
    return (
        <h1>CountMemo: {props.count}</h1>
    )
})

//使用useRef的组件 useRef要用在类组件
class CountRef extends PureComponent {
    speak() {
        console.log(`now count is ${this.props.count}`)
    }
    render() {
        return (
            <h1 onClick={this.props.onClick}>CountRef: {this.props.count}</h1>
        )
    }
}

// 写一个自定义HOOKS函数 useNum (和函数组件很像,只有输入输出不同)
function useNum(defaultCount) {
    const [num, setNum] = useState(defaultCount);
    // 自定义hook的返回值模仿useState返回一个数组[]
    return [num, setNum]
}

// 写一个自定义HOOKS函数 useSize 
function useSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    },[])

    useEffect(() => {
        window.document.addEventListener('resize', onResize, false)
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [])
    return size;
}

function Counter() {
    const [count, setCount] = useState(0);

    // 使用自定义的hook函数 useNum
    const [num, setNum] = useNum(22)

    // 使用自定义的hook函数 useSize
    const size = useSize();

    // useMemo
    const double = useMemo(() => {
        return count * 2
    }, [count])
    // const clickEvent = useMemo(() => {
    //     console.log('click了H1')
    // },[])

    // useCallback
    const clickEvent = useCallback(() => {
        console.log('click了H1')
    }, [])

    // useRef
    const countRef = useRef();
    const clickCountRef = useCallback(() => {
        // console.log(countRef.current)
        countRef.current.speak()
    }, [countRef])

    return (
        <div>
            <button type="button" onClick={() => { setCount(count + 1) }} onMouseMove={() => { setNum(num + 1) }}>Click:count是{count}   num是{num}   double:{double} size:{size.width}x{size.height}</button>
            <Count count={count}/>
            <CountMemo count={double} onClick={clickEvent} />
            <CountRef ref={countRef} onClick={clickCountRef} count={double} />
        </div>
    )
}

export default Counter;