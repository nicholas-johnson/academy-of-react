# Quest 2: Layout Component

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy's building is organized into distinct areas: the Grand Hall (header), the Library Corridor (sidebar), and the Main Chambers (content area). The Headmaster wants a consistent layout for all Academy applications. Your task: create an `AcademyLayout` component that uses the `children` prop to arrange any content into this three-section layout. This demonstrates the power of composition!

## Objective

Build an `AcademyLayout` component that uses the `children` prop to create a reusable page structure with header, sidebar, and main content areas.

## Technical Concepts

- The `children` prop
- Component composition
- Layout components
- Flexible, reusable components
- Props spreading (optional)

## Requirements

Create a Vite React project with:

1. Proper Vite project structure (`src/`, `package.json`, `vite.config.js`)

1. An `AcademyLayout` component that creates a page structure with:
   - Header area (for titles, navigation)
   - Sidebar area (for menus or info)
   - Main content area (for primary content)
2. The component should accept `children` or specific props for each section
3. Use the layout to display:
   - Student list in the main area
   - Academy info in the sidebar
   - Title in the header
4. Style it to look like a proper layout

## Approach Options

**Option A**: Single children prop (simpler):
```jsx
function AcademyLayout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
```

**Option B**: All children (more flexible):
```jsx
function AcademyLayout({ children }) {
  return (
    <div className="layout">
      {children}
    </div>
  );
}

// Then use specific components inside:
<AcademyLayout>
  <Header>Title</Header>
  <Sidebar>Menu</Sidebar>
  <Main>Content</Main>
</AcademyLayout>
```

Choose whichever makes sense to you!

## Acceptance Criteria

- [ ] AcademyLayout component created
- [ ] Component uses children prop (or multiple content props)
- [ ] Layout has three distinct sections
- [ ] CSS creates visual layout (grid or flexbox)
- [ ] Content is placed in appropriate sections
- [ ] At least 3 students displayed in main area
- [ ] Layout is visually clear and organized
- [ ] No console errors

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Use CSS Grid for layout:
```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

header {
  grid-area: header;
  background: #667eea;
  color: white;
  padding: 20px;
}

aside {
  grid-area: sidebar;
  background: #f7f7f7;
  padding: 20px;
}

main {
  grid-area: main;
  padding: 20px;
}
```

**Hint 2**: Using the component:
```jsx
<AcademyLayout
  header={<h1>Student Registry</h1>}
  sidebar={
    <div>
      <h3>Academy Info</h3>
      <p>Total Students: 5</p>
    </div>
  }
>
  {/* Main content goes here */}
  <StudentList students={students} />
</AcademyLayout>
```

**Hint 3**: Create a simple StudentList component:
```jsx
function StudentList({ students }) {
  return (
    <div>
      {students.map((student, index) => (
        <div key={index} className="student-item">
          <h4>{student.name}</h4>
          <p>{student.house} - Level {student.magicLevel}</p>
        </div>
      ))}
    </div>
  );
}
```

**Hint 4**: Sample student data:
```jsx
const students = [
  { name: "Aria", house: "Ravenclaw", magicLevel: 45 },
  { name: "Thor", house: "Gryffin", magicLevel: 62 },
  { name: "Luna", house: "Hufflepuff", magicLevel: 38 },
];
```

</details>

## Bonus Challenge

Enhance your layout:

1. **Responsive Design**: Make sidebar collapse on small screens
   ```css
   @media (max-width: 768px) {
     .layout {
       grid-template-columns: 1fr;
       grid-template-areas:
         "header"
         "main"
         "sidebar";
     }
   }
   ```

2. **Navigation Menu**: Add clickable navigation in sidebar
   - Dashboard
   - Students
   - Spells
   - Settings

3. **Footer Section**: Add a fourth section at the bottom

4. **Multiple Pages**: Create different content for different "pages" and switch between them with buttons

5. **Collapsible Sidebar**: Add a button to hide/show the sidebar (you'll need state from next module, or use a clever CSS trick!)

---

**Next Quest**: [Quest 3: House Roster](../quest-03-house-roster/)

