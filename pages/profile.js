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

const Profile = ({ user }) => {
  const formRef = useRef();
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);

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
      const resultObject = await res.json();
      console.log({ resultObject });
    }
    fetchUser();
  }, [name, picture, sub, updatedAt]);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append('sub', sub);

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
      <ul>
        {folders.map(folder => (
          <li>{folder.name}</li>
        ))}
      </ul>
      <a href="/api/logout">logout</a>
    </div>
  );
};

export default withAuth(Profile);
