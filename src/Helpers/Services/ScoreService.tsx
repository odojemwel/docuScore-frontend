import axios from "axios"


const baseURL = "http://localhost:8080/score/"
class ScoreService {
  getScoreByStudent(studentId: number) {
    return axios.get(`${baseURL}getScoreByStudent?studentId=${studentId}`)
  }

  getScoreByExamAndStudent(examId: number, studentId: number) {
    return axios.get(`${baseURL}getScore?examId=${examId}&studentId=${studentId}`)
  }

  addScore(value: number, examId: number, studentId: number) {
    return axios.post(`${baseURL}addScore`, {
      value: value,
      exam: {
        examId: examId
      },
      student: {
        studentId: studentId
      }
    })
  }

  updateScore(scoreId: number, value: number) {
    return axios.put(`${baseURL}putScore?scoreId=${scoreId}`, {
      value: value
    })
  }
}

export default new ScoreService()