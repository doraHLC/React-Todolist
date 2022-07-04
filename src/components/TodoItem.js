function TodoItem({todo}) {
const {id, content} = todo;
  return (
    <>
      <li>
        {content}
        <p>
          
        {id}
        </p>
      </li>
    </>
  );
}

export default TodoItem;
