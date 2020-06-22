import React, { useState } from 'react'
import { AiOutlineFolder } from 'react-icons/ai'
import styled from 'styled-components'
import useContextMenu from 'react-use-context-menu'

const StyledFolder = styled.div`
  padding-left: 15px;

  border-radius: 8px;
  border: solid 1px;
  .folder--label {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
`;
const Collapsible = styled.div`
  /* set the height depending on isOpen prop */
  height: ${p => (p.isOpen ? 'auto' : '0')};
  /* hide the excess content */
  overflow: hidden;
`;

function Folder({ name, children }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = e => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const [
    bindMenu,
    bindMenuItems,
    useContextTrigger
  ] = useContextMenu()
  const [bindTrigger] = useContextTrigger()

  return (
    <div >
      <StyledFolder {...bindTrigger}>
        <a href="#" onClick={handleToggle} className="folder--label">
          <AiOutlineFolder />
          <span>{name}</span>
        </a>
        <Collapsible isOpen={isOpen}>{children}</Collapsible>
      </StyledFolder>
      <div  >
        <nav  {...bindMenu}>
          <div key={1} style={{ backgroundColor: "#6c757d", color: "white" }} {...bindMenuItems}>First action</div>
          <div key={2} style={{ backgroundColor: "#6c757d", color: "white" }} {...bindMenuItems}>Second actionnnnn</div>
          <div key={3} style={{ backgroundColor: "#6c757d", color: "white" }} {...bindMenuItems}>Last action</div>
        </nav>
      </div>
    </div>
  )
}

export default Folder