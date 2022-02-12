import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
        //   console.log(response.data);
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
    <div id="offer">
      <h2> {data.product_name} </h2>
      <div>
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
    </div>
  );
};

export default Offer;
