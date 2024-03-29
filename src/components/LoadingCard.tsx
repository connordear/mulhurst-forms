import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col space-y-3 p-5">
      <div className="space-y-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <Card>
      <CardHeader>Submit your payment here.</CardHeader>
      <CardContent>
        <LoadingSpinner />
      </CardContent>
    </Card>
  );
};

export default LoadingCard;
