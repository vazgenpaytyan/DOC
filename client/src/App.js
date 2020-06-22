import React, { useReducer } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import AddEmployee from './components/AddEmployee'
import { Admin, User } from './models/role'
import DocumentPreview from './components/DocumentPreview'
import Tree from './components/Tree'

export const FileContext = React.createContext()

function App() {

  const structure = [
    {
      type: "folder",
      name: "src",

      childrens: [
        {
          type: "folder",
          name: "Components",
          childrens: [
            { id: 2, type: "file", name: "Modal.js" },
            { id: 1, type: "file", name: "Modal.cs" }
          ]
        },
        { id: 1, type: "file", name: "index.js" },
        { id: 2, type: "file", name: "index.html" }
      ]
    },
    { id: 6, type: "file", name: "package.xlsx" }
  ]

  const initialUser = {
    id: null,
    role: null,
    isLoggedIn: false,
    file: "ff"
  }

  const reducer = (state, action) => {
    switch (action) {
      case 1:
        return {
          ...state,
          file: "<h1 style='padding:20px;'> Data 1 </h1>"
        }
      case 2:
        return {
          ...state,
          file: "<h2 style='padding:20px;'> Data 2 </h2>"
        }
      default:
        return {
          ...state,
          id: 4,
          role: Admin,
          isLoggedIn: true,
          file: "<h2 style='padding:20px;'> No Data</h2>"
        }

    }
  }

  const [user, dispatch] = useReducer(reducer, initialUser)

  if (!user.id) {
    dispatch()
  }
  const { id, role, isLoggedIn, file } = user
  return (
    <div className="App">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {
              !isLoggedIn ?
                <>
                  <Login />
                  <Register />
                </> :
                <>
                  {role === Admin ? <AddEmployee /> : null}
                  <Logout />
                </>
            }
          </ul>
        </div>
      </nav>
      <div className="d-flex flex-row">
        <FileContext.Provider value={{ fileState: file, fileDispatch: dispatch }}>
          <Tree data={structure} />
          <DocumentPreview file={file} />
        </FileContext.Provider>
      </div>
    </div>
  )
}

export default App;
