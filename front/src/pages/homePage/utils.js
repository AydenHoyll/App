import axios from "axios";

export const apiFetchData = async (data) =>
  axios
    .get("/api/data", {
      params: data,
    })
    .then((response) => {
      console.log("response from back", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => console.log("done"));
