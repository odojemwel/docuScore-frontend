import axios from "axios"
import { student } from "../Context/ClassContext"


const baseURL = "http://localhost:8080/student/"
class StudentService {
  getStudentByClass(classId: number) {
    return axios.get(`${baseURL}getStudentsByClassId?classId=${classId}`)
  }

  addStudent(student: student, classId: number) {
    return axios.post(`${baseURL}postStudent?class_id=${classId}`, {
      studSchoolId: student.studSchoolId,
      classNumber: student.classNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      deleted: false
    });
  }

  getStudentByID(studentId: number) {
    return axios.get(`${baseURL}getStudentsById/${studentId}`)
  }

  updateStudent(student: student, studentId: number) {
    return axios.put(`${baseURL}putStudent?id=${studentId}`, {
      studSchoolId: student.studSchoolId,
      classNumber: student.classNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      deleted: false
    })
  }

  deleteStudent(studentId: number) {
    return axios.delete(`${baseURL}deleteStudent/${studentId}`)
  }
}

export default new StudentService()