import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type PaymentFormPropsType = {
  priceId: string | undefined;
  quantity: number;
  invalidForms: string[];
};

const PaymentForm = ({
  priceId,
  quantity,
  invalidForms,
}: PaymentFormPropsType) => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    if (!priceId) return Promise.resolve("");
    return fetch(`/api/stripe?price_id=${priceId}&quantity=${quantity}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [priceId, quantity]);

  if (!fetchClientSecret) {
    return <div>Price ID not found</div>;
  }

  if (!priceId) {
    return <div>Price ID not found</div>;
  }

  if (invalidForms.length) {
    return (
      <Card>
        <CardHeader>Submit your payment here.</CardHeader>
        <CardContent>
          <div>
            <p>
              There are some invalid forms. Please fix them before proceeding.
            </p>
            <br />
            <ul>
              {invalidForms.map((form) => (
                <li key={form}>{form}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>Submit your payment here.</CardHeader>
      <CardContent>
        <div id="checkout">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
