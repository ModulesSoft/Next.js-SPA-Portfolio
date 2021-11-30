import { createContext, useContext, useState } from "react";
import checkAuth from "lib/checkAuth"

export let SessionContext = createContext({})
export const SessionContextUpdate = createContext()

export function useUser() {
  // let session = useContext(SessionContext)
  // let newSession = checkAuth(session);
  // return newSession?useContext(newSession):session
  return useContext(SessionContext)
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