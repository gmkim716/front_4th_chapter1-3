import { useMemo } from "react";
import { useItem } from "./useItem";

export function usePrice() {
  const { filteredItems } = useItem();

  const totalPrice = useMemo(
    () => filteredItems.reduce((sum, item) => sum + item.price, 0),
    [filteredItems]
  );

  const averagePrice = useMemo(
    () => Math.round(totalPrice / filteredItems.length) || 0,
    [totalPrice]
  );

  return { totalPrice, averagePrice };
}
