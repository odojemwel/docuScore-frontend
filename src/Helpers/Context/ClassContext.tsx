import React, { createContext, Dispatch, useState } from 'react'

export type class_ = {
  classId?: number,
  subject: String,
  section: String,
  yearLevel: number,
  deleted?: false | boolean,
}

export type student = {
  studentId?: number,
  studSchoolId: String,
  classNumber: number,
  firstName: String,
  lastName: String,
  deleted?: false | boolean,
}

export type exam = {
  examId?: number,
  examNo: number,
  examTitle: String,
  totalItems: number,
  deleted?: false | boolean,
}

export type score = {
  scoreId: number,
  value: number,
  exam: exam,
  student: student,
}

export const ClassContext = createContext<{
  class_: class_,
  setClass_: Dispatch<React.SetStateAction<class_>>,
  students: student[],
  setStudents: Dispatch<React.SetStateAction<student[]>>,
  exams: exam[],
  setExams: Dispatch<React.SetStateAction<exam[]>>,
  scores: score[][],
  setScores: Dispatch<React.SetStateAction<score[][]>>,
} | null>(null)

export default function ClassProvider(props: { children: React.ReactNode }) {
  const [class_, setClass_] = useState<class_>({} as class_);
  const [students, setStudents] = useState<student[]>([]);
  const [exams, setExams] = useState<exam[]>([]);
  const [scores, setScores] = useState<score[][]>([[]]);

  return (
    <ClassContext.Provider value={{ class_, setClass_, students, setStudents, exams, setExams, scores, setScores }}>
      {props.children}
    </ClassContext.Provider>
  )
}
