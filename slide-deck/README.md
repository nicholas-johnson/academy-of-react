# Slide Deck

Shared slide deck component for the React course. Each module can use this to create their own slide presentations.

## Usage

In your module's slides folder:

```jsx
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { SlideDeck } from "slide-deck";
import { slides } from "./slides";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SlideDeck slides={slides} />
  </React.StrictMode>,
);
```

## Slide Types

### Title Slide

```js
{
  type: 'title',
  content: {
    title: 'Main Title',
    subtitle: 'Subtitle text',
    emoji: '🚀'
  }
}
```

### Standard Slide (bullet points)

```js
{
  type: 'standard',
  content: {
    title: 'Slide Title',
    points: ['Point 1', 'Point 2', 'Point 3'],
    emoji: '📝'
  }
}
```

### Code Slide

```js
{
  type: 'code',
  content: {
    title: 'Code Example',
    code: `const x = 1;`,
    highlights: ['Key point 1', 'Key point 2']
  }
}
```

### Comparison Slide (with bullet points)

```js
{
  type: 'comparison',
  content: {
    title: 'Compare Two Things',
    left: {
      label: 'Option A',
      items: ['Item 1', 'Item 2']
    },
    right: {
      label: 'Option B',
      items: ['Item 1', 'Item 2']
    }
  }
}
```

### Comparison Slide (with code blocks)

```js
{
  type: 'comparison',
  content: {
    title: 'Compare Code',
    left: {
      label: 'Before',
      code: `const x = 1;`
    },
    right: {
      label: 'After',
      code: `const x = 2;`
    }
  }
}
```

### Rules Slide (cards grid)

```js
{
  type: 'rules',
  content: {
    title: 'Key Rules',
    rules: [
      { rule: 'Rule Name', example: 'Example text', icon: '📌' }
    ]
  }
}
```

### Welcome Slide (centered list)

```js
{
  type: 'welcome',
  content: {
    title: 'Welcome Title',
    points: ['👋 Point 1', '🎯 Point 2', '💪 Point 3']
  }
}
```

### Modules Slide (grid of module cards)

```js
{
  type: 'modules',
  content: {
    title: 'Course Overview',
    modules: [
      { num: '1-2', name: 'Module Name', icon: '🧱' }
    ]
  }
}
```

## Requirements

Each module's slides folder needs:

- Tailwind CSS configured with the custom `primary` and `secondary` colors
- `react-router-dom` installed
- The `animate-float` and `animate-fade-in` animations in tailwind.config.js
