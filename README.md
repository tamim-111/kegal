Build a configurable interval-based exercise timer with two exercise phases per cycle, repeated across multiple sets.

1. Long Hold Exercise
   - Hold duration: default 10 seconds (configurable)
   - Rest duration: default 5 seconds (configurable)
   - Repetitions: default 10 (configurable)
2. Long rest after Long Hold finished: 1 Minutes (configurable)
3. Short Hold Exercise
   - Hold duration: default 1 seconds (configurable)
   - Rest duration: default 1 seconds (configurable)
   - Repetitions: default 15 (configurable)
4. Long rest after Short Hold finished: 1 Minutes (configurable)
   
Now 1 full set = 1 + 2 + 3 + 4. so default full set is set to 10 (configurable). Meaning all default setting: 
1. long hold exercise: 10 seconds hold, 5 seconds rest, 10 repetitions
2. long rest: 1 minute
3. short hold exercise: 1 second hold, 1 second rest, 15 repetitions
4. long rest: 1 minute
5. full set: 10 complete sets of repeating 1, 2, 3, 4.

so all the default settng if i press start then long hold timeing start for 10 seconds, afte 10 second 5 sec a short break start. then do the same tings for 10 times. then the logn breks comes for 1 mites. then the short hold exercise comes, hold the flabic floor mucles for 1 sec. count start in militsecond on the scresn. then 1 sec of rest. thes contiutes for 15 times default. then 1 mitues of long rest comes again. thies loop contues 10 times (customizable)



Build a configurable interval-based exercise timer with two exercise phases per cycle, repeated across multiple sets.

Core Structure

A full set consists of 4 sequential phases:

1. Long Hold Exercise (Phase A)
Hold duration: default 10 seconds (configurable)
Rest duration: default 5 seconds (configurable)
Repetitions per set: default 10 reps (configurable)

Each repetition flow:

Hold → Rest → next repetition
2. Long Rest (After Phase A)
Duration: default 1 minute (configurable)
3. Short Hold Exercise (Phase B)
Hold duration: default 1 second (configurable)
Rest duration: default 1 second (configurable)
Repetitions per set: default 15 reps (configurable)

Each repetition flow:

Hold → Rest → next repetition
4. Long Rest (After Phase B)
Duration: default 1 minute (configurable)
Full Set Definition

One full set = Phase A → Rest → Phase B → Rest

Total Sets
Default number of full sets: 10
Fully configurable
Execution Flow (Simplified)

For each set (1 → N):

Run Long Hold Exercise (repeat N times):
Hold (10s) → Rest (5s)
Long Rest (1 min)
Run Short Hold Exercise (repeat N times):
Hold (1s) → Rest (1s)
Long Rest (1 min)

Repeat the entire cycle for total sets.

Key Behavior Requirements
Timer must run sequentially (no overlap between phases)
Each phase must complete fully before moving to the next
All durations and repetitions must be configurable
UI should clearly indicate:
Current phase
Remaining time (countdown)
Current repetition / total repetitions
Current set / total sets