import { StyledTab } from "./Tab.styles";

export function Tab({ value, activeTab, onTabChange, children }) {
  const active = value === activeTab;
  
  return (
    <StyledTab $active={active} onClick={() => onTabChange(value)}>
      {children}
    </StyledTab>
  );
}
