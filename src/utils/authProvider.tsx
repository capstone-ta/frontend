import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_URL } from '../constant';
import { useContext } from "react"
import { RoleContext } from './roleProvider';

interface Auth {
  jwt: string | null;
    getJwt: () => string | undefined;
    getUUID: () => string | undefined;
    setJwt: (newJwt: string) => void;
    setUUID: (newUUID: string) => void;
  getRole: () => string | undefined;
  checkCredential: () => Promise<string | null>;
}

const AuthProvider = (): Auth => {
  const [jwt, setJwt] = useState<string | null>(null);
  const { role, setRole } = useContext(RoleContext);

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
    await Cookies.set('jwt', newJwt);
  };

  const handleSetUUID = async (newUUID: string) => {
    await Cookies.set('uuid', newUUID);
  }

  const getRole = () => {
    return role ? role : undefined;
  }

  const checkCredential = async () => {
    try {
      if (handleGetUUID() === undefined || handleGetJwt() === undefined) {
        return null
      }
      const response = await fetch(API_URL + "users/" + handleGetUUID(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${handleGetJwt()}`
        }
      });
  
      if (response.ok) {
          let responseJson = await response.json()
          if (role === null) {
            setRole(responseJson.role);
          } else if (role !== responseJson.role) {
            return null;
          }
          return responseJson.role;
      } else {
        return null;
      }
    } catch (error) {
      return null
    }
  }

  return { jwt, getJwt:handleGetJwt, getUUID: handleGetUUID, setJwt: handleSetJwt, setUUID: handleSetUUID, getRole: getRole, checkCredential: checkCredential};
};

export default AuthProvider;
