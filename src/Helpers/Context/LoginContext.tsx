import React, { createContext, Dispatch, useEffect, useState } from 'react'

export type teacher = {
  teacherId?: number,
  employeeId: String,
  firstName: String,
  lastName: String,
  password?: String,
}

export const LoginContext = createContext<{
  loggedIn: teacher,
  setLoggedIn: Dispatch<React.SetStateAction<teacher>>,
} | null>(null)

export default function LoginProvider(props: { children: React.ReactNode }) {

  const [loggedIn, setLoggedIn] = useState<teacher>({} as teacher);

  useEffect(() => {
    setLoggedIn(
      {
        teacherId: parseInt(localStorage.getItem("teacherId")!),
        employeeId: localStorage.getItem("employeeId")!,
        firstName: localStorage.getItem("firstName")!,
        lastName: localStorage.getItem("lastName")!,
      }
    )
  }, [])
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {props.children}
    </LoginContext.Provider>
  )
}
