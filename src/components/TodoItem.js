

function TodoItem({tabStatus,todo,delTodo,editTodo, toggleTodo}) {

const {id, content, completed_at} = todo;

function displayItem () {
  console.log(id, content, completed_at);
  const checked = completed_at !== null ? "checked" : "";


  return (
    <>
      <li>
    
        {content}
        <p>
        {id}
        </p>
        <input type="checkbox" value="toggle" 
        onChange={()=>{toggleTodo(id)}}
        checked={checked}
        />
        <input type="button" value="編輯" onClick={()=>{editTodo(id)}}/>
        <input type="button" value="刪除" onClick={()=>{delTodo(id)}}/>
      </li>
    </>
  );
}


// 已完成的條件、把未完成的資料踢出去
// 已完成的條件 
// isDoneTab === true
// completed_at === true
// if(isDoneTab && !completed_at) {
//   return null;
// }

console.log('tabStatus',tabStatus, 'completed_at',completed_at)

// const tabStatus = isDoneTab ? 'completed' : 'active';
const itemStatus =  completed_at ? 'completed' : 'active';
// console.log(':::', completed_at==true)
if (tabStatus === 'all') {
  // 全部
  return displayItem()
  
}else if(tabStatus==='completed' && itemStatus==='completed'){
  // 已完成
  return displayItem()
  
  // return (
  //   <>
  //     <li
  //     style={{
  //       textDecoration: completed_at ? 'line-through' : 'none',
  //     }}
  //   >
  //       {content}
  //       <p>
  //       {id}
  //       </p>
  //       <input type="checkbox" value="toggle" 
  //       onChange={()=>{toggleTodo(id)}}
  //       />
  //       <input type="button" value="編輯" onClick={()=>{editTodo(id)}}/>
  //       <input type="button" value="刪除" onClick={()=>{delTodo(id)}}/>
  //     </li>
  //   </>
  // );
} else if(tabStatus==='active' && itemStatus==='active'){
  // 未完成
// if(tabStatus===false && completed_at===null){
  return displayItem()

  // return (
  //   <>
  //      <li
  //     style={{
  //       textDecoration: completed_at ? 'line-through' : 'none',
  //     }}
  //   >
  //       {content}
  //       <p>
  //       {id}
  //       </p>
  //       <input type="checkbox" value="toggle" 
  //       onChange={()=>{toggleTodo(id)}}
  //       />
  //       <input type="button" value="編輯" onClick={()=>{editTodo(id)}}/>
  //       <input type="button" value="刪除" onClick={()=>{delTodo(id)}}/>
  //     </li>
  //   </>
  // );
}  

}

  
// }

export default TodoItem;
