import { createContext, useState } from "react"

//import React from 'react'
export const addResponseContext =createContext({})
export const loginResponseContext = createContext({})
function ContextShare({children}) {

  const [addResponse,setAddResponse]=useState([])
  const[loginResponse,setLoginResponse] = useState(true)
  return (
    <>
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
      <loginResponseContext.Provider value={{loginResponse,setLoginResponse}}>
    {children}
    </loginResponseContext.Provider>
    </addResponseContext.Provider>
      
    </>
  )
}

export default ContextShare
