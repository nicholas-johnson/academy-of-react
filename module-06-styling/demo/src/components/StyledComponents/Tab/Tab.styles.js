import styled from "styled-components";

export const StyledTab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: ${(props) => (props.$active ? "#6366f1" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#94a3b8")};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.$active ? "#4f46e5" : "rgba(148, 163, 184, 0.1)"};
    color: ${(props) => (props.$active ? "white" : "#cbd5e1")};
  }
`;
