import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div> Downloading... </div>
  ) : (
    <div>
      {data.offers.map((offer) => {
        return (
          <Link key={offer._id} to={`/offer/${offer._id}`}>
            <div className="card-home">
              <h2> {offer.product_name} </h2>
              <img
                style={{ height: 150 }}
                //   --> à enlever
                src={offer.product_image.secure_url}
                alt=""
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
