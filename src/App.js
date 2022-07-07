import './App.css';
import Header from './component/Header';
import { Todos } from './component/Todos';
import { Footer } from './component/Footer';
import React, { useState, useEffect } from 'react';
import { AddTodos } from './component/AddTodos';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { About } from './component/About';

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = null;
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
    
  }
  const onDelete = (todo) => {
    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
  
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    <>
      <Router>
      <Header title="MyTodoList" searchBar={false} />
      <Routes>
          <Route exact path="/" element={
              <>
              <AddTodos addTodo={addTodo} />
              {console.log(todos)}
              <Todos todos={todos} onDelete={onDelete} />
              </>
            }>
          </Route>
          <Route exact path="/about" element={<About />}>
            
          </Route>
        </Routes>

      <Footer />
      </Router>
    </>
  );
}

export default App;
