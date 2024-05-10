

import { API_URL } from '../constant';
import ConfigurationUserDataInterface from '../types/konfigurasi';

export const KonfigurasiAPI = async (jwt: string) => {
    const response = await fetch(API_URL + 'users', {
        headers: {
            Authorization: `Bearer ${jwt}`, // Include JWT token in authorization header
        },
    });
    

    if (!response.ok) {
    
        throw new Error('Failed to fetch user profile data');
    }
    const data = await response.json();
    const formattedData: ConfigurationUserDataInterface[] = data.map((obj: any) => ({
        id: obj.id,
        email: obj.email,
        username: obj.name,
        role: obj.role,
    }));
    return formattedData
}

export const KonfigurasiUpdateAPI = async (jwt: string, id: string, role: string) => {
    let response = await fetch(API_URL + 'users/' + id , {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            "role": role == "LABORAN" ? "USER" : "LABORAN"
        }),
      });

    if (!response.ok) {
        return false;
    }
    return true;
}