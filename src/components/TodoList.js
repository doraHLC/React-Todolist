import { useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const initData = {
  todos: [
    {
      id: "363f2fe36d181a4bfda3c7be1b0df835",
      content: "<string3>",
      completed_at: null,
    },
    {
      id: "bd6242f888d976b46d69461e54222d13",
      content: "<string3>",
      completed_at: null,
    },
    {
      id: "8c38901284d657632ab688ee146e7bdb",
      content: "<string3>",
      completed_at: null,
    },
    {
      id: "5b0c7a023472d39f314adb0a05b2e045",
      content: "<string3>",
      completed_at: null,
    },
    {
      id: "6d980f973170d751821c11f4434782c0",
      content: "<string3>",
      completed_at: null,
    },
  ],
};

function TodoList() {
  const [todos, setTodos] = useState(initData.todos);
  console.log('todos:::', todos);


  const addTodo = (todo) => setTodos([...todos,{
    id: '',
    content: todo,
    completed_at: null,
  }])

  return (
    <main>
      <h2>TodoList</h2>
      <TodoInput addTodo={addTodo} />

      <ul>
        {
          todos.map((todo, i) => {
            console.log('map:', todo);
            return (
              <TodoItem key={i} todo={todo} />


              // <TodoItem key={i} content={todo.content} id={todo.id}/>
              // <TodoItem key={i} content={todo.content}/>
              // <TodoItem key={i} content={todos[i].content}/>
            )
          })
        }
      </ul>

      {/* #NOTE: EMMET-JSX */}

    </main>
  );
}

export default TodoList;
