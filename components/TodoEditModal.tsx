import { useState } from 'react'
import styled from "styled-components"
import ContentEditable from 'react-contenteditable'

interface Props {
  show: boolean
  todoText: string
  showModal: (show: boolean) => void
  updateTodoText: (newText: string) => void
}

const TodoEditModal = ({ show, todoText, showModal, updateTodoText }: Props): any => {
    const [text, setText] = useState<string>(todoText)

    if(!show){
      return null
    }

    const handleSubmit = (text: string) => {
      updateTodoText(text)
      showModal(false)
      return
    }

    const handleCancel = () => {
      showModal(false)
      return
    }

    return (
        <Modal>
        <ContentEditable style={{color: "#7fffd4", textAlign:"center"}} html={text} disabled={false} onChange={(e: any) => setText(e.target.value)}></ContentEditable>
        <TodoEditButtonDiv>
          <TodoEditCancelButton onClick={(e) => showModal(false)}>Cancel</TodoEditCancelButton>
          <TodoEditSubmitButton onClick={(e) => {handleSubmit(text)}}>Submit</TodoEditSubmitButton>
        </TodoEditButtonDiv>
        </Modal>
    )
}

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -59%);
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0,0,0.04);
  align-items: center;
  background-color: #393f57;
  max-width: 360px;
  max-height: fit-content;
  min-width: 360px;
  min-height: 100px;
  padding: 15px;
`
const TodoListFormItem = styled.span`
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px 10px;
  width: 80%;
  margin-left: 10px;
  margin-bottom: 10px;
`
const TodoEditSubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: #000000;
  background-color: #ffa07a;
  font-weight: 600;
  margin-right: 5px;
  margin-bottom: 10px;
`

const TodoEditCancelButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: #000000;
  background-color: #ee4029;
  font-weight: 600;
  margin-right: 5px;
  margin-bottom: 10px;
`
const TodoEditButtonDiv = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`

export default TodoEditModal