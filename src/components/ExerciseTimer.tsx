"use client";

import React, { useEffect, useReducer, useRef } from "react";

type Phase =
    | "LONG_HOLD"
    | "LONG_REST_A"
    | "SHORT_HOLD"
    | "LONG_REST_B"
    | "DONE";

type SubPhase = "HOLD" | "REST";

type Settings = {
    longHold: { hold: number; rest: number; reps: number };
    longRestA: number;
    shortHold: { hold: number; rest: number; reps: number };
    longRestB: number;
    sets: number;
};

type State = {
    running: boolean;
    phase: Phase;
    subPhase: SubPhase;
    setIndex: number;
    repIndex: number;
    seconds: number;
};

type Action =
    | { type: "PAUSE" }
    | { type: "RESET" }
    | { type: "TICK" }
    | { type: "TRANSITION"; payload: Partial<State> };

const initialState: State = {
    running: false,
    phase: "LONG_HOLD",
    subPhase: "HOLD",
    setIndex: 1,
    repIndex: 1,
    seconds: 0,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "PAUSE":
            return { ...state, running: false };

        case "RESET":
            return { ...initialState };

        case "TICK":
            return { ...state, seconds: state.seconds - 1 };

        case "TRANSITION":
            return { ...state, ...action.payload };

        default:
            return state;
    }
}

export default function ExerciseTimer({ settings }: { settings: Settings }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const stateRef = useRef<State>(state);
    const settingsRef = useRef<Settings>(settings);
    const sessionConfigRef = useRef<Settings | null>(null);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        settingsRef.current = settings;
    }, [settings]);

    const clear = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    // TIMER LOOP
    useEffect(() => {
        clear();

        if (!state.running || state.phase === "DONE") return;

        intervalRef.current = setInterval(() => {
            dispatch({ type: "TICK" });
        }, 1000);

        return clear;
    }, [state.running, state.phase]);

    // START handler (FIXED - no reducer logic, fully type-safe)
    const handleStart = () => {
        const cfg = settingsRef.current;

        sessionConfigRef.current = cfg;

        dispatch({
            type: "TRANSITION",
            payload: {
                running: true,
                phase: "LONG_HOLD",
                subPhase: "HOLD",
                setIndex: 1,
                repIndex: 1,
                seconds: cfg.longHold.hold,
            },
        });
    };

    // STATE MACHINE
    useEffect(() => {
        if (!state.running) return;
        if (state.seconds > 0) return;

        const cfg = sessionConfigRef.current;
        if (!cfg) return;

        const current = stateRef.current;

        const isLastLongRep = current.repIndex >= cfg.longHold.reps;
        const isLastShortRep = current.repIndex >= cfg.shortHold.reps;
        const isLastSet = current.setIndex >= cfg.sets;

        const next = (): Partial<State> => {
            if (current.phase === "LONG_HOLD") {
                if (current.subPhase === "HOLD") {
                    return {
                        subPhase: "REST",
                        seconds: cfg.longHold.rest,
                    };
                }

                if (!isLastLongRep) {
                    return {
                        subPhase: "HOLD",
                        repIndex: current.repIndex + 1,
                        seconds: cfg.longHold.hold,
                    };
                }

                return {
                    phase: "LONG_REST_A",
                    subPhase: "HOLD",
                    repIndex: 1,
                    seconds: cfg.longRestA,
                };
            }

            if (current.phase === "LONG_REST_A") {
                return {
                    phase: "SHORT_HOLD",
                    subPhase: "HOLD",
                    seconds: cfg.shortHold.hold,
                };
            }

            if (current.phase === "SHORT_HOLD") {
                if (current.subPhase === "HOLD") {
                    return {
                        subPhase: "REST",
                        seconds: cfg.shortHold.rest,
                    };
                }

                if (!isLastShortRep) {
                    return {
                        subPhase: "HOLD",
                        repIndex: current.repIndex + 1,
                        seconds: cfg.shortHold.hold,
                    };
                }

                return {
                    phase: "LONG_REST_B",
                    subPhase: "HOLD",
                    repIndex: 1,
                    seconds: cfg.longRestB,
                };
            }

            if (current.phase === "LONG_REST_B") {
                if (!isLastSet) {
                    return {
                        phase: "LONG_HOLD",
                        subPhase: "HOLD",
                        setIndex: current.setIndex + 1,
                        repIndex: 1,
                        seconds: cfg.longHold.hold,
                    };
                }

                return {
                    phase: "DONE",
                    running: false,
                    seconds: 0,
                };
            }

            return {};
        };

        dispatch({
            type: "TRANSITION",
            payload: next(),
        });
    }, [state.seconds, state.running]);

    const progress =
        state.subPhase === "HOLD"
            ? 100 - (state.seconds / (settings.longHold.hold || 1)) * 100
            : 100 - (state.seconds / (settings.longHold.rest || 1)) * 100;

    const remainingSets = Math.max(0, settings.sets - state.setIndex + 1);

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Exercise Timer</h2>

                    <div className={`badge ${state.running ? "badge-success" : "badge-primary"}`}>
                        {state.running ? "Running" : "Stopped"}
                    </div>
                </div>

                <div className="divider" />

                {/* PHASE */}
                <div className="text-center py-6">
                    <h3 className="text-3xl font-bold">
                        {state.phase} • {state.subPhase}
                    </h3>
                </div>

                {/* TIMER */}
                <div className="flex justify-center">
                    <div
                        className="radial-progress text-primary"
                        style={
                            {
                                "--value": progress,
                                "--size": "14rem",
                                "--thickness": "12px",
                            } as React.CSSProperties
                        }
                    >
                        <div className="text-5xl font-bold">{state.seconds}</div>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <div className="stat bg-base-200 rounded-box">
                        <div className="stat-title">Current Set</div>
                        <div className="stat-value">{state.setIndex}</div>
                    </div>

                    <div className="stat bg-base-200 rounded-box">
                        <div className="stat-title">Remaining Sets</div>
                        <div className="stat-value text-primary">
                            {remainingSets}
                        </div>
                    </div>

                    <div className="stat bg-base-200 rounded-box">
                        <div className="stat-title">Rep</div>
                        <div className="stat-value">{state.repIndex}</div>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="flex gap-3 mt-8 justify-center">
                    <button
                        className="btn btn-primary"
                        onClick={handleStart}
                        disabled={state.running}
                    >
                        Start
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={() => dispatch({ type: "PAUSE" })}
                        disabled={!state.running}
                    >
                        Pause
                    </button>

                    <button
                        className="btn btn-error"
                        onClick={() => dispatch({ type: "RESET" })}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}