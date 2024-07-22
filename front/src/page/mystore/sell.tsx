import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

const SellPage = () => {
  //state
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [files, SetFiles] = useState<FileList>();

  //func
  const imgUploader = (files: FileList) => {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      formData.append("img", files[i]);
    }

    console.log(formData);
    axios
      .post(`${serverUrl}/imgSave`, formData, {
        withCredentials: true,
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  //mount

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <input
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) SetFiles(e.target.files);
        }}
        type="file"
        multiple
        accept="image/*"
      />
      <button
        onClick={() => {
          if (files) imgUploader(files);
        }}
      >
        BT
      </button>
    </>
  );
};

export default SellPage;
