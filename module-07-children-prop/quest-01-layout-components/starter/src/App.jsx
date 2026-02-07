import { useState } from 'react'
import './App.css'

// TODO: Create a Card component that uses children
// - Accept a "variant" prop with default value "default"
// - Wrap children in a div with className `card card-${variant}`
function Card({ children, variant = "default" }) {
  return null;
}

// TODO: Create a Section component
// - Accept "title" and "children" props
// - Render the title in an h2, then render children
function Section({ title, children }) {
  return null;
}

// TODO: Create a Modal component
// - Accept props: isOpen, onClose, title, children
// - Return null if not open
// - Render an overlay, modal box with title and children
function Modal({ isOpen, onClose, title, children }) {
  return null;
}

// TODO: Create a Layout component with multiple slots
// - Accept props: header, sidebar, children
// - Render header in a <header> tag
// - Render sidebar in an <aside> tag
// - Render children in a <main> tag
function Layout({ header, sidebar, children }) {
  return null;
}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* TODO: Use Layout component with header, sidebar, and main content */}
      
      {/* Example of what you should build:
      
      <Layout
        header={<h1>Academy Dashboard</h1>}
        sidebar={<nav>Menu items...</nav>}
      >
        Main content here using children
      </Layout>
      
      */}

      {/* TODO: Inside the Layout, create Sections with Cards */}
      
      {/* TODO: Add a Modal that opens with a button */}
      
      <p>Replace this with your layout components!</p>
    </div>
  );
}

export default App;
