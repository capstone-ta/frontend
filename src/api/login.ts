import { API_URL } from "../constant";

export const LoginAPI = async (data: { email: string, password: string }) => {
    const response = await fetch(API_URL + "auth/login", {
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
        throw new Error("Login Gagal");
    }
}
