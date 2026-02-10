import { StyledButton } from "./Button.styles";

export function Button({ variant = "primary", children, onClick }) {
  return (
    <StyledButton $variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
