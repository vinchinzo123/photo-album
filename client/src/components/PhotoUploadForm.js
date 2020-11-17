import React, {useState} from "react";
import useInput from "../hooks/useInput";
import api from "../utils/api";
import { useLocation } from "react-router-dom";




export const PhotoUploadForm = () => {
const location = useLocation().pathname.split("/")[2];
const [imageTitle, bindImageTitle, resetImageTitle] = useInput("")
const [familyName, bindFamilyName, resetFamilyName] = useInput("")
const [tags, bindTags, resetTags] = useInput("")
const [error, setError] = useState(null)
const [input, setInput] = useState({
  img: "",
  imgName: "",
});

const fileChangeHandler = (e) => {
  const file = e.target.files[0];
  setInput((currentInput) => ({
    ...currentInput,
    img: file,
    imgName: file.name,
  }));
};

const handleSubmit = async(e) => {
  e.preventDefault();
  setError(null)
  console.log(e.target.children[4].files)
  if (input.img ){
    
    const data = new FormData();
    data.append("image", input.img, input.imgName);
    data.append("title", imageTitle);
    data.append("tags", tags);
    data.append("family", familyName);
    data.append("album", location);
    resetImageTitle()
    resetFamilyName()
    resetTags() 
    setInput({img:"", imgName:""})
    const result = await api.postPhoto(data);
    console.log(result)
  } else {
    setError("Please supply an image!")
  }

};
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto max-w-full flex flex-col space-y-2"
      >
        <div className="text-gray-900">Post your family photo!</div>
        <div>
          <input
            name="title"
            {...bindImageTitle}
            
            placeholder="Image Title"
            className=" outline-none rounded-t p-2 w-max-content font-hairline italic"
          />
        </div>
        <div>
          <input
            name="family"
            {...bindFamilyName}
            
            placeholder="Family Name"
            className=" outline-none rounded-t p-2 w-max-content font-hairline italic"
          />
        </div>
        <div>
          <input
            name="tags"
            {...bindTags}
            
            placeholder="Tags (ex. multi-word, delimited-by-commas, test)"
            className=" outline-none rounded-t p-2 w-max-content font-hairline italic"
          />
        </div>
        <div>
          <input
            name="image"
            type="file"
            onChange={fileChangeHandler}
            className=" outline-none rounded-t p-2 w-max-content font-hairline italic"
          />
        </div>
        <div>
        {error && <p>{error}</p>}
          <button className="bg-indigo-600 text-gray-100 px-5 py-3 rounded font-semibold tracking-wide text-sm">
            Submit Photo
          </button>
        </div>
      </form>
    </div>
  );
};
