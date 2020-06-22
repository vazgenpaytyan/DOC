import React, { useContext } from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import styled from 'styled-components'
import FILE_ICONS from './FileIcons';
import { FileContext } from '../App'

const StyledFile = styled.div`
  padding-left: 15px;

  
  border-radius: 8px;
  border: solid 1px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`

function File({ id, name }) {
  const fileContext = useContext(FileContext)
  let ext = name.split('.')[1];
  return (
    <div onClick={() => fileContext.fileDispatch(id)} key={name}>
      <StyledFile>
        <a style={{ color: "#a57373" }} href={`/files/${id}`} target="_blank">
          {FILE_ICONS[ext] || <AiOutlineFile />}
          <span>{name}</span>
        </a>
      </StyledFile>
    </div>
  )
}

export default File