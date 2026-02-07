# Quest 2: Interactive Simulator (Strategic Hydration)

## Story Context

⚔️ Build a battle visualizer that shows Academy battle history! Most of the page is static (fast!), but we need interactive elements for the battle simulator. Learn to strategically place JavaScript only where needed.

## Objective

Build a Battle Visualizer with:

- Static battle history (Content Collections)
- Interactive battle simulator (React island)
- Live damage calculator
- Strategic hydration with different directives
- Performance comparison

## Technical Concepts

- Strategic JavaScript placement
- Performance measurement
- When to use each client directive
- Bundle size optimization
- Comparing Islands vs Full React

## Requirements

### 1. Static Battle History

Create `src/content/battles/` with battle records:

```yaml
---
# src/content/battles/great-duel.md
title: The Great Duel of Silverpine
date: 2024-01-15
winner: Professor Elara
loser: Dark Wizard Malachar
duration: 45
outcome: decisive
spellsUsed: 23
---
The legendary duel at Silverpine Forest...
```

Configure collection:

```ts
// src/content/config.ts
const battlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    winner: z.string(),
    loser: z.string(),
    duration: z.number(),
    outcome: z.enum(["decisive", "close", "draw"]),
    spellsUsed: z.number(),
  }),
});
```

Display statically:

```astro
---
// src/pages/battles/index.astro
import { getCollection } from 'astro:content';

const battles = await getCollection('battles');
---

<h1>Battle History</h1>

<!-- Static HTML - Zero JavaScript! -->
{battles.map(battle => (
  <div class="battle-card">
    <h3>{battle.data.title}</h3>
    <p>Winner: {battle.data.winner}</p>
    <p>Date: {battle.data.date.toDateString()}</p>
    <a href={`/battles/${battle.id}`}>View Details</a>
  </div>
))}
```

### 2. Interactive Battle Simulator

Create `src/islands/BattleSimulator.jsx`:

