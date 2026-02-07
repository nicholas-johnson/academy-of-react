# Module 1: React Elements with createElement()

## Story Context

Welcome to the Arcane Academy! You've just arrived at the grand Enrollment Hall, clutching your acceptance letter. Before you can begin your magical training, you must register yourself in the Academy's ancient systems using the `React.createElement()` incantation — the original spell for creating React elements.

## Learning Objectives

By the end of this module, you will:

- Understand how React creates elements using JavaScript
- Work with JavaScript objects and arrays to represent data
- Render elements to the DOM using ReactDOM
- Create nested element structures
- Write functions that calculate values

## React Concepts Covered

- `React.createElement()`
- `ReactDOM.render()` / `ReactDOM.createRoot()`
- Element properties and children
- Rendering lists of elements
- Basic component structure

## JavaScript Concepts

- Objects and object properties
- Arrays and array iteration
- Functions and return values
- Template strings (for concatenation)
- DOM manipulation basics

## Slides

Start with the introduction slides before the demos:

1. Navigate to the `slides/` folder
2. Run `npm install` then `npm run dev`
3. Open http://localhost:5173
4. Use arrow keys or buttons to navigate

The slides cover:

- What is React?
- Why learn React?
- Course structure and resources
- What to expect in Module 1

## Setup Instructions

This module uses React from a CDN, so no build tools are required!

1. Navigate to the `demo/` folder
2. Open `index.html` in your web browser
3. Open the browser's developer console to see any output
4. Study the code in both `index.html` and `app.js`

## Demo Walkthrough

The demo (`demo/app.js`) shows:

1. **Creating a student object** with properties like name, house, and magicLevel
2. **Using React.createElement()** to create React elements representing the student
3. **Rendering to the DOM** using ReactDOM

Key points to notice:

- `React.createElement(type, props, ...children)` creates a React element
- The first argument is the HTML tag (string) or component
- The second argument is an object of properties/attributes
- Remaining arguments are the children (text or more elements)
- We use `ReactDOM.createRoot()` and `root.render()` in React 18

## Quests

### Quest 1: Basic Elements

**Difficulty**: ⭐ Beginner

Create a student object with your wizard's stats and render it using `createElement()`.

[Start Quest →](./quest-01-basic-elements/)

### Quest 2: Rendering Arrays

**Difficulty**: ⭐⭐ Beginner-Intermediate

Build an array of multiple students and render them as a list using `.map()`.

[Start Quest →](./quest-02-rendering-arrays/)

## Bonus Mastery Challenge

Once you've completed both quests, try this:

**The Student Comparison Tool**

Create a small application that:

- Has TWO student objects with different stats
- Calculates and displays which student is more powerful
- Shows a comparison of their stats side-by-side
- Has a button that "swaps" which student is on the left vs right

This combines object manipulation, createElement, event handling, and DOM updates!

## Key Takeaways

- React elements are created with `React.createElement()`
- Elements are just JavaScript objects describing what should appear on screen
- We can use regular JavaScript (objects, arrays, functions) to generate React elements
- `createElement` can be nested to create complex structures
- This is the foundation upon which JSX is built (coming in Module 2!)

---

**Next Module**: [Module 2: JSX and Components](../module-02-jsx-components/) — Learn the modern JSX syntax that makes React much easier to read and write!
