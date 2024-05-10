import { API_URL } from "../constant";

export const RegisterAPI = async (data: { email: string, password: string, name: string }) => {
    const response = await fetch(API_URL + "auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const responseJson = await response.json();
        return responseJson;
    } else {
        throw new Error("Register Gagal");
    }
}