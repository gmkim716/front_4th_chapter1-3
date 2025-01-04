import { useCallback, useMemo, useState } from "react";
import { generateItems } from "../../../utils";
import { ITEMS_LENGTH } from "../../../const";

export function useItem() {
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
          item.category.toLowerCase().includes(filter.toLowerCase()),
      ),
    [items, filter],
  );

  return {
    items,
    addItems,
    filter,
    setFilter,
    filteredItems,
  };
}
