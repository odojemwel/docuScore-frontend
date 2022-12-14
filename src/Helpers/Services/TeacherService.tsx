import axios from "axios"
import { teacher } from "../Context/LoginContext";

const baseURL = "http://localhost:8080/teacher/";
class TeacherService {
  getActiveClasses() {
    return axios.get(`${baseURL}classes?teacherId=${parseInt(localStorage.getItem("teacherId")!)}&isDeleted=false`);
  }

  getInactiveClasses() {
    return axios.get(`${baseURL}classes?teacherId=${parseInt(localStorage.getItem("teacherId")!)}&isDeleted=true`);
  }

  login(user: String, pswd: String) {
    return axios.get(`${baseURL}login?employeeId=${user}&password=${pswd}`)
  }

  register(employeeId: String, firstName: String, lastName: String, password: String) {
    return axios.post(`${baseURL}postTeacher`, {
      employeeId: employeeId,
      firstName: firstName,
      lastName: lastName,
      password: password,
      deleted: false
    })
  }

  getTeacherById() {
    return axios.get(`${baseURL}getTeacherById?teacherId=${parseInt(localStorage.getItem("teacherId")!)}`)
  }

  updateTeacher(user: teacher) {
    return axios.put(`${baseURL}putTeacher?teacherId=${parseInt(localStorage.getItem("teacherId")!)}`, {
      employeeId: user.employeeId,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      deleted: false
    })
  }
}
export default new TeacherService()