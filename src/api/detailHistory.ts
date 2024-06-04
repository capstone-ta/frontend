

import { API_URL } from "../constant";
import DetailHistoryDataInterface from "../types/detailHistory";

export const DetailHistoryAPI = async (jwt: string, id: string) => {
    const response = await fetch(API_URL + 'measurements/' + id, {
        headers: {
          Authorization: `Bearer ${jwt}`, 
        },
      });
      console.log(response);
        if (!response.ok) {
            return null;
        }
      
      const data = await response.json();
      const formattedData: DetailHistoryDataInterface = {
        id: data.id,
        name: data.user.name,
        result: data.result,
        email: data.user.email,
        createdAt:  new Date(data.config.created_at).toLocaleDateString('id-ID', {
          timeZone: 'Asia/Jakarta', // WIB timezone
        }),
        filePath1: data.analysis_1,
        filePath2: data.analysis_2
      }
      console.log(formattedData);
      return formattedData;
}