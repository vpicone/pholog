import { useState, useRef } from 'react';

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
      <img loading="lazy" style={{ width: '800px' }} src={src} />
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
    const response = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    });
    setImages(await response.json());
  };

  return (
    <div>
      <a href="/api/login">Login</a>
      <a href="/profile">Profile</a>
      <a href="/api/logout">logout</a>
    </div>
  );
};

export default Home;
