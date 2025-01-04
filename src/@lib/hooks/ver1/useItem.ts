import { useCallback, useMemo, useState } from "react";
import { generateItems } from "../../../utils";
import { ITEMS_LENGTH } from "../../../const";

export const useHandleItem = () => {
  const [items, setItems] = useState(() => generateItems(ITEMS_LENGTH));
  const [filter, setFilter] = useState("");

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(ITEMS_LENGTH, prevItems.length),
    ]);
  }, []);

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.category.toLowerCase().includes(filter.toLowerCase())
      ),
    [items, filter]
  );

  const totalPrice = useMemo(
    () => filteredItems.reduce((sum, item) => sum + item.price, 0),
    [filteredItems]
  );

  const averagePrice = useMemo(
    () => Math.round(totalPrice / filteredItems.length) || 0,
    [totalPrice, filteredItems.length]
  );

  return {
    addItems,
    filter,
    setFilter,
    filteredItems,
    totalPrice,
    averagePrice,
  };
};
