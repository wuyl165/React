import React, { Component, lazy, Suspense } from 'react'
// import logo from './logo.svg'
import './App.css'
import Count from './Count.jsx'
import CountHooks from './CountHooks.jsx'
const Add = lazy(() => import(/*webpackChunkName:"about"*/'./Add.jsx'))
// ErrorBoundary
// componentDidCatch
class App extends Component {
    state = {
        hasError:false
    };
    static getDerivedStateFromError(){
        return{
            hasError:true,
        }
    }
    // componentDidCatch(){
    //     this.setState({
    //         hasError:true,
    //     })
    // }
  render() {
      if(this.state.hasError){
          return<div>Error</div>
      }
    return (
      <div>
          <CountHooks />
          {/* <Count></Count> */}
        {/* <Suspense fallback = {<div>loading</div>}>
          <Add defaultCount={2}></Add>
        </Suspense> */}
      </div>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   )
// }

export default App
