import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_URL } from './constant';

interface JWT {
  jwt: string | null;
    getJwt: () => string | undefined;
    getUUID: () => string | undefined;
    setJwt: (newJwt: string) => void;
    setUUID: (newUUID: string) => void;
  getRole: () => Promise<string | null>;
}

const JWTProvider = (): JWT => {
  const [jwt, setJwt] = useState<string | null>(null);

  // Fetch initial JWT from cookie on component mount
  useEffect(() => {
    const storedJwt = Cookies.get('jwt');
    if (storedJwt) {
      setJwt(storedJwt);
    }
  }, []);

  const handleGetJwt = () => {
    return Cookies.get('jwt');
  }

  const handleGetUUID = () => {
    return Cookies.get('uuid');
  }

  const handleSetJwt = async (newJwt: string) => {
    // Set JWT in cookie with secure flag (if https) and HttpOnly flag
    await Cookies.set('jwt', newJwt);
  };

  const handleSetUUID = async (newUUID: string) => {
    // Set JWT in cookie with secure flag (if https) and HttpOnly flag
    
    await Cookies.set('uuid', newUUID);
  }

  const hanleNewRole = async () => {
    try {
        const response = await fetch(API_URL + "users/" + handleGetUUID(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${handleGetJwt()}`
          }
        });
    
        if (response.ok) {
            let responseJson = await response.json()
            return responseJson.role;
        } else {
          return null
        }
      } catch (error) {
        return null
      }
  }

  return { jwt, getJwt:handleGetJwt, getUUID: handleGetUUID, setJwt: handleSetJwt, setUUID: handleSetUUID, getRole: hanleNewRole};
};

export default JWTProvider;
