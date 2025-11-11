import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", isComplete: false },
    { id: 1, content: "코딩 공부하기", isComplete: false },
    { id: 2, content: "잠 자기", isComplete: false },
  ]);

  return (
    <>
      <Header />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>할일 리스트</h1>
    </header>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="add_wrap">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [inputFlag, setInputFlag] = useState(false);
  function editFuc() {
    if (inputFlag) {
      if (inputValue.length > 0) {
        setTodoList((prev) =>
          prev.map((el) =>
            el.id === todo.id ? { ...el, content: inputValue } : el
          )
        );
      }
      setInputValue("");
      setInputFlag(false);
    } else {
      setInputFlag(true);
    }
  }
  function completeTodo() {
    setTodoList((prev) =>
      prev.map((el) => {
        return el.id === todo.id ? { ...el, isComplete: !el.isComplete } : el;
      })
    );
  }
  return (
    <li className={`todo_list_item ${todo.isComplete ? "complete" : ""}`}>
      <div className="todo_text">{todo.content}</div>
      {inputFlag && (
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      )}

      <div className="btn_wrap">
        <button onClick={editFuc} disabled={todo.isComplete}>
          수정
        </button>
        <button
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id);
            });
          }}
          disabled={todo.isComplete}
        >
          삭제
        </button>
        <button type="button" onClick={completeTodo}>
          {todo.isComplete ? "취소" : "완료"}
        </button>
      </div>
    </li>
  );
}

export default App;
