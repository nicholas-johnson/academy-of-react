import { makeAutoObservable } from 'mobx'

class AcademyStore {
  students = []
  houseFilter = 'all'
  sortBy = 'name'

  constructor() {
    makeAutoObservable(this)
  }

  // Actions
  addStudent(student) {
    this.students.push({
      ...student,
      id: Date.now()
    })
  }

  removeStudent(id) {
    this.students = this.students.filter(s => s.id !== id)
  }

  setHouseFilter(house) {
    this.houseFilter = house
  }

  setSortBy(field) {
    this.sortBy = field
  }

  boostPower(id, amount) {
    const student = this.students.find(s => s.id === id)
    if (student) {
      student.power = Math.max(0, Math.min(100, student.power + amount))
    }
  }

  // Computed values - automatically cached and updated
  get filteredStudents() {
    if (this.houseFilter === 'all') return this.students
    return this.students.filter(s => s.house === this.houseFilter)
  }

  get sortedStudents() {
    const filtered = this.filteredStudents
    return [...filtered].sort((a, b) => {
      if (this.sortBy === 'power') {
        return b.power - a.power
      }
      return a.name.localeCompare(b.name)
    })
  }

  get totalPower() {
    return this.students.reduce((sum, s) => sum + s.power, 0)
  }

  get averagePower() {
    if (this.students.length === 0) return 0
    return Math.round(this.totalPower / this.students.length)
  }

  get houseStats() {
    const stats = {}
    for (const student of this.students) {
      if (!stats[student.house]) {
        stats[student.house] = { count: 0, power: 0 }
      }
      stats[student.house].count++
      stats[student.house].power += student.power
    }
    return stats
  }

  get studentCount() {
    return this.students.length
  }
}

export const academyStore = new AcademyStore()
