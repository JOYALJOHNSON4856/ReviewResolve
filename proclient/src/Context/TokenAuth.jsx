import React, {  useState } from 'react'
import { createContext } from 'react'


export const tokenauthzz=createContext()


function TokenAuth({children}) {
    const[istokenauth,setistokenauth]=useState(false)
  return (
    <>
      <tokenauthzz.Provider value={{istokenauth,setistokenauth}}>
        {children}
      </tokenauthzz.Provider>
    </>
  )
}

export default TokenAuth
