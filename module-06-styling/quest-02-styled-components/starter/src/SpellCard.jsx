// TODO: Import styled-components
// import styled from 'styled-components'

// Element colors for reference:
const elementColors = {
  fire: "#f97316",
  water: "#3b82f6",
  earth: "#84cc16",
  air: "#a78bfa",
  arcane: "#ec4899",
};

const elementEmojis = {
  fire: "🔥",
  water: "💧",
  earth: "🌿",
  air: "💨",
  arcane: "✨",
};

// TODO: Create styled components
//
// Example:
// const Card = styled.div`
//   background: ${props => props.$color};
//   padding: 1.5rem;
//   border-radius: 1rem;
//
//   &:hover {
//     transform: translateY(-4px);
//   }
// `

function SpellCard({ spell }) {
  const { name, element, power, manaCost, description } = spell;

  // TODO: Replace this basic markup with styled components
  // Requirements:
  // 1. Card with element-colored border/accent
  // 2. Spell name with element emoji
  // 3. Power bar that fills based on power level (0-100)
  // 4. Mana cost display
  // 5. Description text
  // 6. Hover effect

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <h3>
        {elementEmojis[element]} {name}
      </h3>
      <p>Element: {element}</p>
      <p>Power: {power}</p>
      <p>Mana: {manaCost}</p>
      <p>{description}</p>
    </div>
  );
}

export default SpellCard;
