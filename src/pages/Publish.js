import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (title && price && picture) {
        const formData = new FormData();
        formData.append("picture", picture);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("price", price);

        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        navigate(`/offer/${response.data._id}`);
      } else {
        setErrorMessage("Title, price and photo are required");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="file-select">
            <div style={{ height: 45, width: 180, border: "1px solid blue" }}>
              <label htmlFor="file">
                <span>+</span> <span>Ajoute une photo</span>
              </label>
            </div>
            <input
              style={{ display: "none" }}
              id="file"
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </div>
          <div className="txt-input-groups">
            <div className="txt-input">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex: Chemise Sézanne verte"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="txt-input">
              <h4>Décris ton article</h4>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>

          <div className="txt-input-groups">
            <div className="txt-input">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Zara"
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>

            <div className="txt-input">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex L /40 /12"
                onChange={(event) => setSize(event.target.value)}
              />
            </div>

            <div className="txt-input">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex: Fuschia"
                onChange={(event) => setColor(event.target.value)}
              />
            </div>

            <div className="txt-input">
              <h4>Etat</h4>
              <input
                type="text"
                placeholder="Neuf avec étiquette"
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>

            <div className="txt-input">
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex: Paris"
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>

          <div className="txt-input-groups">
            <div className="txt-input">
              <h4>Prix</h4>
              <div className="checkbox-section">
                <input
                  type="number"
                  placeholder="0.00 €"
                  onChange={(event) => setPrice(event.target.value)}
                />
                <div className="checkbox-input">
                  <input type="checkbox" />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>

          <div className="post-button-container">
            <button className="post-button" type="submit">
              Ajouter
            </button>
          </div>
          <span className="error-message">{errorMessage}</span>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
