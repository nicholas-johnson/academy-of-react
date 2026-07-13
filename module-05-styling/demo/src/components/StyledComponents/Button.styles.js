import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${(props) =>
    props.$variant === "secondary" ? "transparent" : "#6366f1"};
  color: ${(props) => (props.$variant === "secondary" ? "#6366f1" : "white")};
  border: ${(props) =>
    props.$variant === "secondary" ? "2px solid #6366f1" : "none"};

  &:hover {
    background: ${(props) =>
      props.$variant === "secondary" ? "rgba(99, 102, 241, 0.1)" : "#4f46e5"};
    transform: translateY(-2px);
  }
`;
