import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  gap?: number;
  cursor?: boolean;
  onClick?: () => void;
};

export default function Box(props: Props) {
  return (
    <>
      <Wrapper onClick={props.onClick} $cursor={props.cursor} $gap={props.gap}>
        {props.children}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div<{ $gap?: number; $cursor?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  gap: ${(props) => props.$gap ?? 8}px;
  border-radius: 4px;
  background-color: #f2f5ff;
  cursor: ${(props) => (props.$cursor ? "pointer" : "default")};
`;
