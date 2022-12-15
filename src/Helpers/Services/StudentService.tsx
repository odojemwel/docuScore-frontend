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
}

export default new StudentService()