import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { Link } from "react-router-dom";
import axios from "axios";

/*
 * Todolist (추가/삭제/전체조회:완료), (완료-미완료 개수조회 /수정 :기능수정)
 * 작성자 : 양수진
 * 작성일 : 2023.09.08
 */


const style = {
    bg: `bg-gradient-to-r from-[#F9FAFB] to-[#F9FAFB]`,
    container: `max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-greay-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    count: `text-center p-2`,
};

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [isChecked, setIsChecked] = useState('N'); // 체크 여부 상태 
   
    // 추가코드 [09-08]
    const [inProgressCnt , setInprogressCnt] = useState(0) // 진행 항목 개수
    const [completeCnt , setCompleteCnt] = useState(0) // 완료된 항목 갯수 

    const memberSeq = 123456789;

    
  // 완료 - 미완료 개수 조회
  useEffect(() =>{
     fetchDataAndCount();
  }, [])

    // GET : axios.get(url)
    // POST : axios.post(url, data)
    // PUT : axios.put(url, data)
    // DELETE : axios.delete(url)

    // axios 구조 : axios.get('url')
    // .then((res)=>{
    //       console.log("response : ", res.data);
    //       어떤식 데이터를 받는지 확인 후 내가 뭘 필요하는가를 생각해본 뒤 프론트(화면 혹은 변수로 지정)
    // }).catch((err)=>{
    //       console.log("error : ", err)
    // })

    // 1.투두리스트 추가 메서드
    const createTodo = async (e) => {
        e.preventDefault(e);
        console.log("실행", input);
        if (input === "") {
            alert("please enter a valid todo");
            return;
        }

        // boot에서 쓰는 dto참조해서 가져오기
        const data = {
            todolistContents: input,
            memberSeq: 123456789,
        };

        //backend axios통신
        await axios
            .post("http://localhost:8085/todolist", data)
            .then((res) => {
                console.log("response : ", res);
                fetchData();
            })
            .catch((err) => {
                console.log("error", err);
            });
    };

    // 2.전체 투두리스트 조회
    // useEffect(() => {
    //     const fetchDataAndCout = async () => {
    //         await fetchData();
    //         cntTodoList();  //수정
    //     }

    //     fetchDataAndCout();
    // }, []);
        const fetchDataAndCout = () => {
            fetchData();
            cntTodoList();  //수정
        }

        useEffect(() => {
            fetchDataAndCout();
        }, []);

    // 3. 투두리스트 체크했을 때 실행되는 메서드 ---> (현재 Todo.jsx에 넣어둠)
    const toggleComplete = async (todo, check) => {
        console.log("wqrqwrwqr")
        console.log(check)
        //const updatedTodo = { ...todo, todolistCompleted: !todo.todolistCompleted }; // 완료 여부 반전
        const a = check == 'N' ? 'Y' : 'N'

        const data = {
            todolistCompleted: a, // Y,N이냐 여부 
            todolistSeq: todo, // 투두번호
            memberSeq: memberSeq, // 멤버번호 
        };
   
        try {
            await axios.put(`http://localhost:8085/todolist/check`, data); //`http://localhost:8085/todolist/${memberSeq}/${todo.todolistSeq}`, data
            console.log("성공 checked ");
            fetchDataAndCout()
            
            let b= todos.filter((aa)=>aa.todolist_completed=='Y')
                console.log(b.length)
        } catch (err) {
            console.error("Error checked: ", err);
        }

        
        // try {
        //     await axios.put(`http://localhost:8085/todolist/${todo.todolistSeq}`, updatedTodo);
        //     console.log("성공 checked");
        //     fetchDataAndCount(); // 투두리스트와 개수 다시 조회
        // } catch (err) {
        //     console.error("Error checked: ", err);
        // }
    };

    

    // 삭제 실행 메서드 변경 코드
    const deleteTodo = async (todolistSeq) => {
        try {
            console.log("투두리스트 삭제 실행, todolistSeq : ", todolistSeq);
            const response = await axios.delete(`http://localhost:8085/todolist/${todolistSeq}`);
            console.log("deleteTodolist 삭제성공 response : ", response.data);
            // 화면에서 삭제 시각적인 효과 적용
            response.data === 1 &&
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.todolistSeq !== todolistSeq));
        } catch (err) {
            console.error("delete 삭제 error : ", err);
        }
    };

    //전체 투두리스트 조회 메서드
    const fetchData = () => {
        try {
            axios
                .get(`http://localhost:8085/todolist/${memberSeq}`) //`http://localhost:8085/todolist/${memberSeq}`
                .then((res) => {
                    console.log("findallTodolist 조회 response : ", res.data);
                    setTodos(res.data);
                })
                .catch((err) => {
                    console.log("findallTodolist 조회 error : ", err);
                });
        } catch (error) {
            console.error("Error", error);
        }
    };

    //완료, 미완료 건수 조회하기 

    const [completedCnt, setCompletedCnt] = useState()

    const cntTodoList = () => {
        try{
            axios.get(`http://localhost:8085/count-of-todolist/${memberSeq}`)
            .then((res)=>{
                console.log("cntTodoList response", res.data);
                setCompletedCnt(res.data[1].count)
            })
            .catch((err)=>{
                console.log("axios arr : ", err);
            })
        }catch(err){
            console.log("cntTodoList err : ",  err);
        }
    }





  // 전체 투두리스트 조회 및 진행중인 항목과 완료된 갯수 cnt 

  const fetchDataAndCount = async () => {
     try {
        const response = await axios.get(`http://localhost:8085/todolist/${memberSeq}`)
        console.log("findallTodolist 조회 res :", response.data);
        setTodos(response.data)

        let inProgressCount = 0;
        let completedCount = 0;

         for (const todo of response.data) {
            if (todo.todolist_completed === "N") {
                inProgressCount++;
            } else if (todo.todolist_completed === "Y") {
                completedCount++;
            }
         }

         setInprogressCnt(inProgressCount);
         setCompletedCnt(completedCount);

     } catch (error) {
        console.error("Error" , error);
     }
  }



    return (
        //html
        <div>
            <div className={style.container}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to="todowedding/calendar" style={{ marginRight: "30px" }}>
                        <span>Calendar</span>
                    </Link>
                    <Link to="todowedding/todolist" style={{ marginRight: "30px" }}>
                        <span>TodoList</span>
                    </Link>
                    <Link to="todowedding/budget" style={{ marginRight: "30px" }}>
                        <span>Budget</span>
                    </Link>
                </div>

                {/* 투두리스트 조회 (전체_진행_완료)  */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                {todos.length < 1 ? null : <span className={style.count}> {`전체 : ${todos.length}`}</span>}
                {todos.length < 1 ? null : <span className={style.count}> {`진행 : ${inProgressCnt}`}</span>}
                {todos.length < 1 ? null : <span className={style.count}> {`완료 : ${completedCnt}`}</span>}
                </div>

                <h3 className={style.heading}>Todo List</h3>
                <form onSubmit={createTodo} className={style.form}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={style.input}
                        type="text"
                        placeholder="내용을 기입하세요"
                    />
                    <button className={style.button}>
                        <AiOutlinePlus size={30} />
                    </button>
                </form>
                <ul>
                    {todos.map((todolistContents, index) => (
                        <Todo
                            key={index}
                            todolistContents={todolistContents}
                            toggleComplete={toggleComplete} // 투두체크 props처리 문제
                            deleteTodo={deleteTodo} 
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;