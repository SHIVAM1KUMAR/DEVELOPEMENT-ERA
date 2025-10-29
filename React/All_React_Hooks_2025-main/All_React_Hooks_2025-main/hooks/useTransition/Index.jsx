import React, { useState, useTransition } from "react";

const Index = () => {
  const [search, setSearch] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    startTransition(() => setSearch(e.target.value));
    console.log(search)
  };

  return (
    <div>
      <h1>THis is Use Transition hook</h1>
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
};

export default Index;