```jsx
import { useState } from "react";

export default function BattleSimulator() {
  const [wizard1, setWizard1] = useState({ name: "", hp: 100, mana: 50 });
  const [wizard2, setWizard2] = useState({ name: "", hp: 100, mana: 50 });
  const [log, setLog] = useState([]);

  const castSpell = (caster, target, spell) => {
    if (caster.mana < spell.cost) {
      setLog((prev) => [...prev, `${caster.name} doesn't have enough mana!`]);
      return;
    }

    // Calculate damage
    const damage = Math.floor(Math.random() * spell.power + spell.power / 2);

    // Update states
    if (caster === wizard1) {
      setWizard1({ ...wizard1, mana: wizard1.mana - spell.cost });
      setWizard2({ ...wizard2, hp: Math.max(0, wizard2.hp - damage) });
    } else {
      setWizard2({ ...wizard2, mana: wizard2.mana - spell.cost });
      setWizard1({ ...wizard1, hp: Math.max(0, wizard1.hp - damage) });
    }

    setLog((prev) => [
      ...prev,
      `${caster.name} cast ${spell.name} dealing ${damage} damage!`,
    ]);
  };

  const spells = [
    { name: "Fireball", power: 30, cost: 15 },
    { name: "Ice Shard", power: 20, cost: 10 },
    { name: "Lightning", power: 40, cost: 20 },
  ];

  return (
    <div className="simulator">
      <div className="wizards">
        <div className="wizard">
          <input
            value={wizard1.name}
            onChange={(e) => setWizard1({ ...wizard1, name: e.target.value })}
            placeholder="Wizard 1 name"
          />
          <div>HP: {wizard1.hp}</div>
          <div>Mana: {wizard1.mana}</div>
          <div className="spells">
            {spells.map((spell) => (
              <button
                key={spell.name}
                onClick={() => castSpell(wizard1, wizard2, spell)}
                disabled={wizard1.hp === 0 || wizard2.hp === 0}
              >
                {spell.name}
              </button>
            ))}
          </div>
        </div>

        <div className="wizard">
          <input
            value={wizard2.name}
            onChange={(e) => setWizard2({ ...wizard2, name: e.target.value })}
            placeholder="Wizard 2 name"
          />
          <div>HP: {wizard2.hp}</div>
          <div>Mana: {wizard2.mana}</div>
          <div className="spells">
            {spells.map((spell) => (
              <button
                key={spell.name}
                onClick={() => castSpell(wizard2, wizard1, spell)}
                disabled={wizard1.hp === 0 || wizard2.hp === 0}
              >
                {spell.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="battle-log">
        <h3>Battle Log</h3>
        {log.map((entry, i) => (
          <p key={i}>{entry}</p>
        ))}
      </div>

      {(wizard1.hp === 0 || wizard2.hp === 0) && (
        <div className="winner">
          {wizard1.hp === 0 ? wizard2.name : wizard1.name} wins!
        </div>
      )}
    </div>
  );
}
```

### 3. Strategic Island Placement

Create `src/pages/simulator.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import BattleSimulator from '../islands/BattleSimulator.jsx';
import Comments from '../islands/Comments.jsx';
import Newsletter from '../islands/Newsletter.jsx';
---

<Layout title="Battle Simulator">
  <!-- Static intro - No JS -->
  <div class="intro">
    <h1>Interactive Battle Simulator</h1>
    <p>Test your battle strategies in real-time!</p>
  </div>

  <!-- Critical interactive content - Load immediately -->
  <BattleSimulator client:load />

  <!-- Static content about battles -->
  <section>
    <h2>Battle Rules</h2>
    <p>Each wizard starts with 100 HP and 50 mana...</p>
  </section>

  <!-- Below fold - Load when visible -->
  <Comments client:visible postId="simulator" />

  <!-- Way below fold - Load when idle -->
  <Newsletter client:idle />
</Layout>
```

### 4. Performance Measurement

Create a comparison page:

```astro
---
// src/pages/performance.astro
---

<Layout title="Performance Comparison">
  <h1>Islands Architecture Performance</h1>

  <div class="comparison">
    <div class="metric">
      <h3>JavaScript Bundle</h3>
      <p>Astro Islands: ~15KB</p>
      <p>Full React SPA: ~120KB</p>
      <p class="savings">Savings: 87.5%</p>
    </div>

    <div class="metric">
      <h3>Time to Interactive</h3>
      <p>Astro Islands: ~0.5s</p>
      <p>Full React SPA: ~2.5s</p>
      <p class="savings">5x faster!</p>
    </div>

    <div class="metric">
      <h3>Lighthouse Score</h3>
      <p>Astro Islands: 98-100</p>
      <p>Full React SPA: 70-85</p>
    </div>
  </div>

  <h2>Bundle Size Breakdown</h2>
  <pre>
    dist/
    ├── _astro/
    │   ├── BattleSimulator.[hash].js   # 12KB (React + component)
    │   ├── Comments.[hash].js           # 3KB
    │   └── Newsletter.[hash].js         # 2KB
    └── (pages are static HTML)
  </pre>

  <h2>Run Your Own Test</h2>
  <ol>
    <li>Build: <code>npm run build</code></li>
    <li>Check dist/ folder size</li>
    <li>Run Lighthouse audit</li>
    <li>Compare with React SPA</li>
  </ol>
</Layout>
```

## Acceptance Criteria

✅ Static battle history with Content Collections  
✅ Interactive simulator with `client:load`  
✅ Comments with `client:visible` (below fold)  
✅ Newsletter with `client:idle`  
✅ Performance comparison page  
✅ Build size documented  
✅ Working battle simulator logic  
✅ At least 3 battle content files

## Strategic Hydration Decision Tree

```
Is the component interactive?
├─ No → Don't use React, use static Astro
└─ Yes
   └─ Is it above the fold?
      ├─ Yes → client:load
      └─ No
         └─ Is it critical for UX?
            ├─ Yes → client:idle
            └─ No → client:visible
```

## Hints

<details>
<summary>Hint 1: When to Use Which Directive</summary>

- **client:load**: Search bars, navigation, critical UI
- **client:idle**: Modals, tooltips, non-critical features
- **client:visible**: Comments, related content, footers
- **client:media**: Mobile menus, responsive components
- **No directive**: Everything else (static is fastest!)
</details>

<details>
<summary>Hint 2: Measuring Bundle Size</summary>

```bash
# Build the site
npm run build

# Check bundle sizes
ls -lh dist/_astro/

# Compare page sizes
du -sh dist/*.html
```

</details>

<details>
<summary>Hint 3: Performance Testing</summary>

1. Use Chrome DevTools Performance tab
2. Run Lighthouse audit (npm run preview)
3. Check Network tab for JS downloads
4. Compare First Load vs Full React app
</details>

## Bonus Challenges

- Add spell selection from dropdown
- Implement healing spells
- Add animation effects (CSS or React)
- Create battle replay feature
- Add multiplayer with WebSocket
- Implement different wizard classes
- Add sound effects
- Create leaderboard (static + island)
- Add battle history recording

---

**Previous Quest**: [Quest 1: Knowledge Base ←](../quest-01-knowledge-base/)  
**Next Quest**: [Quest 3: Deployment →](../quest-03-deployment/)
