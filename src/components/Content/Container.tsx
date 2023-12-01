import styled from "styled-components";
import Header from "../Header";
import Head from "next/head";

type Props = {
  children?: React.ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <>
      <Head>
        <title>열버타</title>
      </Head>
      <Header />
      <Wrapper>
        <Content>{children}</Content>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;

  display: flex;
  justify-content: center;

  padding-top: 60px;
`;

const Content = styled.div`
  width: 1300px;
  height: 100%;

  display: flex;
  flex-direction: column;

  @media (max-width: 1300px) {
    width: 100%;
  }
`;
