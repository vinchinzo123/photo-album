import React from "react";

export const PhotoUploadForm = ({
  handleSubmit,
  handleOnChange,
  fileChangeHandler,
  input,
}) => {
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
            onChange={handleOnChange}
            value={input.title}
            placeholder="Image Title"
            className=" outline-none rounded-t p-2 w-max-content font-hairline italic"
          />
        </div>
        <div>
          <input
            name="family"
            onChange={handleOnChange}
            value={input.family}
            placeholder="Family Name"
            className=" outline-none rounded-t p-2 w-max-content font-hairline italic"
          />
        </div>
        <div>
          <input
            name="tags"
            onChange={handleOnChange}
            value={input.tags}
            placeholder="Tags (ex. multi-word, delimited-by-commas, test)"
            className=" outline-none rounded-t p-2 w-max-content font-hairline italic"
          />
        </div>
        <div>
          <input
            name="image"
            type="file"
            onChange={fileChangeHandler}
            placeholder="Tags (ex. multi-word, delimited-by-commas, test)"
            className=" outline-none rounded-t p-2 w-max-content font-hairline italic"
          />
        </div>
        <div>
          <button className="bg-indigo-600 text-gray-100 px-5 py-3 rounded font-semibold tracking-wide text-sm">
            Submit Photo
          </button>
        </div>
      </form>
    </div>
  );
};
