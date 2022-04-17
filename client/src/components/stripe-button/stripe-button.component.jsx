import React from "react";
import axios from 'axios'

import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from '@stripe/react-stripe-js';

// const StripeCheckOutButton = ({ price }) => {
//   const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY);

//   const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (event) => {
//       event.preventDefault();

//       if (!stripe || !elements) {
//         return;
//       }

//       const result = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: "https://example.com/order/123/complete",
//         },
//       });


//       if (result.error) {
//         // Show error to your customer (for example, payment details incomplete)
//         console.log(result.error.message);
//       } else {
//         // Your customer will be redirected to your `return_url`. For some payment
//         // methods like iDEAL, your customer will be redirected to an intermediate
//         // site first to authorize the payment, then redirected to the `return_url`.
//       }
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         <PaymentElement />
//         <button disabled={!stripe}>Submit</button>
//       </form>
//     )
//   };


//   return (
//     <Elements stripe={stripePromise} options={{
//       clientSecret: process.env.REACT_APP_PRIVATE_STRIPE_KEY,
//     }}>
//       <CheckoutForm />
//     </Elements>
//   );


// };

// export default StripeCheckOutButton;

// ------------------------------------------------

const Stripe = ({ price }) => {
  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        try {
          const { id } = paymentMethod;
          const response = await axios.post(
            "http://localhost:3000/payment",
            {
              amount: price,
              id: id,
            }
          );
          if (response.data.success) {
          }
        } catch (error) {
          console.log("CheckoutForm.js 28 | ", error);
        }
      } else {
        console.log(error.message);
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <CardElement />
      </form>
    );
  };

  const stripeTestPromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY);

  return (
    <Elements stripe={stripeTestPromise} >
      <CheckoutForm />
    </Elements>
  );
}
export default Stripe;