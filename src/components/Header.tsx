import loggout from "@/api/auth/logout";
import { useUserInfo } from "@/hooks/useUserData";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Header() {
  const { data: userInfo } = useUserInfo();
  const router = useRouter();

  const menuList = [
    { name: "벌금", href: "/fine" },
    { name: "랭킹", href: "/ranking" },
    { name: "출석부", href: "/attendance" },
    { name: "프로필", href: "/profile" },
  ];

  const pendingMenuList = [{ name: "로그아웃", href: "/logout" }];

  return (
    <>
      <Wrapper>
        <Container>
          <Logo href="/">
            <LogoImg src="/assets/logo.svg" alt="로고" />
            <Title>열버타</Title>
          </Logo>
          <Row $gap={24}>
            {userInfo?.status === "APPROVED"
              ? menuList.map((menu) => (
                  <Menu
                    key={menu.name}
                    href={menu.href}
                    $isSelected={router.pathname.includes(menu.href)}
                  >
                    {menu.name}
                  </Menu>
                ))
              : pendingMenuList.map((menu) => (
                  <Menu
                    key={menu.name}
                    href={menu.href}
                    $isSelected={router.pathname.includes(menu.href)}
                  >
                    {menu.name}
                  </Menu>
                ))}
          </Row>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1300px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoImg = styled.img`
  height: 40px;
`;

const Row = styled.div<{ $gap?: number }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$gap}px;
`;

const Title = styled.h1`
  color: #1c1b1f;
  font-size: 20px;
  font-weight: 700;
`;

const Menu = styled(Link)<{ $isSelected?: boolean }>`
  color: ${(props) => (props.$isSelected ? "#1A2962" : "#8592C5")};
  font-size: 16px;
  font-weight: 500;
`;
