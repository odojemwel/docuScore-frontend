import axios from "axios"

class ClassService {
  getClass(classId: number) {
    return axios.get(`http://localhost:8080/Class/getClassbyId/${classId}`)
  }

}

export default new ClassService()