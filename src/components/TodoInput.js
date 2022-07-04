import { useState } from 'react';

function TodoInput({ addTodo }) {

  const [value, setValue] = useState("123");
  
  return (
    <>
      <input type="text" value={value} onChange={e=> setValue(e.target.value)}/>
      <input type="button" value="儲存" onClick={()=> addTodo(value)} />
    </>
  );
}

export default TodoInput;
