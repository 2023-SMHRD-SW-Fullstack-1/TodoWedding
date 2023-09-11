import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";


/*
 * Todo 
 * 작성자 : 양수진
 * 작성일 : 2023.09.04
 */

const style = {
    li: `flex justify-between p-4 my-2 capitalize border-b`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`,
};

const Todo = ({ todolistContents, deleteTodo, toggleComplete }) => {
    // const [isChecked, setIsChecked] = useState(false);
    // const [isCheckedValue, setIsCheckedValue] = useState("N");

    // const completedTodolist = () => {
    //     setIsChecked(!isChecked);
    //     toggleComplete();


    const [isChecked, setIsChecked] = useState(todolistContents.completed);
    const [isCheckedValue, setIsCheckedValue] = useState(todolistContents.completed ? "Y" : "N" );
  
    const completedTodolist = () => {
      setIsChecked(!isChecked);
      setIsCheckedValue(isChecked ? "N" : "Y");
      toggleComplete();
    };



    useEffect(() => {
        console.log("todolistContents", todolistContents.todolistSeq);
      }, []);

    //여기까지 코드수정중  

    // useEffect(() => {
    //     setIsCheckedValue(isChecked === false ? "N" : "Y");
    // }, [isChecked]);

    // useEffect(() => {
    //     console.log(isCheckedValue);
    // }, [isCheckedValue]);



    
    // 3 Backend [check_Todolist]
    //  투두리스트 체크했을 때 실행되는 메서드
    // const toggleComplete = async () => {
    //     console.log("check_실행");
    //     const data = {
    //         todolistCompleted: isCheckedValue,
    //         todolistSeq: todolistContents.todolistSeq,
    //         memberSeq: todolistContents.memberSeq,
    //     };
    //     try {
    //         await axios.put(`http://localhost:8085/todolist/check`, data); //`http://localhost:8085/todolist/${memberSeq}/${todo.todolistSeq}`, data
    //         console.log("성공 checked ");
    //     } catch (err) {
    //         console.error("Error checked: ", err);
    //     }
    // };

    useEffect(() => {
        console.log("todolistContents", todolistContents.todolistSeq);
    }, []);

    return (
        <li className={todolistContents.completed ? style.liComplete : style.li}>
            <div className={style.row}>
                {/* <input onChange={() => toggleComplete(todolistContents)} type="checkbox" checked={todolistContents.completed ? 'checked' : ''} /> */}
                <input onChange={completedTodolist} type="checkbox" checked={isChecked} onClick={()=>toggleComplete(todolistContents.todolistSeq, todolistContents.todolist_completed)}/>
                <p
                    // onClick={() => toggleComplete(todolistContents)}
                    className={todolistContents.completed ? style.textComplete : style.text}
                >
                    {todolistContents.todolistContents}
                </p>
                <hr />
            </div>
            <button onClick={() => deleteTodo(todolistContents.todolistSeq)} className="trashBtn">{<FaRegTrashAlt />}</button>
            <button></button>
        </li>
    );
};

export default Todo;
