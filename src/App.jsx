import './Components/CSS/Todo.css'
import { useState,useRef,useEffect } from 'react'
import './Components/CSS/TodoItems.css'
import tick from './Components/Assets/tick.png'
import not_tick from './Components/Assets/not_tick.png';
import cross from './Components/Assets/cross.png';

let count = 0;

const TodoItems = ({no,display,text,setTodos}) => {

const deleteTodo = (no) =>{
  let data = JSON.parse(localStorage.getItem("todos")); //unsure what this arrow function does
  data = data.filter((word) => word.no !== no);
  setTodos(data);
}

  const toggle = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));

    console.log(`toggle input no: ${no}`);

    console.log(`toggle todos: ${localStorage.getItem("todos")} `)
    let m = data[0].no
    console.log(typeof(m));
    console.log(`toggle data: ${data[0].text} AND ${data[0].no}`)

    for(let i = 0; i < data.length;i++){

        if (data[i].no === no) {


          if (data[i].display==="") {           //what is data[i]? What is JSON.parse?
            data[i].display = "line-through";
          } 
          
          else {
            data[i].display = "";
          }


          break;
        }

    }
        setTodos(data);
      }


      //todoitems-container
      // <div className="todoitems-container highlight prioritize" >

      // </div>

  return (
    <div className='todoitems'>

      <div className={`todoitems-container ${display}`} onClick={()=>{toggle(no)}}>
        {display===""?<img src={not_tick} alt="" />:<img src={tick} alt="" /> }
        <div className="todoitems-text">{text}</div>
      </div>

      <img className='todoitems-cross-icon' onClick={()=>{deleteTodo(no)}} src={cross} alt=""/>
    </div>
  )
}

const ToDo = () => {

  const [todos,setTodos] = useState([]);  //two items in the const function? what do they represent?
  const inputRef = useRef(null);
 
  
  const add = () => {
    setTodos([...todos,{no:count++,text: inputRef.current.value,display:""}]) //.. -- ask AI what this line means?
    inputRef.current.value = "";
    localStorage.setItem("todos_count",count)
  }

useEffect(()=>{
  setTodos(JSON.parse(localStorage.getItem("todos")))
  count = localStorage.getItem("todos_count");
},[])

useEffect(()=>{
  setTimeout(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, 100);
},[todos])


console.log(`BEFORE RETURN STATEMENT: ${JSON.stringify(todos[0].no)}`);
  return (
    <div className='todo'>
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
            <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input'/>
            <div onClick={()=>{add()}}className="todo-add-btn">ADD</div>
            </div>
            <div className="todo-list">
              {
                console.log(`BEFORE MAP: ${JSON.stringify(todos[0].no)}`)
              }
              {
      
              todos.map((item,index)=>{
                console.log(item)
                console.log(item.no)
                // console.log(`${item.number}: ${item.text}`);
                    return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/>
              })}
            </div>
        </div>
  )
}

const App = () => {

  return (
    <div>
      <ToDo/>   
    </div>
  )
}

export default App