import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Create the root once
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render function - call this to update the UI
export const render = () => {
  root.render(<App />);
};

// Initial render
render();
