import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

type PaymentFormPropsType = {
  onSubmit: () => void;
  areAllFormsComplete: boolean;
};
const PaymentForm = ({
  onSubmit,
  areAllFormsComplete,
}: PaymentFormPropsType) => {
  return (
    <Card>
      <CardHeader>Submit your payment here.</CardHeader>
      <CardContent>
        <Button disabled={!areAllFormsComplete} onClick={onSubmit}>
          Submit Form
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
