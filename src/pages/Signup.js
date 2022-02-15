import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      //   Requête axios POST (URL, {data}) pour créer un nouveau User
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
        // Si clé et valeur sont identiques, on peut noter :
        // {
        //   email,
        //   username,
        //   password,
        //   newsletter,
        // }
      );
      console.log(response.data);
      if (response.data.token) {
        //   Si le token existe, on sauvegarde le token dans un cookie et on redirige le User vers la Home page "/"
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Error SignUp ====>", error.message);
      console.log("Error 2 SignUp ====>", error.response);
      if (error.response.status === 409) {
        setErrorMessage("This email already has an account");
      }
    }
  };

  return (
    <div>
      <div className="headline-signup">
        <h1>S'inscrire</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <div className="newsletter">
          <div className="checkbox">
            <input
              type="checkbox"
              onChange={(event) => {
                setNewsletter(event.target.checked);
              }}
            />
          </div>
          <p>S'inscrire à notre newsletter</p>
          <span>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </span>
        </div>
        <input type="submit" value={"S'inscrire"} />
        <span>{errorMessage}</span>
      </form>
    </div>
  );
};

export default Signup;
