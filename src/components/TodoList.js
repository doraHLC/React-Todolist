import { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from './Context';

const MySwal = withReactContent(Swal);

function TodoList() {
  const { token, setToken } = useAuth();
  const [todos, setTodos] = useState([]);
  const [tabStatus, setTabStatus] = useState('all');
  console.log('todos:::', todos);

  const getTodo = () => {
    const _url = "https://todoo.5xcamp.us/todos";

    // const token = localStorage.getItem('token');

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

    // const token = localStorage.getItem('token');

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
  const editTodo = (id) =>{
    MySwal.fire({
      title: '輸入修改內容',
      input: 'text',
      inputLabel: '',
      showCancelButton: true,
      inputValidator: (value) => {
          if (!value) {
              return '沒有內容資訊'
          }
      }
    }).then(res=>{
        const _url = "https://todoo.5xcamp.us/todos/"+id;
        fetch(_url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          },
          body: JSON.stringify({
            "todo": {
              "content": res.value
            }
          })
        })
          .then(res => {
            getTodo();
          }).catch(err=>{
            console.log(err)
          }
          )
    })
  }

  const toggleTodo = (id)=> {
    console.log('toggle:', id)

    const _url = "https://todoo.5xcamp.us/todos/"+id+'/toggle';

    fetch(_url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      
    })
      .then(res => {
        getTodo();
      }).catch(err=>{
        console.log(err)
      }
      )
  }

  const delTodo = (id) => {
    console.log(id);
    const _url = `https://todoo.5xcamp.us/todos/${id}`;

    // const token = localStorage.getItem('token');

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

      <input type="button" value="ALL" onClick={()=>{
        setTabStatus('all')
        console.log(tabStatus)
        }}/>
      <input type="button" value="DONE" onClick={()=>{setTabStatus('completed')}}/>
      <input type="button" value="WIP" onClick={()=>{setTabStatus('active')}}/>


      <hr />

      <ul>
        {
          todos.map((todo, i) => {
            console.log('map:', todo);

            return (
              // <TodoItem key={i} todo={todo} delTodo={delTodo} editTodo={editTodo} toggleTodo={toggleTodo} />
              <TodoItem key={i} todo={todo} delTodo={delTodo} editTodo={editTodo} toggleTodo={toggleTodo} tabStatus={tabStatus}/>


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
