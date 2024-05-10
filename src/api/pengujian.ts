import { API_URL } from "../constant";

export const PengujianPostPengukuranAPI = async (jwt: string, formData: any) => {
    let response = await fetch(API_URL + 'measurements', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        body: formData,
      });

      let data = await response.json();
      return data;
}

export const PengujianPostAnalisisAPI = async (jwt: string, id: string) => {
    let response = await fetch(API_URL + 'measurements/' + id + "/analyze", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({"id": id})
      });

      let data = await response.json();
      return data;
}