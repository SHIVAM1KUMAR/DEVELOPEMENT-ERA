import React, { useEffect } from "react";

const FetchData = () => {
  useEffect(() => {
    const fetcDataFromAPI = async () => {
      const api = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await api.json();

      console.log("fetching data = ", result);
    };
    fetcDataFromAPI();
  }, []);

  return <div>FetchData</div>;
};

export default FetchData;
