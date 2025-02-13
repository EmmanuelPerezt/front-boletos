import { useState } from "react";



export const Search = () => {

    const [alert,setAlert]=useState("");
    const submit= (props)=>{
        console.log("hola")
        console.log("evento pasando")
    }
  return (
    <>
      <form class="d-flex" role="search" onSubmit={t=>submit()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
        />
      </form>
    </>
  );
};
