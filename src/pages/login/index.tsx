import { useRouter } from "next/router";
import styled from "styled-components";

export default function Login() {
  const router = useRouter();

  return (
    <>
      <Wrapper>
        <Container>
          <Row>
            <LogoImg src="/assets/logo.svg" alt="로고" />
            <p>
              <strong>열버타</strong>에 로그인하기
            </p>
          </Row>
          <Button
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
            }
          >
            <ButtonImg src="/assets/images/google.svg" />
            구글로 로그인하기
          </Button>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 500px;
  width: 90%;
  height: 280px;
  background-color: #85a0ff;
  border-radius: 10px;

  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100%;

  padding: 14px 0;
  border-radius: 8px;
  background-color: #e3e9ff;
  color: #1a2962;
  font-size: 18px;
  cursor: pointer;
  font-weight: 500;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  strong {
    font-weight: 700;
  }
`;

const ButtonImg = styled.img`
  width: 24px;
`;

const LogoImg = styled.img`
  height: 80px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  p {
    font-size: 28px;
    font-weight: 500;
    color: #e3e9ff;
  }

  strong {
    font-weight: 700;
  }
`;
