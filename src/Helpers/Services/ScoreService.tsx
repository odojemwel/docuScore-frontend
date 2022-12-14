import axios from "axios"


const baseURL = "http://localhost:8080/score/"
class ScoreService {
  getScoreByStudent(studentId: number) {
    return axios.get(`${baseURL}getScoreByStudent?studentId=${studentId}`)
  }

}

export default new ScoreService()