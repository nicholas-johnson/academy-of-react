import { Flame, Snowflake, Heart, Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function SpellList() {
  const { t } = useLanguage();

  const spells = [
    { key: "fireball", Icon: Flame, power: 45, mana: 30 },
    { key: "iceBlast", Icon: Snowflake, power: 35, mana: 25 },
    { key: "heal", Icon: Heart, power: 40, mana: 35 },
    { key: "shield", Icon: Shield, power: 0, mana: 20 },
  ];

  return (
    <div className="section">
      <h2>{t("spells")}</h2>
      <div className="spell-grid">
        {spells.map((spell) => (
          <div key={spell.key} className="spell-card">
            <spell.Icon className="spell-icon" size={32} />
            <div className="spell-info">
              <div className="spell-name">{t(spell.key)}</div>
              <div className="spell-stats">
                <span>
                  {t("power")}: {spell.power}
                </span>
                <span>
                  {t("mana")}: {spell.mana}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
