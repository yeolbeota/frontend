import Content from "@/components/Content";
import { useRank } from "@/hooks/useRank";
import { msToTime } from "@/utils/msToTime";
import styled from "styled-components";

function Student({ student, rank }: any) {
  return (
    <>
      <StudentRow $spaceBetween $fill>
        <Row $gap={12}>
          <StudentCategory
            style={{
              width: "34px",
              textAlign: "center",
            }}
          >
            {rank}
          </StudentCategory>
          <StudentCategory
            style={{
              flex: 1,
            }}
          >
            {student?.username}
          </StudentCategory>
        </Row>
        <StudentCategory
          style={{
            width: "100px",
          }}
        >
          {msToTime(student?.totalTime).join(":")}
        </StudentCategory>
      </StudentRow>
    </>
  );
}

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

const Category = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: #575757;
`;

const StudentRow = styled(Row)`
  border-radius: 10px;
  padding: 14px 8px;

  &:nth-child(even) {
    background-color: #e3e9ff;
  }
`;

const StudentCategory = styled(Category)`
  color: #101010;
`;

export default function Ranking() {
  const { data: rank } = useRank();

  return (
    <>
      <Content.Container>
        <Wrapper>
          <Row
            $spaceBetween
            $fill
            style={{
              padding: "14px 8px",
            }}
          >
            <Row $gap={12}>
              <Category
                style={{
                  width: "34px",
                }}
              >
                순위
              </Category>
              <Category
                style={{
                  flex: 1,
                }}
              >
                이름
              </Category>
            </Row>
            <Category
              style={{
                width: "100px",
              }}
            >
              공부시간
            </Category>
          </Row>
          {rank?.map((student: any, index: any) => (
            <Student
              key={student?.id}
              student={student}
              rank={index + 1}
            ></Student>
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
  gap: 12px;
  padding-top: 40px;
`;
