// ============================================
// GLOBAL DATA with STABLE IDs (crucial for React keys!)
// ============================================
let nextId = 0;

const createItems = (count) =>
  Array.from({ length: count }, () => ({
    id: nextId++,
    value: Math.floor(Math.random() * 10000),
  }));

window.items = createItems(100000);

// Track what changed for visualization
let lastRenderedItems = null;
let changedIndices = new Set();

const updateArraySize = () => {
  document.getElementById("array-size").textContent =
    items.length.toLocaleString();
};
updateArraySize();

// ============================================
// TRADITIONAL DOM RENDERING
// Always rebuilds everything from scratch
// ============================================
const renderWithDOM = () => {
  const list = document.getElementById("dom-list");
  const timingEl = document.getElementById("dom-timing");
  const statEl = document.getElementById("dom-time");
  const changesStatEl = document.getElementById("dom-changes");
  const changesTextEl = document.getElementById("dom-changes-text");

  const start = performance.now();

  // ALWAYS clear and rebuild everything - this is the problem!
  list.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    const li = document.createElement("li");
    li.textContent = items[i].value.toLocaleString();
    if (changedIndices.has(i)) {
      li.className = "changed";
    }
    list.appendChild(li);
  }

  const end = performance.now();
  const time = (end - start).toFixed(2);

  // DOM always changes ALL nodes
  const nodesChanged = items.length;

  timingEl.textContent = `Rendered in ${time}ms`;
  timingEl.className =
    "timing " + (parseFloat(time) > 50 ? "slow" : "fast");
  statEl.textContent = time + "ms";
  changesStatEl.textContent = nodesChanged.toLocaleString();
  changesTextEl.textContent = `Rebuilt ALL ${nodesChanged.toLocaleString()} DOM nodes`;

  updateArraySize();
};

// ============================================
// REACT VIRTUAL DOM RENDERING
// Only updates what actually changed!
// ============================================
const reactRoot = ReactDOM.createRoot(
  document.getElementById("react-root"),
);
let reactRenderedOnce = false;

const renderWithReact = () => {
  const timingEl = document.getElementById("react-timing");
  const statEl = document.getElementById("react-time");
  const changesStatEl = document.getElementById("react-changes");
  const changesTextEl = document.getElementById("react-changes-text");

  const start = performance.now();

  // Create React elements with STABLE keys (item.id, not index!)
  const listItems = items.map((item, index) =>
    React.createElement(
      "li",
      {
        key: item.id, // Stable ID - React can track this across renders!
        className: changedIndices.has(index) ? "changed" : "",
      },
      item.value.toLocaleString(),
    ),
  );

  const list = React.createElement("ol", null, listItems);

  // React's render() diffs against previous render
  reactRoot.render(list);

  const end = performance.now();
  const time = (end - start).toFixed(2);

  // Calculate how many nodes React actually needed to update
  let nodesChanged;
  if (!reactRenderedOnce) {
    nodesChanged = items.length; // First render creates all nodes
    reactRenderedOnce = true;
  } else {
    nodesChanged = changedIndices.size || 0; // Subsequent renders only update changed
  }

  timingEl.textContent = `Rendered in ${time}ms`;
  timingEl.className =
    "timing " + (parseFloat(time) > 50 ? "slow" : "fast");
  statEl.textContent = time + "ms";
  changesStatEl.textContent = nodesChanged.toLocaleString();

  if (nodesChanged === items.length) {
    changesTextEl.textContent = `Initial render: created ${nodesChanged.toLocaleString()} nodes`;
  } else if (nodesChanged === 0) {
    changesTextEl.textContent = `No changes detected - 0 DOM updates!`;
  } else {
    changesTextEl.textContent = `Only updated ${nodesChanged} node(s) via diffing!`;
  }

  updateArraySize();
};

// ============================================
// CHANGE ONE VALUE - The key demonstration!
// ============================================
const changeOneValue = () => {
  // Pick a random index
  const randomIndex = Math.floor(Math.random() * items.length);
  const oldValue = items[randomIndex].value;
  const newValue = Math.floor(Math.random() * 10000);

  // Change the value (keeping the same id!)
  items[randomIndex].value = newValue;

  // Track what changed for visualization
  changedIndices.clear();
  changedIndices.add(randomIndex);

  console.log(`Changed items[${randomIndex}]: ${oldValue} → ${newValue}`);

  // Render both to compare
  renderWithDOM();
  renderWithReact();

  // Clear highlight after animation
  setTimeout(() => {
    changedIndices.clear();
  }, 1500);
};

// ============================================
// REGENERATE ALL NUMBERS
// ============================================
const regenerateNumbers = () => {
  window.items = createItems(items.length);
  changedIndices.clear();
  reactRenderedOnce = false;
  lastRenderedItems = null;

  updateArraySize();

  // Clear both panels
  document.getElementById("dom-list").innerHTML = "";
  document.getElementById("dom-timing").textContent = "";
  document.getElementById("dom-changes-text").textContent = "";
  document.getElementById("dom-time").textContent = "-";
  document.getElementById("dom-changes").textContent = "-";

  reactRoot.render(null);
  document.getElementById("react-timing").textContent = "";
  document.getElementById("react-changes-text").textContent = "";
  document.getElementById("react-time").textContent = "-";
  document.getElementById("react-changes").textContent = "-";
};

// ============================================
// INITIAL SETUP
// ============================================
console.log(
  "%c Virtual DOM Demo",
  "font-size: 20px; font-weight: bold; color: #3b82f6;",
);
console.log('%cThe "items" array is available globally.', "color: #888;");
console.log(
  "%cTry: items[0].value = 999999; then click the render buttons",
  "color: #4ade80;",
);
