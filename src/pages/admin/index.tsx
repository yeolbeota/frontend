import Content from "@/components/Content";
import { styled } from "styled-components";

export default function AdminIndex() {
  return (
    <>
      <Content.Container>
        <Wrapper></Wrapper>
      </Content.Container>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 20px;
`;
