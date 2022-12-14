import axios from "axios";


const baseURL = "http://localhost:8080/Exam/";
class ExamService {
  getExamByClass(studentId: number) {
    return axios.get(`${baseURL}exam/${studentId}`)
  }


}

export default new ExamService()