import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import React from "react";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const fraisProtection = price / 10;
  const fraisDePort = price / 20;
  const totalPrice = Math.round(price + fraisDePort + fraisProtection);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On récupère les données CB que l'utilisateur rentre
      const cardElements = elements.getElement(CardElement);
      // Création d'un token via l'API Stripe
      // On envoie les données CB dans la requête
      const stripeResponse = await stripe.createToken(cardElements, {
        name: "Test",
      });
      console.log("Stripe Response ===> ", stripeResponse.token.id);
      const stripeToken = stripeResponse.token.id;
      // Une fois le token reçu depuis l'API Stripe --> On fait une requête vers notre serveur
      // Envoi du token reçu depuis l'API Stripe
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { token: stripeToken, title: title, amount: price }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="payment-wrapper">
      <form className="payment-container" onSubmit={handleSubmit}>
        <div className="payment-card-summary">
          <div className="title">Résumé de la commande</div>
          <div className="content">
            <h1 className="content-title">Commande</h1>
            <div className="content-price">{price} €</div>
          </div>
          <div className="content">
            <h1 className="content-title">Frais protection acheteurs</h1>
            <div className="content-price">{fraisProtection} €</div>
          </div>
          <div className="content">
            <h1 className="content-title">Frais de port</h1>
            <div className="content-price">{fraisDePort} €</div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="content-bottom">
          <div className="content-bottom">
            <h1 className="content-bottom-total">Total</h1>
            <div className="content-bottom-price">{totalPrice} €</div>
          </div>
          <div className="content-text">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span className="texteBold">{title}</span>. Vous allez payer{" "}
            <span className="texteBold">{totalPrice}</span> € (frais de
            protection et frais de port inclus).
          </div>
          <div className="boxVide"></div>
          <CardElement className="content-CB"></CardElement>
          <div className="buttonPay">
            <button type="submit">Pay</button>
            <span>{completed}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
