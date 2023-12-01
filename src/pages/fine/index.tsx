import Content from "@/components/Content";
import { useFineInfo, useMyFineInfo } from "@/hooks/useFine";
import { styled } from "styled-components";

type FineBoxProps = {
  fine: any;
};

function FineBox(props: FineBoxProps) {
  return (
    <>
      <FineWrapper>
        <Column
          $gap={36}
          style={{
            backgroundColor: "#F2F5FF",
            padding: "14px",
            borderRadius: "10px",
          }}
        >
          <Title
            style={{
              fontSize: "18px",
            }}
          >
            {props.fine?.username}
          </Title>
          <Column $gap={10}>
            <SubTitle>총 벌금</SubTitle>
            <Title
              style={{
                fontSize: "24px",
              }}
            >
              {props.fine?.fine.toLocaleString()}원
            </Title>
          </Column>
        </Column>
      </FineWrapper>
    </>
  );
}

const FineWrapper = styled.div`
  width: 180px;
`;

export default function Fine() {
  const { data: fineInfo } = useFineInfo();
  const { data: myFineInfo } = useMyFineInfo();

  return (
    <>
      <Content.Container>
        <Wrapper>
          <Row $fill $spaceBetween>
            <Title>벌금 목록</Title>
            {!myFineInfo?.fineStatus && myFineInfo?.fine && (
              <Button>
                <ButtonImg src="/assets/images/upload.svg" /> 사진 업로드
              </Button>
            )}
          </Row>
          <Row $gap={20} $wrap>
            {fineInfo?.map((fine: any, index: number) => (
              <FineBox fine={fine} key={index} />
            ))}
          </Row>
        </Wrapper>
      </Content.Container>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Column = styled.div<{ $gap?: number; $spaceBetween?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap}px;
`;

const Row = styled.div<{
  $gap?: number;
  $fill?: boolean;
  $spaceBetween?: boolean;
  $wrap?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$gap}px;
  width: ${(props) => (props.$fill ? "100%" : "initial")};
  justify-content: ${(props) =>
    props.$spaceBetween ? "space-between" : "initial"};
  flex-wrap: ${(props) => (props.$wrap ? "wrap" : "initial")};
`;

const SubTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #7a7a7a;
`;

const Button = styled.button`
  border-radius: 10px;
  background-color: #e3e9ff;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 12px 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ButtonImg = styled.img`
  width: 20px;
  height: 20px;
`;
