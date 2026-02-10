import { Container, Wrapper, TabBarInner } from "./TabBar.styles";

export function TabBar({ children }) {
  return (
    <Container>
      <Wrapper>
        <TabBarInner>{children}</TabBarInner>
      </Wrapper>
    </Container>
  );
}
