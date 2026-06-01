# Implement Exercise Timer Logic

You are a senior React/Next.js engineer.

The UI is already completed and must remain unchanged as much as possible. Your task is to implement the complete exercise timer logic behind the existing UI.

## Tech Requirements

* Next.js App Router
* React
* TypeScript
* TailwindCSS
* DaisyUI
* No external state management libraries
* Persist user settings in localStorage
* Restore settings automatically on page refresh
* Code must be production-ready and maintainable

---

# Existing Components

There are currently two components:

* ExerciseSettings
* ExerciseTimer

The UI already exists.

Do not redesign the UI.

Only connect the UI to real state and timer logic.

---

# Exercise Configuration

The following settings must be configurable:

## Long Hold Exercise

* Hold duration (seconds)
* Rest duration (seconds)
* Repetitions

Default:

* Hold: 10
* Rest: 5
* Repetitions: 10

---

## Long Rest After Phase A

Default:

* 60 seconds

---

## Short Hold Exercise

* Hold duration (seconds)
* Rest duration (seconds)
* Repetitions

Default:

* Hold: 1
* Rest: 1
* Repetitions: 15

---

## Long Rest After Phase B

Default:

* 60 seconds

---

## Total Sets

Default:

* 10

---

# Full Set Definition

One complete set consists of:

1. Long Hold Exercise
2. Long Rest After Phase A
3. Short Hold Exercise
4. Long Rest After Phase B

---

# Execution Flow

For each set:

Long Hold Exercise:

Repeat N times:

Hold
→ Rest
→ Hold
→ Rest

After all repetitions:

Long Rest After Phase A

Then:

Short Hold Exercise:

Repeat N times:

Hold
→ Rest
→ Hold
→ Rest

After all repetitions:

Long Rest After Phase B

Then:

Start next set.

Continue until all sets are completed.

---

# Important Rep Counting Rules

Rep counting must NOT increase during rest phases.

Example:

Rep 1 Hold
Rep 1 Rest

Rep 2 Hold
Rep 2 Rest

Rep 3 Hold
Rep 3 Rest

Rep number should only increase when a new hold repetition starts.

Never count a rest period as a repetition.

---

# Timer Requirements

The timer must run sequentially.

Only one active phase at a time.

No overlapping timers.

No skipped phases.

No skipped repetitions.

No duplicate transitions.

Must work correctly in React Strict Mode.

Use a reducer-based state machine instead of many independent useState calls.

---

# Phase Types

Create explicit phase types:

IDLE

LONG_HOLD

LONG_HOLD_REST

LONG_REST_AFTER_A

SHORT_HOLD

SHORT_HOLD_REST

LONG_REST_AFTER_B

PAUSED

FINISHED

---

# UI Requirements

Display:

Current phase

Examples:

Long Hold

Long Hold Rest

Short Hold

Short Hold Rest

Long Break

Completed

---

Display:

Current set

Example:

Set 3 of 10

---

Display:

Current repetition

Examples:

Rep 4 of 10

Rep 12 of 15

Show the currently active exercise repetition only.

Do not show both long and short repetitions simultaneously.

---

Display:

Remaining time countdown

Example:

08

07

06

...

---

Display:

Progress percentage

Progress should be calculated from total completed work relative to total workout.

---

# Controls

Start

Pause

Resume

Reset

---

Start

Starts workout from beginning.

---

Pause

Freezes timer exactly where it is.

No progress should continue.

---

Resume

Continues from paused position.

---

Reset

Stops everything.

Returns timer to initial state.

Keeps user settings.

---

# Settings Behavior

Users can modify all settings.

Settings should immediately update state.

Settings should be saved to localStorage.

On page refresh:

Load settings from localStorage.

Fallback to defaults if no settings exist.

---

# localStorage Keys

Use a single key:

exercise-timer-config

Store:

{
longHoldDuration,
longHoldRest,
longHoldReps,
shortHoldDuration,
shortHoldRest,
shortHoldReps,
interPhaseRest,
totalSets
}


