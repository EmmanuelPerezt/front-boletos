import React, { useState, useEffect, useRef } from "react";

//todo hacer login
export const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    try {
      if (storedUser) {
          setUsername(storedUser);
          setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error al parsear localStorage:", error);
      localStorage.removeItem("user");  // 🔹 Borra el dato corrupto
    }
  }, []);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const requestLogin = async (event) => {
    event.preventDefault();
    const usernameInput = usernameRef.current.value;
    const passwordInput = passwordRef.current.value;
    

    try {

      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });
      if (!response.ok) {
        throw new Error("que pasa perroooooo");
      }
      const data = await response.json();
      localStorage.setItem("user", usernameInput);
      setUsername(usernameInput);
      setIsAuthenticated(true);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const logout= ()=>{
    localStorage.removeItem("user");
    setUsername("");
    setIsAuthenticated(false);
    window.location.reload();
  };
  return (
    <>
    {isAuthenticated ? (
        <div className="dropdown">
        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
          {username}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={logout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    ):(
      <div>
      <button
        type="button"
        className="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Iniciar Sesión
      </button>
    </div>
    )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "white" }}
              >
                Iniciar sesión
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={requestLogin}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    style={{ color: "white" }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    ref={usernameRef}
                  />
                  <div id="emailHelp" className="form-text">
                    Nunca lo compartas con nadie
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label"
                    style={{ color: "white" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    ref={passwordRef}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" className="btn btn-light">
                  Iniciar Sesión
                </button>
                <button type="button" className="btn btn-dark">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
