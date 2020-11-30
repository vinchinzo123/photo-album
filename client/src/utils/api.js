import axios from "axios";
import { getToken } from './functions'
class API {

  axiosInstance = null;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:5000",
      timeout: 300000,
      header: {
        Authorization: `Bearer ${getToken()}`
      },
    });
    axiosInstance.interceptors.request.use(
      (config) => ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      ({
        data
      }) => data,
      (error) => Promise.reject(error)
    );
    this.axiosInstance = axiosInstance;
  }

  async getPhotos(userId) {
    try {
      const result = await this.axiosInstance.get(`/photos/user/${userId}`);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  }

  async postPhoto(photoObj) {
    try {
      const result = await this.axiosInstance.post("/photos", photoObj);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getAlbumPhotos(albumId) {
    console.log(albumId)
    try {
      const result = await this.axiosInstance.get(`/photos/album/${albumId}`)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async getSearchedPhotos(userId, term) {
    try {
      const result = await this.axiosInstance.get(`photos/search/${userId}/${term}`)
      console.log(result)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }
  async deletePhoto(photoId) {
    try {
      const result = await this.axiosInstance.delete(`/photos/${photoId}`)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }
  async postUser(userObj) {
    console.log(userObj);
    try {
      const result = await this.axiosInstance.post("/users", userObj);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err.response);
      return err;
    }
  }

  async getUser(userID) {
    try {
      const result = await this.axiosInstance.get(`/users${userID}`)
      return result
    } catch (err) {
      return err
    }
  }

  async updateUser(userObj, userID) {
    try {
      const result = await this.axiosInstance.put(`/users${userID}`, userObj)
      return result
    } catch (err) {
      return err
    }
  }

  async getAlbums(userId) {
    try {
      const result = await this.axiosInstance.get(`/albums/${userId}`)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async getSearchedAlbums(userId, term) {
    console.log(userId)
    try {
      const result = await this.axiosInstance.get(`albums/search/${userId}/${term}`)
      console.log(result)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async postAlbum(photoAlbum) {
    try {
      const result = await this.axiosInstance.post('/albums', photoAlbum)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async deleteAlbum(albumId) {
    try {
      const result = await this.axiosInstance.delete(`/albums/${albumId}`)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async login(loginObj) {
    try {
      const result = await this.axiosInstance.post("/auth/login", loginObj);
      localStorage.setItem("token", result.token);
      // console.log(result);
      return result;
    } catch (err) {
      return {
        err: err
      };
    }
  }

  async logout() {
    try {
      const result = await this.axiosInstance.get("/auth/logout");
      console.log(result);
      localStorage.removeItem("token");
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}


export default new API();