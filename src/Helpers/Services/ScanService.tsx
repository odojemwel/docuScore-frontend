import axios from "axios";

const baseURL = "http://localhost:8080/OCR/"
class ScanService {
  getScore(formData: FormData) {
    return axios(
      {
        method: "post",
        url: `${baseURL}getTextGVision`,
        data: formData
      }
    );
  }

}

export default new ScanService();