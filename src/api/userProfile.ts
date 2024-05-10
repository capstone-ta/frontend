import { API_URL } from "../constant";

export const UserProfileAPI = async (jwt: string, uuid: string) => {
    const response = await fetch(API_URL + 'users/' + uuid, {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include JWT token in authorization header
        },
    });

    if (!response.ok) {
    throw new Error('Failed to fetch user profile data');
    }

    const data = await response.json();
    return data;
}
