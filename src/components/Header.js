import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      {token ? (
        <button
          onClick={() => {
            setUser(null);
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <div className="header">
          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>
        </div>
      )}
      <Link to="/publish">Vends tes articles</Link>
    </div>
  );
};

export default Header;
