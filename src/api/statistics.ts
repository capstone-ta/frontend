import { API_URL } from "../constant";

type Point = { x: number; y: number };

export const StatisticsAPI = async (jwt: string) => {
    const response = await fetch(API_URL + 'measurements', {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include JWT token in authorization header
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile data');
    }
    const data = await response.json();
    let formattedData = {
        "above": [],
        "below": [],
    }
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        if(element.current_response === null) continue;
        if (element.result === true) {
            (formattedData.above as Point[]).push({ x: 1, y: element.current_response });
        } else {
            (formattedData.below as Point[]).push({ x: 0, y: element.current_response });
        }
    }
    return formattedData
}