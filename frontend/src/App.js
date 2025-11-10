import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/todos");
    setTodos(await res.json());
  };

  const addTodo = async () => {
    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    setText("");
    fetchTodos();
  };

  const updateTodo = async (id, newText) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText })
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo App</h2>
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input
              defaultValue={t.text}
              onBlur={(e)=>updateTodo(t.id,e.target.value)}
            />
            <button onClick={()=>deleteTodo(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
