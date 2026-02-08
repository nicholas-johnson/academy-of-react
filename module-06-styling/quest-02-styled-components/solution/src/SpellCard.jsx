import styled, { keyframes } from "styled-components";

// Element colors
const elementColors = {
  fire: "#f97316",
  water: "#3b82f6",
  earth: "#84cc16",
  air: "#a78bfa",
  arcane: "#8b5cf6",
};

// Animation for the glow effect
const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

// Styled Components
const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  /* Dynamic border color based on element prop */
  border-color: ${(props) => elementColors[props.$element]}20;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => elementColors[props.$element]};
  }

  &:hover {
    transform: translateY(-8px);
    border-color: ${(props) => elementColors[props.$element]}60;
    box-shadow: 0 20px 40px ${(props) => elementColors[props.$element]}30;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ElementBadge = styled.span`
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const SpellName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
`;

const StatLabel = styled.span`
  color: rgba(255, 255, 255, 0.5);
`;

const StatValue = styled.span`
  font-weight: 600;
  color: ${(props) =>
    props.$highlight ? elementColors[props.$element] : "white"};
`;

// Power bar components
const PowerBarContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  height: 0.5rem;
  overflow: hidden;
`;

const PowerBarFill = styled.div`
  height: 100%;
  border-radius: 0.5rem;
  transition: width 0.5s ease;

  /* Dynamic width and color based on props */
  width: ${(props) => props.$power}%;
  background: ${(props) => elementColors[props.$element]};

  /* Animated glow for high power spells */
  ${(props) =>
    props.$power >= 80 &&
    `
    animation: ${pulse} 2s ease-in-out infinite;
    box-shadow: 0 0 10px ${elementColors[props.$element]};
  `}
`;

const PowerLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.25rem;
`;

function SpellCard({ spell }) {
  const { name, element, power, manaCost, description } = spell;

  return (
    <Card $element={element}>
      <Header>
        <SpellName>{name}</SpellName>
      </Header>

      <Description>{description}</Description>

      <StatsRow>
        <Stat>
          <StatLabel>Mana:</StatLabel>
          <StatValue $element={element} $highlight>
            {manaCost}
          </StatValue>
        </Stat>
        <Stat>
          <StatLabel>Element:</StatLabel>
          <StatValue>{element}</StatValue>
        </Stat>
      </StatsRow>

      <PowerBarContainer>
        <PowerBarFill $power={power} $element={element} />
      </PowerBarContainer>
      <PowerLabel>
        <span>Power</span>
        <span>{power}/100</span>
      </PowerLabel>
    </Card>
  );
}

export default SpellCard;
