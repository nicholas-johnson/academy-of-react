// TODO: Import makeAutoObservable from 'mobx'

// TODO: Create AcademyStore class with:
// - students: array of student objects
// - houseFilter: current filter ('all' or house name)
// - sortBy: current sort ('name' or 'power')
//
// Each student: { id, name, house, power }
// Houses: 'Gryffin', 'Slytherin', 'Ravenclaw', 'Hufflepuff'

// TODO: Add actions:
// - addStudent(student)
// - removeStudent(id)
// - setHouseFilter(house)
// - setSortBy(field)
// - boostPower(id, amount)

// TODO: Add computed getters:
// - get filteredStudents() - filter by house
// - get sortedStudents() - sort filtered students
// - get totalPower() - sum of all student powers
// - get averagePower() - average power
// - get houseStats() - power by house

// Example structure:
// class AcademyStore {
//   students = []
//   houseFilter = 'all'
//   sortBy = 'name'
//
//   constructor() {
//     makeAutoObservable(this)
//   }
//
//   addStudent(student) {
//     this.students.push({ ...student, id: Date.now() })
//   }
//
//   get totalPower() {
//     return this.students.reduce((sum, s) => sum + s.power, 0)
//   }
// }

// TODO: Create and export store instance
// export const academyStore = new AcademyStore()
