import React, { Component,useState, createContext, useContext } from 'react'

const CountContext = createContext();

// 子组件Consumer
class CountSonConsumer extends Component{
    render(){
        return(
            <CountContext.Consumer>
                {
                    count => <h1>{count}</h1>
                }
            </CountContext.Consumer>
        )
    }
}

// 子组件ContextType
class CountSonContextType extends Component{
    static contextType = CountContext;
    render(){
        const count = this.context;
        return(
            <h1>{count}</h1>
        )
    }
}

// 子组件hooks（最优！！！）
function CountHooks () {
    const count = useContext(CountContext);
    return(
        <h1>{count}</h1>
    )
}

// 父组件Provider
function Count() {
    const [count, setCount] = useState(8);
    return(
        <div>
            <button  type="button" onClick={()=>{setCount(count+1)}}>
                Click({count})
            </button>
            <CountContext.Provider value={count}>
                <CountSonConsumer />
                <CountSonContextType />
                <CountHooks />
            </CountContext.Provider>
        </div>
    )

}

export default Count;