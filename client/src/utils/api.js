import axios from "axios";

class API {
  axiosInstance = null;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:5000",
      timeout: 300000,
    });

    axiosInstance.interceptors.request.use(
      ({ data }) => data,
      (error) => Promise.reject(error)
    );
    this.axiosInstance = axiosInstance;
  }

  async getPhotos() {
    try {
      const result = await this.axiosInstance.get("/photos");
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  }

  async postPhoto(photoObj) {
    console.log(photoObj);
    try {
      const result = await this.axiosInstance.post("/photos", photoObj);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export default new API();
