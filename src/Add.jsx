import React, { Component, useState, useEffect } from 'react';

// 类组件
// export default class Add extends Component {
//     state = {
//         count: 0,
//     };
//     render() {
//         const { count } = this.state;
//         return (
//             <button type="button" onClick={() => { this.setState({ count: count + 1 }) }}>
//                 Click({count})
//             </button>
//         )
//     }
// }

// HOOKS组件
function Add(props) {
    // const [count, setCount] = useState(0);
    // useState中传入的方法只在组件第一次渲染时执行，即只执行一次
    const [count, setCount] = useState(() => {
        return props.defaultCount || 0;
    });

    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', onResize, false)
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [])

    useEffect(() => {
        document.title = count;
    })
    // 只有数组中的count变化才会执行打印，resize不会出发打印
    useEffect(() => {
        console.log('count', count);
    }, [count])

    const onClick = () => {
        console.log('click');
    }

    // 一旦元素销毁重建，绑定的事件失效
    // useEffect(() => {
    //     document.querySelector('#size').addEventListener('click', onClick, false)
    // },[])

    // 解决办法： return一个清理函数
    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick, false)
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick, false)
        }
    })

    return (
        <div>
            <button type="button" onClick={() => { setCount(count + 1) }}>
                Click({count})
        </button>
            {//p标签偶数销毁，奇数重建
                count % 2 ? (<span id="size">size:{size.width} x {size.height}</span>) :
                    <p id="size">size:{size.width} x {size.height}</p>
            }
        </div>
    )
}

export default Add