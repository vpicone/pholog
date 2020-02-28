import { useState, useRef } from "react";

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

const Home = () => {
  const formRef = useRef();
  const [images, setImages] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const response = await fetch("/api/image", {
      method: "POST",
      body: formData
    });

    const json = await response.json();
    console.log(json);
    setImages(json);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        {/* <div>
          Text field title: <input type="text" name="title" />
        </div> */}
        <div>
          File:{" "}
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
    </div>
  );
};

export default Home;
