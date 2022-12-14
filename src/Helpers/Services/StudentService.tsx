import axios from "axios"


const baseURL = "http://localhost:8080/student/"
class StudentService {
  getStudentByClass(classId: number) {
    return axios.get(`${baseURL}getStudentsByClassId?classId=${classId}`)
  }

}

export default new StudentService()