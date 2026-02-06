import { useState } from 'react';

function User() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setImageLoaded(true);
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>User Profile</h1>
      
      <button 
        onClick={handleImageClick}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Load Image
      </button>

      {isLoading && <p style={{ color: 'blue', fontSize: '18px', marginTop: '20px', fontWeight: 'bold' }}>Please wait...</p>}

      {imageLoaded && (
        <img 
          src="https://i.pravatar.cc/400?img=12"
          alt="User profile" 
          style={{ width: '300px', height: '300px', borderRadius: '50%', marginTop: '20px', border: '3px solid #4CAF50' }}
        />
      )}
    </div>
  );
}

export default User;