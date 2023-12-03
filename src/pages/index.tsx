import Content from "@/components/Content";
import { useGroupData } from "@/hooks/useGroupData";
import { useTimerById } from "@/hooks/useTimer";
import { useUserInfo } from "@/hooks/useUserData";
import { msToTime } from "@/utils/msToTime";
import { useEffect, useState } from "react";
import styled from "styled-components";

type StudentProps = {
  isStudy?: boolean;
  isMe?: boolean;
  student?: any;
};

export function Student(props: StudentProps) {
  const { data: timerInfo } = useTimerById(props.student?.id);
  const { data: userInfo } = useUserInfo();
  const [ms, setMs] = useState(0);
  const [timer, setTimer] = useState(["00", "00", "00"]);

  useEffect(() => {
    if (timerInfo) {
      const initialMs = timerInfo?.totalTime - (timerInfo?.totalTime % 1000);
      setMs(initialMs);
      setTimer(msToTime(initialMs));

      if (userInfo?.isStudy) {
        const interval = setInterval(() => {
          setMs((prevMs) => {
            const newMs = prevMs + 1000;
            setTimer(msToTime(newMs));
            return newMs;
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [timerInfo, userInfo?.isStudy]);

  return (
    <>
      <StudentWrapper $isStudy={props.isStudy}>
        <StudentImgWrapper>
          <StudentImg src={props?.student?.profileImage} />
        </StudentImgWrapper>
        <StudentColumn $isStudy={props.isStudy}>
          <h1>{props.student?.username}</h1>
          <p>{timer.join(":")}</p>
        </StudentColumn>
      </StudentWrapper>
    </>
  );
}

const StudentWrapper = styled.div<{ $isStudy?: boolean }>`
  display: flex;
  width: 160px;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  background-color: ${({ $isStudy }) => ($isStudy ? "#1a2962" : "#E3E9FF")};
  border-radius: 8px;
  cursor: pointer;
`;

const StudentColumn = styled.div<{ $isStudy?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: ${({ $isStudy }) => ($isStudy ? "#E3E9FF" : "#1a2962")};

  h1 {
    font-size: 12px;
    font-weight: 700;
  }

  p {
    font-size: 12px;
    font-weight: 500;
  }
`;

const StudentImgWrapper = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
`;

const StudentImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Index() {
  const { data: groupData } = useGroupData();
  const { data: userInfo } = useUserInfo();

  return (
    <>
      <Content.Container>
        <Wrapper>
          <Row $spaceBetween $fill>
            <Content.Box gap={30} cursor>
              <Row $gap={8} $center>
                <BoxImg src="/assets/images/loud.svg" alt="확성기" />
                <BoxText>조금씩이라도 꾸준히 해보자!</BoxText>
              </Row>
              <BoxImg
                style={{
                  width: 16,
                  height: 16,
                }}
                src="/assets/images/right.svg"
                alt="화살표"
              />
            </Content.Box>
            <Content.Box>
              <BoxImg src="/assets/images/book.svg" />
              <BoxText>
                <strong>
                  {
                    groupData?.students.filter(
                      (student: any) => student?.isStudy
                    )?.length
                  }
                  명
                </strong>{" "}
                공부중
              </BoxText>
            </Content.Box>
          </Row>
          <Row $gap={30} $wrap $fill>
            {groupData?.students
              .filter((student: any) => student?.status === "APPROVED")
              .map((student: any) => {
                return (
                  <Student
                    student={student}
                    key={student?.id}
                    isStudy={student?.isStudy}
                    isMe={student?.id === userInfo?.id}
                  />
                );
              })}
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

const Row = styled.div<{
  $gap?: number;
  $spaceBetween?: boolean;
  $center?: boolean;
  $wrap?: boolean;
  $fill?: boolean;
}>`
  display: flex;
  gap: ${(props) => props.$gap}px;
  justify-content: ${(props) =>
    props.$spaceBetween ? "space-between" : "initial"};
  width: ${(props) => (props.$fill ? "100%" : "initial")};
  align-items: ${(props) => (props.$center ? "center" : "initial")};
  flex-wrap: ${(props) => (props.$wrap ? "wrap" : "initial")};
`;

const BoxImg = styled.img`
  width: 22px;
  height: 22px;
  object-fit: cover;
`;

const BoxText = styled.div`
  color: #1c1b1f;
  font-size: 12px;
  font-weight: 500;

  strong {
    font-weight: 700;
  }
`;
