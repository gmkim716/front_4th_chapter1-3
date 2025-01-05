import { useState } from "react";
import { renderLog } from "../utils";
import { useTheme } from "../context/ThemeContext";
import { usePrice } from "../@lib/hooks/ver2/usePrice";
import { useItem } from "../@lib/hooks/ver2/useItem";

export const ItemList: React.FC = () => {
  renderLog("ItemList rendered");
  const [filter, setFilter] = useState("");
  const { theme } = useTheme();

  // Question. 훅으로 분리한다면?
  const { filteredItems, addItems } = useItem();
  const { totalPrice, averagePrice } = usePrice();

  // 이전 코드
  // () => generateItems(1000): 화살표 함수를 했을 때는 첫 렌더링 시에만
  // generateItems, 컴포넌트가 리렌더링될때마다 호출하게 된다
  // const [items, setItems] = useState(() => generateItems(ITEMS_LENGTH));
  // const addItems = useCallback(() => {
  //   setItems((prevItems) => [
  //     ...prevItems,
  //     ...generateItems(ITEMS_LENGTH, prevItems.length),
  //   ]);
  // }, []);

  // const filteredItems = items.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(filter.toLowerCase()) ||
  //     item.category.toLowerCase().includes(filter.toLowerCase()),
  // );

  // const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);
  // const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
            onClick={addItems}
          >
            대량추가
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="상품 검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
        <li>검색결과: {filteredItems.length.toLocaleString()}개</li>
        <li>전체가격: {totalPrice.toLocaleString()}원</li>
        <li>평균가격: {averagePrice.toLocaleString()}원</li>
      </ul>
      <ul className="space-y-2">
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            {item.name} - {item.category} - {item.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  );
};
