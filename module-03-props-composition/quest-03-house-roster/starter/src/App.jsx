import './App.css'

// TODO: Create a StudentCard component that accepts props
// Props: name, house, level, specialty
function StudentCard(props) {
  return null;
}

// TODO: Create a HouseSection component that accepts props
// Props: houseName, students (array), houseColor
function HouseSection(props) {
  return null;
}

function App() {
  // TODO: Create arrays of students for each house
  const gryffindorStudents = [
    // Add students here
  ];
  
  const ravenclawStudents = [
    // Add students here
  ];
  
  const hufflepuffStudents = [
    // Add students here
  ];
  
  const slytherinStudents = [
    // Add students here
  ];
  
  return (
    <div>
      <h1>Quest 3: House Roster</h1>
      <p>Display students organized by their houses!</p>
      
      <div className="houses-container">
        {/* TODO: Use HouseSection component for each house */}
        {/* Pass houseName, students array, and houseColor */}
      </div>
    </div>
  );
}

export default App;





