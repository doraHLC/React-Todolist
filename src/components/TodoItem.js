function TodoItem({todo,delTodo,editTodo}) {
const {id, content} = todo;

  return (
    <>
      <li>
        {content}
        <p>
        {id}
        </p>
        <input type="button" value="編輯" onClick={()=>{editTodo(id)}}/>
        <input type="button" value="刪除" onClick={()=>{delTodo(id)}}/>
      </li>
    </>
  );
}

export default TodoItem;
