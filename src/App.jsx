import { useEffect, useState } from "react";

export function TodoComponent(){
 

  const [name, setName] = useState("");
  const [editID, setEdit] = useState(0);

  const handleChange = (e) => {
    setName (e.target.value)
  };


  const [todos, setTodos] = useState (() => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [

  ]; 
});
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);


function handleEdit (id) {
  const editTask = todos.find((todo) => todo.id === id);
  if (!editTask) return;
  setName(editTask.name);
  setEdit(id);
}

const handleCancelEdit = () => {
  setName("");
  setEdit(0);
};

const handleAdd = (e) => { 
  e.preventDefault();
  if (!name.trim()) return;

  if (editID) {
    setTodos(todos.map((todo) =>
      todo.id === editID ? { ...todo, name: name.trim() } : todo
    ));
    setName("");
    setEdit(0);
    return;
  }

  const newTodo = { name:name.trim(), id: Date.now() };
  setTodos ([...todos, newTodo]);
  setName("");
  
};

const handleDelete = (idToDelete) => { 
  const newDelete = todos.filter(todo => todo.id !== idToDelete);
  setTodos(newDelete);
  if (idToDelete === editID) {
    setName("");
    setEdit(0);
  }
};
  
    return (
      
      <div>
        <form onSubmit={handleAdd}>
        <h1 style={{fontSize: '40px'}}>MY Todo-App</h1>
        <input 
        className="custom-input" 
        type="text"
        onChange  = {handleChange}
        value={name}
        placeholder="Enter To-do"
        />
      
        <button
        className="btn"
        type="submit"
        disabled={!name.trim()}>
        {editID ? "Save" : "Add"}
        </button>
        {editID !== 0 && (
          <button
            className="btn"
            type="button"
            onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>


        <div className="Main" >
          {todos.map((todo) => (
          <div key={todo.id} className="todo-row">
            <h5 className="todo-content">
              <span className="todo-name">Todo: {todo.name}</span>
              <span className="todo-actions">
                <button className="delete-btn" type="button" onClick={() => handleDelete(todo.id)}>Delete</button>
                <button className="edit-btn" type="button" onClick={() => handleEdit(todo.id)}>Edit</button>
              </span>
              <span className="todo-id">ID: {todo.id}</span>
            </h5>
          </div>  
        ))}
    </div>
      </div>
    );
   


  
}


 
