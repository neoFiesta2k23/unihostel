import React from 'react';
import Button from '../../components/buttons/button';
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function NotFound() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '50px',
        backgroundColor: '#dadada',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        overflow:"hidden"
      }}
    >
      <h3 style={{ fontSize: '40px', color: '#d32f2f', marginBottom: '10px' }}>
        ERROR 404
      </h3>
      <p style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <DotLottieReact
        src="https://lottie.host/7b639f54-5d95-4f4e-ae1e-e66e2598fc4d/gxBrjR4IaL.lottie"
        loop
        autoplay
        width={600}
      />
      <Link to="/">
        <Button name="Back to Home" />
      </Link>
    </div>
  );
}

export default NotFound;
