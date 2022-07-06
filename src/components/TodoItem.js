function TodoItem({todo,delTodo}) {
const {id, content} = todo;

  return (
    <>
      <li>
        {content}
        <p>
        {id}
        </p>
        <input type="button" value="XX" onClick={()=>{delTodo(id)}}/>
      </li>
    </>
  );
}

export default TodoItem;
