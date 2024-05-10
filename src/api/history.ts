import { API_URL } from "../constant";

export const HistoryUserAPI = async (jwt: string, uuid: string) => {
    const response = await fetch(API_URL + 'measurements/user/' + uuid, {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include JWT token in authorization header
        },
      });
    

    if (!response.ok) {
    
        throw new Error('Failed to fetch user profile data');
    }
    const data = await response.json();
    return data
}

export const HistoryAPI = async (jwt: string) => {
    const response = await fetch(API_URL + 'measurements', {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include JWT token in authorization header
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile data');
    }
    const data = await response.json();
    return data
}