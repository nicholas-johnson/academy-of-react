import styled from "styled-components";

/* 🎨 TASK 2 — edit below */
/* Update the CSS inside each styled block to match the dark     */
/* theme. Change colours, add padding, border-radius, hover      */
/* effects, gradients, and proper typography.                    */

const StyledCard = styled.div`
  background: white;
  border: 1px solid black;
  width: 280px;
  font-family: "Times New Roman", serif;
`;

const SpellName = styled.h3`
  font-size: 16px;
  color: black;
  margin: 4px;
`;

const ElementBadge = styled.span`
  font-size: 11px;
  border: 1px solid black;
  display: inline-block;
  margin: 4px;
`;

const PowerBarTrack = styled.div`
  border: 1px solid black;
  height: 8px;
  margin: 4px;
`;

const PowerFill = styled.div`
  background: gray;
  height: 100%;
`;

const Description = styled.p`
  font-size: 13px;
  color: black;
  margin: 4px;
`;

function SpellCardStyled({ spell }) {
  return (
    <StyledCard>
      <SpellName>{spell.name}</SpellName>
      <ElementBadge>{spell.element}</ElementBadge>
      <PowerBarTrack>
        <PowerFill style={{ width: `${spell.power}%` }} />
      </PowerBarTrack>
      <Description>{spell.description}</Description>
    </StyledCard>
  );
}

export default SpellCardStyled;
