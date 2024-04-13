export type Program = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  weekPriceId: string;
  dayPriceId?: string;
  canApplySiblingDiscount: boolean;
};
