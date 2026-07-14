import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.025em;
`;

const Input = styled.input`
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #475569;
  }

  &:hover {
    border-color: #475569;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
  }
`;

function TextInputStyled() {
  return (
    <Wrapper>
      <Label htmlFor="wizard-name-sc">Wizard Name</Label>
      <Input
        type="text"
        id="wizard-name-sc"
        placeholder="Enter your name..."
      />
    </Wrapper>
  );
}

export default TextInputStyled;
