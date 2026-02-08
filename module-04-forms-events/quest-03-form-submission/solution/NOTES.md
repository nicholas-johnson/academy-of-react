# Quest 3: Sorting Ceremony - Solution Notes

## Overview

This solution demonstrates a complete multi-step form wizard in React, managing complex state across multiple steps with validation, progress tracking, and a summary page. Students progress through house selection, familiar choice, and wand selection to complete their enrollment.

## Key Concepts Demonstrated

### 1. Multi-Step Form State

Track current step as part of state:

```javascript
const [currentStep, setCurrentStep] = useState(1); // or 'complete'
```

Step can be a number (1, 2, 3) or string ('complete' for summary).

### 2. Centralized Form Data

All form data in one state object:

```javascript
const [formData, setFormData] = useState({
  name: "",
  house: "",
  familiar: "",
  wand: "",
});
```

Easier to pass around and validate than separate state variables.

### 3. Conditional Rendering by Step

Show different UI based on current step:

```javascript
{
  currentStep === 1 && <Step1Component />;
}
{
  currentStep === 2 && <Step2Component />;
}
{
  currentStep === 3 && <Step3Component />;
}
{
  currentStep === "complete" && <Summary />;
}
```

Only one step renders at a time.

### 4. Step Validation

Check if current step is complete before allowing "Next":

```javascript
const isStepValid = () => {
  switch (currentStep) {
    case 1:
      return formData.name.trim() !== "" && formData.house !== "";
    case 2:
      return formData.familiar !== "";
    case 3:
      return formData.wand !== "";
    default:
      return false;
  }
};
```

### 5. Navigation Functions

Separate functions for forward/backward navigation:

```javascript
const handleNext = () => {
  if (currentStep === 3) {
    setCurrentStep("complete");
  } else {
    setCurrentStep(currentStep + 1);
  }
};

const handleBack = () => {
  if (currentStep === "complete") {
    setCurrentStep(3);
  } else {
    setCurrentStep(currentStep - 1);
  }
};
```

### 6. Reusable Update Function

One function to update any field:

```javascript
const updateField = (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}

// Usage:
onClick={() => updateField('house', 'Liondudes')}
```

### 7. Progress Indicator

Visual feedback showing current position:

```javascript
<div
  className={`step-circle ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "complete" : ""}`}
>
  {currentStep > 1 ? "✓" : "1"}
</div>
```

Shows checkmark after step is completed.

### 8. Card Selection Pattern

Clickable cards for option selection:

```javascript
<div
  className={`option-card ${formData.house === "Liondudes" ? "selected" : ""}`}
  onClick={() => updateField("house", "Liondudes")}
>
  {/* content */}
</div>
```

Visual feedback with CSS class.

### 9. Data Lookup for Summary

Use array.find() to get full object from ID:

```javascript
{
  HOUSES.find((h) => h.id === formData.house)?.name;
}
```

Optional chaining (`?.`) prevents errors if not found.

### 10. Reset Functionality

Clear all data and return to start:

```javascript
const handleReset = () => {
  setFormData({ name: "", house: "", familiar: "", wand: "" });
  setCurrentStep(1);
};
```

## Implementation Approach

### State Architecture

```javascript
// Step tracking
const [currentStep, setCurrentStep] = useState(1);

// All form data in one object
const [formData, setFormData] = useState({
  name: "",
  house: "",
  familiar: "",
  wand: "",
});
```

### Step Flow

1. User fills Step 1 → clicks Next
2. Validation checks Step 1 is complete
3. If valid, advance to Step 2
4. Repeat for Steps 2-3
5. After Step 3, show summary
6. Option to reset and start over

### Validation Strategy

Per-step validation, not global. Each step has its own requirements.

### Data Storage

Static arrays for houses, familiars, wands. Could be moved to JSON file or API in real app.

## Common Pitfalls to Avoid

### BAD: Storing step as string always

```javascript
const [currentStep, setCurrentStep] = useState("1"); // String!
setCurrentStep(currentStep + 1); // '11' not 2!
```

### GOOD: Use numbers for numeric steps

```javascript
const [currentStep, setCurrentStep] = useState(1); // Number
setCurrentStep(currentStep + 1); // 2
```

### BAD: Separate state for each field

```javascript
const [name, setName] = useState("");
const [house, setHouse] = useState("");
const [familiar, setFamiliar] = useState("");
const [wand, setWand] = useState("");
// Too many states to manage!
```

### GOOD: One object for all fields

```javascript
const [formData, setFormData] = useState({
  name: "",
  house: "",
  familiar: "",
  wand: "",
});
```

### BAD: No validation, allow progression anytime

```javascript
<button onClick={handleNext}>Next</button>
// User can proceed with empty fields
```

### GOOD: Disable when invalid

```javascript
<button onClick={handleNext} disabled={!isStepValid()}>
  Next
</button>
```

### BAD: Rendering all steps always

```javascript
<Step1 />
<Step2 />
<Step3 />
// All visible at once!
```

### GOOD: Conditional rendering

```javascript
{
  currentStep === 1 && <Step1 />;
}
{
  currentStep === 2 && <Step2 />;
}
```

### BAD: Direct property access without optional chaining

```javascript
{
  HOUSES.find((h) => h.id === formData.house).name;
}
// Crashes if not found!
```

### GOOD: Use optional chaining

```javascript
{
  HOUSES.find((h) => h.id === formData.house)?.name;
}
```

## Extensions and Improvements

### Easy

- Add tooltips explaining each option
- Add character counter for name field
- Add "Skip" option for optional steps
- Show step number in title (Step 1 of 3)

### Medium

- Save progress to localStorage (persist on refresh)
- Add animated transitions between steps
- Add "Edit" buttons in summary to jump back to steps
- Validate name uniqueness against existing users
- Add email confirmation step

### Hard

- Non-linear navigation (jump to any completed step)
- Conditional steps based on previous answers
- Draft auto-save every 30 seconds
- Multi-language support
- Integration with backend API

## React 19: useFormState for Multi-Step (Bonus)

React 19's useFormState can simplify multi-step forms:

```javascript
import { useFormState } from "react";

async function enrollAction(prevState, formData) {
  const step = formData.get("step");

  if (step === "1") {
    // Validate step 1
    const name = formData.get("name");
    if (!name) return { step: 1, error: "Name required" };
    return { step: 2, data: { name } };
  }

  // ... handle other steps
}

function Wizard() {
  const [state, formAction] = useFormState(enrollAction, { step: 1 });

  return (
    <form action={formAction}>
      <input type="hidden" name="step" value={state.step} />
      {state.step === 1 && <Step1 />}
      {state.step === 2 && <Step2 />}
    </form>
  );
}
```

## Performance Notes

- Re-renders entire form on every state change
- For 3-4 steps, this is negligible
- For 10+ steps with complex components, consider:
  - Code splitting per step
  - Memoizing step components
  - Moving step state to context

## Testing the Solution

1. Run `npm install` and `npm run dev`
2. Try clicking Next with empty name - button should be disabled
3. Fill name and select house - Next should enable
4. Progress through all three steps
5. Check progress indicator updates
6. Verify summary shows all selections correctly
7. Click Reset - should return to Step 1
8. Test Back button at each step

## What's Next?

**Module 6: Lists, Keys, and Data Manipulation** will teach you how to work with collections of data efficiently, which is perfect for building features like student rosters, spell inventories, and battle rankings.

This multi-step pattern you've learned is used everywhere:

- E-commerce checkouts
- Survey forms
- Onboarding flows
- Application wizards
- Account setup processes
