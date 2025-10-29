import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const response = await fetch(url);

        if (!response.ok) throw new error("Failed to fetch data");

        const result = await response.json();
        setdata(result);
        seterror(null)
      } catch (error) {
        seterror(error.message)
      } finally{
        setloading(false)
      }
    };

    fetchData();

  }, [url]);

  return {data,loading,error}
};

export default useFetch;
