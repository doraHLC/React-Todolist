import { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);



// const initData = {
//   todos: [
//     {
//       id: "363f2fe36d181a4bfda3c7be1b0df835",
//       content: "<string3>",
//       completed_at: null,
//     },
//     {
//       id: "bd6242f888d976b46d69461e54222d13",
//       content: "<string3>",
//       completed_at: null,
//     },
//     {
//       id: "8c38901284d657632ab688ee146e7bdb",
//       content: "<string3>",
//       completed_at: null,
//     },
//     {
//       id: "5b0c7a023472d39f314adb0a05b2e045",
//       content: "<string3>",
//       completed_at: null,
//     },
//     {
//       id: "6d980f973170d751821c11f4434782c0",
//       content: "<string3>",
//       completed_at: null,
//     },
//   ],
// };
// const initData = {}

function TodoList() {
  const [todos, setTodos] = useState([]);
  console.log('todos:::', todos);

  const getTodo = () => {
    const _url = "https://todoo.5xcamp.us/todos";

    const token = localStorage.getItem('token');

    fetch(_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      // body: JSON.stringify({
      //     user: data.form
      // })
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        // console.log('59:', res.todos);
        setTodos(res.todos)
      })
  }

  useEffect(() => {
    getTodo()
  }, [])

  const addTodo = (todo) => {
    const _url = "https://todoo.5xcamp.us/todos";

    const token = localStorage.getItem('token');

    fetch(_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({
        "todo": {
          "content": todo
        }
      })
    })
      .then(res => {
        getTodo();
      })
    // setTodos([...todos,{
    //   id: '',
    //   content: todo,
    //   completed_at: null,
    // }])
  }

  const delTodo = (id) => {
    console.log(id);
    const _url = `https://todoo.5xcamp.us/todos/${id}`;

    const token = localStorage.getItem('token');

    fetch(_url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    })
      .then(res => {




        MySwal.fire({
          icon: "success",
          title: "刪除成功!"
        }).then(res => {
          getTodo();
        });
      })
  }
  return (
    <main>
      <h2>TodoList</h2>
      <TodoInput addTodo={addTodo} />

      <ul>
        {
          todos.map((todo, i) => {
            console.log('map:', todo);
            return (
              <TodoItem key={i} todo={todo} delTodo={delTodo} />


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
