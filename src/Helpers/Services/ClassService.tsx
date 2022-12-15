import axios from "axios"
import { class_ } from "../Context/ClassContext";

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

  editClass(newClass: class_, classId: number) {
    return axios.put(`${baseUrl}putClass?id=${classId}`, {
      subject: newClass.subject,
      yearLevel: newClass.yearLevel,
      section: newClass.section,
      deleted: false
    })
  }

}

export default new ClassService()