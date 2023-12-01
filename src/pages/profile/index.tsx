import Content from "@/components/Content";
import { useIsActiveTimer } from "@/hooks/useIsActiveTimer";
import { useStartTimer, useStopTimer, useTotalTimer } from "@/hooks/useTimer";
import { useUserInfo } from "@/hooks/useUserData";
import { msToTime } from "@/utils/msToTime";
import styled from "styled-components";

export default function Profile() {
  const { data: userInfo } = useUserInfo();
  const { data: isActiveTimer } = useIsActiveTimer();
  const { data: totalTimer } = useTotalTimer();

  const { mutate: startTimer } = useStartTimer();
  const { mutate: stopTimer } = useStopTimer();

  console.log(msToTime(totalTimer?.totalTime));

  return (
    <>
      <Content.Container>
        <Wrapper>
          <Row $gap={18}>
            <Box
              style={{
                backgroundColor: "#1A2962",
              }}
            >
              <ProfileImg alt="프로필 이미지" />
            </Box>
            <Box
              style={{
                flex: 1,
              }}
            >
              <Row $spaceBetween $fill>
                <Column
                  style={{
                    padding: "8px",
                  }}
                  $gap={10}
                  $spaceBetween
                >
                  <Column $gap={6}>
                    <Title>{userInfo?.username}</Title>
                    <SubTitle>{userInfo?.email}</SubTitle>
                  </Column>
                  <Row>
                    {!isActiveTimer ? (
                      <Button onClick={() => startTimer()}>공부 시작</Button>
                    ) : (
                      <Button onClick={() => stopTimer()}>공부 종료</Button>
                    )}
                  </Row>
                </Column>
                <Column $gap={6}>
                  <SubTitle>총 공부시간</SubTitle>
                  <Title>{msToTime(totalTimer?.totalTime).join(":")}</Title>
                  <SubTitle>총 공부량</SubTitle>
                  <Title>00:00:00</Title>
                </Column>
              </Row>
            </Box>
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
  padding-top: 20px;
`;

const Box = styled.div`
  margin-top: 40px;

  padding: 20px;
  border-radius: 10px;
  background-color: #e3e9ff;

  display: flex;
  align-items: stretch;
  gap: 20px;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #fff;
`;

const Column = styled.div<{ $gap?: number; $spaceBetween?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap}px;
  justify-content: ${(props) =>
    props.$spaceBetween ? "space-between" : "initial"};
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #000000;
`;

const SubTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #7a7a7a;
`;

const Row = styled.div<{
  $gap?: number;
  $spaceBetween?: boolean;
  $fill?: boolean;
}>`
  display: flex;
  gap: ${(props) => props.$gap}px;
  justify-content: ${(props) =>
    props.$spaceBetween ? "space-between" : "initial"};
  width: ${(props) => (props.$fill ? "100%" : "initial")};
`;

const Button = styled.button`
  width: 100%;

  padding: 14px 0;
  border-radius: 8px;
  background-color: #f2f5ff;
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
