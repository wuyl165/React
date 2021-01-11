/* 
* 完成一个TODOLIST *用hooks不用redux 
*/

import React, { useEffect, useState, memo, useRef, useCallback } from 'react'
import './App.css'

let idSeq = Date.now();
// 输入区：键入所有的代办
const Control = memo((props) => {
    const { addTodo } = props;
    const inputRef = useRef();
    const onSubmit = e => {
        e.preventDefault();
        const newText = inputRef.current.value.trim();
        if (newText.length === 0) return
        addTodo({
            id: ++idSeq,
            text: newText,
            complete: false,
        });
        inputRef.current.value = '';
    }
    return (
        <div className="control">
            <h1>todolist</h1>
            <form onSubmit={onSubmit}>
                <input type="text" className="new-todo" ref={inputRef} placeholder="What needs to bo done?" />
            </form>
        </div>
    )

})

const TodoItem = memo((props)  => {
    const { todo: { id, text, complete }, toggleTodo, removeTodo } = props;
    const onChange = () => {
        toggleTodo(id);
    }

    const removeClick = () => {
        removeTodo(id);
    }
    return (
        <li className="todo-item">
            <input
                type="checkbox"
                onChange={onChange}
                checked={complete} />
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={removeClick}>delete</button>
        </li>
    )
})

// 列表区：展示所有的代办
const Todos = memo((props) => {
    const { todos, toggleTodo, removeTodo } = props;
    return (
        <ul>
            {
                todos.map(todo => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                        />
                    )
                })
            }
        </ul>
    )
})

const LS_KEY = '$-todo_'
// 父组件
function TodoList() {
    const [todos, setTodos] = useState([])

    const addTodo = useCallback((todo) => {
        setTodos(todos => [...todos, todo])
    }, [])
    const removeTodo = useCallback((id) => {
        setTodos(todos => todos.filter(todo => {
            return todo.id !== id;
        }))
    }, [])
    const toggleTodo = useCallback((id) => {
        setTodos(todos => todos.map(todo => {
            return todo.id === id ? { ...todo, complete: !todo.complete, } : todo;
        }))
    }, []);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
        setTodos(todos)
    }, [])
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos))
    }, [todos])
    return (
        <div className="todo-list">
            <Control addTodo={addTodo} />
            <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}
            />
        </div>
    )
}

export default TodoList;