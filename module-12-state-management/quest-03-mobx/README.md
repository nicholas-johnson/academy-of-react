# Quest 3: MobX Academy Dashboard

Build an Academy dashboard using MobX — the reactive/observable state management library.

## Why MobX?

- Observable/reactive pattern
- Automatic dependency tracking
- Direct mutation syntax (made safe)
- Excellent for computed values
- Minimal boilerplate

## Requirements

- Create a MobX store class with makeAutoObservable
- Track students with name, house, and power level
- Computed values for statistics
- Filter and sort students
- Wrap components with observer

## Acceptance Criteria

- [ ] Store class uses makeAutoObservable
- [ ] Can add and remove students
- [ ] Computed values update automatically (total power, averages)
- [ ] Filter by house works
- [ ] Sort by power level works
- [ ] Components wrapped with observer re-render on changes

## Hints

```jsx
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

// Store class
class StudentStore {
  students = []
  filter = 'all'

  constructor() {
    makeAutoObservable(this)
  }

  // Actions - direct mutations are tracked
  addStudent(student) {
    this.students.push(student)
  }

  // Computed - automatically cached
  get totalPower() {
    return this.students.reduce((sum, s) => sum + s.power, 0)
  }

  get filteredStudents() {
    if (this.filter === 'all') return this.students
    return this.students.filter(s => s.house === this.filter)
  }
}

const store = new StudentStore()

// Components must be wrapped with observer
const StudentList = observer(() => {
  return <div>{store.students.map(...)}</div>
})
```

## Installation

```bash
npm install mobx mobx-react-lite
```

[← Previous](../quest-02-redux/)
