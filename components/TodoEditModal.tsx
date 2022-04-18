import { useState } from 'react'
import { ITodo } from '../models/Todos'

interface Props {
  todoText: string
  showModal: (show: boolean) => void
  updateTodoText: (newText: string) => void
}

const TodoEditModal = ({ todoText, showModal, updateTodoText }: Props): any => {
    const [text, setText] = useState<string>(todoText)

    return (
        <>
        <input value={text} onChange={(e) => setText(e.target.value)}></input>
        <button onClick={(e) => showModal(false)}>Cancel</button>
        <button onClick={(e) => {updateTodoText(text), showModal(false)}}>Submit</button>
        </>
    )
}

export default TodoEditModal