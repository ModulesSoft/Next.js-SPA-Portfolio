import { createContext, useContext, useState } from "react";


export const SessionContext = createContext({})
export const SessionContextUpdate = createContext()

export function useUser() {
  return useContext(SessionContext);
}
export function useUpdateUser() {
  return useContext(SessionContextUpdate);
}
export function SessionProvider({ children }) {
  const [user, setUser] = useState({});


  function updateUser(newUser) {
    setUser(newUser)
  }
  return (
    <>
      <SessionContext.Provider value={user}>
        <SessionContextUpdate.Provider value={updateUser}>
          {children}
        </SessionContextUpdate.Provider>
      </SessionContext.Provider>
    </>
  )
}