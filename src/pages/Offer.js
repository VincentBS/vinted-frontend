import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  //   console.log(id);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div> Downloading... </div>
  ) : (
    <body id="offer">
      <div className="container">
        <div className="offer">
          <div className="offer-image">
            <img src={data.product_image.secure_url} alt="product" />
          </div>
          <div className="product">
            <div className="product-price">{data.product_price} €</div>
            <div className="product-details">
              {/* Tableau product_details */}
              {data.product_details.map((item, index) => {
                const keys = Object.keys(item);
                const values = Object.values(item);
                return (
                  <div key={index}>
                    <span> {keys[0]} </span>
                    <span> {values[0]} </span>
                  </div>
                );
              })}
            </div>
            <div className="product-name">{data.product_name}</div>
            <div className="product-description">
              {data.product_description}
              <div className="avatar-owner">
                <img src={data.owner.account.avatar.secure_url} alt="avatar" />
              </div>
              <div className="owner">
                <span>{data.owner.account.username}</span>
              </div>

              <Link
                className="buttonbuy"
                to="/payment"
                state={{
                  title: data.product_name,
                  price: data.product_price,
                }}
              >
                <button className="buy">Acheter</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Offer;
