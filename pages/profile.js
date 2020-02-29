import { useState, useRef, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import withAuth from "../components/with-auth";

const Image = ({ src, metadata, error }) => {
  if (error) {
    return (
      <p>
        Error with "{error.name}": {error.message}
      </p>
    );
  }
  const { ISO, FNumber, ShutterSpeedValue } = metadata;
  return (
    <div>
      <img loading="lazy" style={{ width: "800px" }} src={src} />
      <p>
        iso: {ISO} | f-number {FNumber} | Shutter speed {ShutterSpeedValue}
      </p>
    </div>
  );
};

const Profile = ({ user }) => {
  const formRef = useRef();
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);

  const { given_name: givenName, sub } = user;

  useEffect(() => {
    async function fetchFolders() {
      const res = await fetch(`/api/sessions/${sub}`);
      let resultObject = await res.json();
      setFolders(resultObject.folders);
    }
    fetchFolders();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append("sub", sub);

    const response = await fetch("/api/image", {
      method: "POST",
      body: formData
    });

    setImages(await response.json());
  };

  return (
    <div>
      <h1>Hello, {givenName} create a new Session!</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          Text field title: <input type="text" name="title" />
        </div>
        <div>
          Files:{" "}
          <input
            type="file"
            name="multipleFiles"
            multiple
            accept="image/*,.heic,.heif"
          />
        </div>
        <button type="submit">submit</button>
      </form>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {images.map(({ secure_url, image_metadata, error }) => (
          <Image src={secure_url} metadata={image_metadata} error={error} />
        ))}
      </div>
      <ul>
        {folders.map(folder => (
          <li>{folder.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(Profile);
