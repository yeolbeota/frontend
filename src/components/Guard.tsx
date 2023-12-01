import { useUserInfo } from "@/hooks/useUserData";
import { styled } from "styled-components";
import Content from "./Content";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Guard({ children }: Props) {
  const { data: userInfo } = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) return;

    if (router.pathname !== "/login" && userInfo?.status !== "APPROVED") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, userInfo?.status]);

  return (
    <>
      {router.pathname === "/login" || userInfo?.status === "APPROVED" ? (
        [children]
      ) : (
        <>
          <Content.Container>
            <PendingWrapper>
              <Box>
                <PendingImage src="/assets/logo.svg" />
                <Column $gap={8}>
                  <PendingTitle>
                    {userInfo?.status === "PENDING" && "승인 대기 중입니다"}
                    {userInfo?.status === "REJECTED" && "승인 거절 되었습니다"}
                  </PendingTitle>
                  <BoxText
                    style={{
                      fontSize: 14,
                      color: "#6c6b6f",
                    }}
                  >
                    담임선생님께 문의해주세요!
                  </BoxText>
                </Column>
              </Box>
            </PendingWrapper>
          </Content.Container>
        </>
      )}
    </>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const PendingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PendingTitle = styled.h1`
  color: #1c1b1f;
  font-size: 24px;
  font-weight: 500;
`;

const PendingImage = styled.img`
  height: 80px;
`;

const Column = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.$gap}px;
`;

const BoxText = styled.div`
  color: #1c1b1f;
  font-size: 12px;
  font-weight: 500;

  strong {
    font-weight: 700;
  }
`;
