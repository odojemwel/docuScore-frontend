import { createContext, Dispatch, useEffect, useState } from "react"

type class_ = {
  classId: number,
  subject: String,
  yearLevel: number,
  section: String,
  deleted: boolean,
}



export const DashboardContext = createContext<{
  classes: class_[],
  setClasses: Dispatch<React.SetStateAction<class_[]>>,
  inactiveClasses: class_[],
  setInactiveClasses: Dispatch<React.SetStateAction<class_[]>>
} | null>(null);

export default function DashboardProvider(props: { children: React.ReactNode }) {

  const [classes, setClasses] = useState<class_[]>([]);
  const [inactiveClasses, setInactiveClasses] = useState<class_[]>([]);




  return (
    <DashboardContext.Provider value={{ classes, setClasses, inactiveClasses, setInactiveClasses }}>
      {props.children}
    </DashboardContext.Provider>
  )
}
