import { ITodo } from "../models/Todos";

export const apiServer = "https://ringberg-todo-app.herokuapp.com/api/todos"


export const GetTodoListAPI = async () => {
  try {
    const fetchedTodoList = await fetch(
      `${apiServer}`,
      {
        method: "GET",
      }
    );

    return await fetchedTodoList.json();
  } catch (e) {
    console.log(encodeURIComponent);
  }
};

export const AddTodoAPI = async (todoDescription: string) => {
  try {
    const fetchedTodoAdd = await fetch(
      `${apiServer}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 1,
          completed: false,
          description: todoDescription,
        }),
      }
    )
    return await fetchedTodoAdd.json()
  } catch (e) {
    console.log(e)
  }
};

export const UpdateTodoAPI = async (todo: ITodo) => {
    try{
        const fetchedTodoUpdate = await fetch(`${apiServer}/${todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo),
        })
    }
    catch(e){
        console.log(e)
    }
}

export const DeleteTodoAPI = async (id: number) => {
    try{
        const fetchedTodoDelete = await fetch(`${apiServer}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
    }
    catch(e){
        console.log(e)
    }
}