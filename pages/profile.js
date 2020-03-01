import { useState, useRef, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import withAuth from '../components/with-auth';

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
      <img
        alt="test-alt?"
        loading="lazy"
        style={{ width: '800px' }}
        src={src}
      />
      <p>
        iso: {ISO} | f-number {FNumber} | Shutter speed {ShutterSpeedValue}
      </p>
    </div>
  );
};

const Profile = ({ user: userAuthData }) => {
  const formRef = useRef();
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(userAuthData);

  const { name, sub, picture, updated_at: updatedAt } = user;

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sub, name, picture, updatedAt }),
      });
      const userData = await res.json();
      setUser({ ...userAuthData, ...userData });
    }
    fetchUser();
  }, [name, picture, sub, updatedAt, userAuthData]);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append('userId', user._id);

    const response = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    });

    setImages(await response.json());
  };

  return (
    <div>
      <h1>Hello, {name} create a new Session!</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          Text field title: <input type="text" name="title" />
        </div>
        <div>
          Files:{' '}
          <input
            type="file"
            name="multipleFiles"
            multiple
            accept="image/*,.heic,.heif"
          />
        </div>
        <button type="submit">submit</button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {images.map(({ secure_url: src, image_metadata: metadata, error }) => (
          <Image src={src} metadata={metadata} error={error} />
        ))}
      </div>
      <a href="/api/logout">logout</a>
    </div>
  );
};

export default withAuth(Profile);
