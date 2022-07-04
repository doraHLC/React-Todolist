function TodoItem(props) {
const {id, content} = props;
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
