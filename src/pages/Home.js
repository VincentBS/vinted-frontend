import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const limit = 8;

  const handlePageClick = (event) => {
    console.log(event);
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=${limit}&page=${page}`
        );
        // console.log(response.data);
        setData(response.data);
        setPageCount(Math.ceil(Number(response.data.count) / limit));
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <div> Downloading... </div>
  ) : (
    <div className="offer">
      {data.offers.map((offer) => {
        return (
          <Link key={offer._id} to={`/offer/${offer._id}`}>
            <div className="card-home">
              <h2> {offer.product_name} </h2>
              <img
                style={{ height: 150 }}
                //   --> à enlever
                src={offer.product_image.secure_url}
                alt="product"
              />
            </div>
          </Link>
        );
      })}
      <div className="pagination-home">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          // activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Home;
