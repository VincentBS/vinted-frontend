import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/Vinted-logo.png";

const Header = ({ token, setUser, setSearchBar }) => {
  const navigate = useNavigate();

  return token ? (
    <div>
      <header className="header-container">
        <div className="search-container">
          <Link to="/">
            <img className="logo" src={Logo} alt="" />
          </Link>
          <input
            className="searchButton"
            type="text"
            placeholder="Recherche des articles"
            onChange={(event) => {
              console.log(event.target.value);
              setSearchBar(event.target.value);
            }}
          />
        </div>
        <div className="AllButtons">
          <button
            className="deconnectButton"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
          <Link to="/publish">
            <button className="buttonVends">Vends tes articles</button>
          </Link>
        </div>
      </header>
    </div>
  ) : (
    <div>
      <header className="header-container">
        <div className="logoSearch">
          <Link to="/">
            <img className="logo" src={Logo} alt="" />
          </Link>

          <div>
            <input
              className="searchButton"
              type="text"
              placeholder="Recherche des articles"
              onChange={(event) => {
                console.log(event.target.value);
                setSearchBar(event.target.value);
              }}
            />
            <div>
              {/* A FAIRE */}
              <p>Trier par prix</p>
            </div>
          </div>
        </div>

        <div className="AllButtons">
          <Link to="/signup">
            <button className="buttonUnique">S'inscrire</button>
          </Link>

          <Link to="/login">
            <button className="buttonUnique">Se connecter</button>
          </Link>

          <Link to="/login">
            <button className="buttonVends">Vends tes articles</button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;

// const Header = ({ token, setUser }) => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       {token ? (
//         <button
//           onClick={() => {
//             setUser(null);
//             navigate("/");
//           }}
//         >
//           Se déconnecter
//         </button>
//       ) : (
//         <div className="header">
//           <Link to="/signup">S'inscrire</Link>
//           <Link to="/login">Se connecter</Link>
//         </div>
//       )}
//       <Link to="/publish">Vends tes articles</Link>
//     </div>
//   );
// };

// export default Header;
