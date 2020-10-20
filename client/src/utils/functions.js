const url = "http://localhost:5000/";

export const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

export const postPhoto = async (photoObj) => {
  console.log(photoObj);
  let response = await fetch(url + "photos", {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    //   Accept: "application/json",
    // },
    body: photoObj,
  });
  console.log(response);
};
