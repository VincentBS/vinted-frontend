import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation, Navigate } from "react-router-dom";

const Payment = ({ token }) => {
  const location = useLocation();
  const { title, price } = location.state;

  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  return token ? (
    <div>
      <h4> {title} </h4>
      <span> {price} €</span>
      <Elements stripe={stripePromise}>
        <CheckoutForm title={title} price={price} />
      </Elements>
    </div>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default Payment;
