import { ITodo } from "../models/Todos";

export const GetTodoListAPI = async () => {
  try {
    const fetchedTodoList = await fetch(
      "http://52.23.91.250:8080/api/todos",
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
      "http://52.23.91.250:8080/api/todos",
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
        const fetchedTodoUpdate = await fetch(`http://52.23.91.250:8080/api/todos/${todo.id}`, {
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
        const fetchedTodoDelete = await fetch(`http://52.23.91.250:8080/api/todos/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
    }
    catch(e){
        console.log(e)
    }
}