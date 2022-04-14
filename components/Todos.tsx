import { ITodo } from "../models/Todos";
import styled from "styled-components";

interface Props {
  todos: ITodo[];
  updateTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
}

const Todos = ({ todos, updateTodo, deleteTodo }: Props): any => {
  todos.sort((a,b) => {
    if(a.completed === b.completed){
      return a.id - b.id
    }
    if(a.completed){
      return 1;
    }
    return -1;
  })
  return todos.map((todo, index) => {
    return (
      <TodoListItem key={index}>
        <TodoListItemInput
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            updateTodo(index);
          }}
        ></TodoListItemInput>
        <TodoListItemP
          style={{ textDecoration: todo.completed ? "line-through" : "" }}
        >
          {todo.description}
        </TodoListItemP>
        <TodoListItemButton
          onClick={(e) => {
            deleteTodo(index);
          }}
        >
          X
        </TodoListItemButton>
      </TodoListItem>
    );
  });
};

const TodoListItem = styled.li`
  list-style-type: none;
  width: 100%;
  display: flex;
  padding: 5px;
`;

const TodoListItemInput = styled.input`
  width: 5%;
  margin-top: 4px;
`;

const TodoListItemP = styled.p`
  width: 90%;
  font-size: 15px;
  text-align: left;
  color: #7fffd4;
  font-weight: 300;
  margin: 0px;
`;

const TodoListItemButton = styled.button`
  border: transparent;
  color: #e0ffff;
  font-weight: 700;
  border-radius: 7px;
  background: #e26a6a;
  width: 9%;
  max-height: 20px;
  height: 20px;
  width: 25px;
  line-height: 20px;
  box-sizing: border-box;
`;

export default Todos;
