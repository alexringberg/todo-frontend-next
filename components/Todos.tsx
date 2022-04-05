import { ITodo } from "../models/Todos";
import styled from "styled-components";

interface Props {
  todos: ITodo[];
  updateTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
}

const Todos = ({ todos, updateTodo, deleteTodo }: Props): any => {
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
  align-items: center;
`;

const TodoListItemInput = styled.input`
  width: 10%;
  background-color: brown;
`;

const TodoListItemP = styled.p`
  width: 90%;
  font-size: 15px;
  text-align: left;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #FFFFFF;
`;

const TodoListItemButton = styled.button`
  border: transparent;
  color: #F5DDDD;
  font-weight: 800;
  border-radius: 5px;
  background: #BB86FC;
  width: 9%;
  max-height: 25px;
`;

export default Todos;
