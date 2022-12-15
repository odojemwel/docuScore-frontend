import axios from "axios";
import { exam } from "../Context/ClassContext";


const baseURL = "http://localhost:8080/Exam/";
class ExamService {
  getExamByClass(studentId: number) {
    return axios.get(`${baseURL}exam/${studentId}`)
  }

  addExam(exam: exam, classId: number) {
    return axios.post(`${baseURL}postExam`, {
      examNo: exam.examNo,
      examTitle: exam.examTitle,
      totalItems: exam.totalItems,
      classId: {
        classId: classId
      },
      deleted: false
    })
  }

  getExamById(examId: number) {
    return axios.get(`${baseURL}getExamById?examId=${examId}`)
  }

  updateExam(newExam: exam, examId: number) {
    return axios.put(`${baseURL}putExam?examId=${examId}`, {
      examNo: newExam.examNo,
      examTitle: newExam.examTitle,
      totalItems: newExam.totalItems
    })
  }
}

export default new ExamService()