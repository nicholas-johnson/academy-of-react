# Quest 3: Replay Controls

## Story

The Battle Arena records fights! Build a replay system with play/pause/restart controls that directly manipulate a timer using refs.

## Your Mission

Create a battle replay interface that:
- Simulates a battle timeline (0-60 seconds)
- Has Play, Pause, Restart controls
- Updates progress bar
- Uses refs to store interval ID
- Displays battle events at specific timestamps

## Requirements

1. Timeline runs from 0 to 60 seconds
2. Play button starts/resumes
3. Pause button stops without resetting
4. Restart button resets to 0
5. Progress bar shows current position
6. Battle events appear at specific timestamps
7. Use ref to store interval ID (not state!)

## Learning Objectives

- Store non-rendering values in refs
- Manage intervals with refs
- Understand ref vs state for side effects
- TypeScript with timers

## Starter Code

Starter includes battle events data. Add:
- Ref for interval ID
- State for current time and playing status
- Play/pause/restart logic
- Progress calculation

## Hints

- Interval ref: `useRef<number | null>(null)`
- Store setInterval return value in ref
- Clear interval: `clearInterval(intervalRef.current!)`
- Progress: `(currentTime / maxTime) * 100`

---
[Solution](./solution/) | [Back to Module](../../)
