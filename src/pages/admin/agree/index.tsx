import Content from "@/components/Content";
import { StudentStatus, useAgreeUser, useDenyUser } from "@/hooks/useStatus";
import { useUsersInfo } from "@/hooks/useUserData";
import styled from "styled-components";

type StudentProps = {
  user: any;
};

function Student({ user }: StudentProps) {
  const { mutate: agreeUser } = useAgreeUser();
  const { mutate: denyUser } = useDenyUser();

  return (
    <>
      <Column $gap={4}>
        <StudentWrapper>
          <StudentImage src={user?.profileImage} />
          <StudentName>{user?.username}</StudentName>
        </StudentWrapper>
        <Row $gap={4}>
          <StudentButton
            style={{
              backgroundColor: "#1A2962",
              color: "#fff",
            }}
            onClick={() => agreeUser(user?.id)}
          >
            O
          </StudentButton>
          <StudentButton
            style={{
              backgroundColor: "#E3E9FF",
              color: "#1A2962",
            }}
            onClick={() => denyUser(user?.id)}
          >
            X
          </StudentButton>
        </Row>
      </Column>
    </>
  );
}

const StudentWrapper = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #e3e9ff;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Column = styled.div<{ $gap?: number; $spaceBetween?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap}px;
`;

const StudentImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
`;

const StudentName = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const StudentButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  background-color: #e3e9ff;
  color: #1a2962;
  font-size: 18px;
  cursor: pointer;
  font-weight: 500;
  flex: 1;
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

export default function Agree() {
  const { data: usersInfo } = useUsersInfo();

  return (
    <>
      <Content.Container>
        <Wrapper>
          {usersInfo
            ?.filter((user: any) => user?.status === StudentStatus.PENDING)
            ?.map((user: any) => (
              <Student user={user} key={user?.id} />
            ))}
        </Wrapper>
      </Content.Container>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding-top: 20px;
`;
