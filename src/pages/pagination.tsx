import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Pagination() {
  const totalPages = 10;

  const [selected, setSelected] = useState(0);
  const [startNumber, setStartNumber] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setSelected(Number(router.query.page) || 0);
  }, [router.query.page]);

  function handleSelect(page: number) {
    setSelected(page);
    setStartNumber(Math.min(Math.max(page - 2, 0), totalPages - 5));
    router.push({
      pathname: router.pathname,
      query: { page },
    });
  }

  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Button
            onClick={() => handleSelect(index + startNumber)}
            $isSelected={selected === index + startNumber}
            key={index + startNumber}
          >
            {index + startNumber + 1}
          </Button>
        ))}
    </>
  );
}

const Button = styled.button<{ $isSelected?: boolean }>`
  width: 40px;
  height: 40px;
  background-color: ${({ $isSelected }) => ($isSelected ? "#1a2962" : "#fff")};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#1a2962")};
  font-weight: bold;
  outline: none;
`;
