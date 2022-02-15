import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      );
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Wrong email and/or password");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="headline-login">
        <h1>Se connecter</h1>
      </div>
      <input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        type="email"
        placeholder="Adresse email"
      />
      <br />
      <input
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        type="password"
        placeholder="Mot de passe"
      />
      <br />
      <input type="submit" value={"Se connecter"} />
      <br />
      <input type="submit" value={"Pas encore de compte ? Inscris-toi !"} />
      <br />
      <span> {errorMessage} </span>
    </form>
  );
};

export default Login;
