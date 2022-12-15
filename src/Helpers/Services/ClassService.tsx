import axios from "axios"

const baseUrl = "http://localhost:8080/Class/";
class ClassService {
  getClass(classId: number) {
    return axios.get(`${baseUrl}getClassbyId/${classId}`)
  }

  createClass(subject: String, yearLevel: number, section: String, teacherId: number) {
    return axios.post(`${baseUrl}postClass`, {
      subject: subject,
      yearLevel: yearLevel,
      section: section,
      teacher: {
        teacherId: teacherId
      },
      deleted: false
    });
  }

}

export default new ClassService()