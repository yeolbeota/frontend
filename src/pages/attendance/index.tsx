import Content from "@/components/Content";
import { useUsersInfo } from "@/hooks/useUserData";
import styled from "styled-components";

function Student({ student }: any) {
  return (
    <>
      <StudentWrapper>
        <Name>{student?.username}</Name>
        <WeekWrapper>
          <Day>
            오전<p>1:20</p>
          </Day>
          <Day>화</Day>
          <Day>수</Day>
          <Day>목</Day>
          <Day>금</Day>
          <Day>토</Day>
          <Day>일</Day>
        </WeekWrapper>
      </StudentWrapper>
    </>
  );
}

const StudentWrapper = styled.div`
  border-radius: 10px;
  background-color: #e3e9ff;
`;

const WeekWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Day = styled.div`
  padding: 12px;
  border-radius: 10px;
  background-color: #e3e9ff;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 12px;
    font-weight: 500;
    color: #000000;
  }
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  padding: 10px;
`;

export default function Attendance() {
  const { data: usersInfo } = useUsersInfo();

  return (
    <>
      <Content.Container>
        <Wrapper>
          {usersInfo?.map((user: any) => (
            <Student student={user} key={user?.id} />
          ))}
        </Wrapper>
      </Content.Container>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  gap: 20px;
  padding-top: 40px;
`;
