type ExerciseSettingsType = {
    longHold: {
        hold: number;
        rest: number;
        reps: number;
    };
    longRestA: number;
    shortHold: {
        hold: number;
        rest: number;
        reps: number;
    };
    longRestB: number;
    sets: number;
};

type Props = {
    settings: ExerciseSettingsType;
    setSettings: React.Dispatch<React.SetStateAction<ExerciseSettingsType>>;
};

export default function ExerciseSettings({ settings, setSettings }: Props) {
    const update = (path: (string | number)[], value: number) => {
        setSettings((prev) => {
            const copy = structuredClone(prev);

            let ref: Record<string, unknown> = copy;

            for (let i = 0; i < path.length - 1; i++) {
                ref = ref[path[i] as string] as Record<string, unknown>;
            }

            const lastKey = path[path.length - 1] as string;
            ref[lastKey] = value;

            return copy;
        });
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl">Exercise Settings</h2>
                <div className="divider my-0" />

                <div className="space-y-5">
                    {/* LONG HOLD */}
                    <div>
                        <h3 className="font-semibold mb-3">Long Hold Exercise</h3>

                        <div className="grid gap-3">
                            <input
                                type="number"
                                className="input input-bordered"
                                value={settings.longHold.hold}
                                onChange={(e) =>
                                    update(["longHold", "hold"], +e.target.value)
                                }
                            />

                            <input
                                type="number"
                                className="input input-bordered"
                                value={settings.longHold.rest}
                                onChange={(e) =>
                                    update(["longHold", "rest"], +e.target.value)
                                }
                            />

                            <input
                                type="number"
                                className="input input-bordered"
                                value={settings.longHold.reps}
                                onChange={(e) =>
                                    update(["longHold", "reps"], +e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* REST A */}
                    <input
                        type="number"
                        className="input input-bordered"
                        value={settings.longRestA}
                        onChange={(e) => update(["longRestA"], +e.target.value)}
                    />

                    {/* SHORT HOLD */}
                    <div>
                        <h3 className="font-semibold mb-3">Short Hold Exercise</h3>

                        <div className="grid gap-3">
                            <input
                                type="number"
                                className="input input-bordered"
                                value={settings.shortHold.hold}
                                onChange={(e) =>
                                    update(["shortHold", "hold"], +e.target.value)
                                }
                            />

                            <input
                                type="number"
                                className="input input-bordered"
                                value={settings.shortHold.rest}
                                onChange={(e) =>
                                    update(["shortHold", "rest"], +e.target.value)
                                }
                            />

                            <input
                                type="number"
                                className="input input-bordered"
                                value={settings.shortHold.reps}
                                onChange={(e) =>
                                    update(["shortHold", "reps"], +e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* REST B */}
                    <input
                        type="number"
                        className="input input-bordered"
                        value={settings.longRestB}
                        onChange={(e) => update(["longRestB"], +e.target.value)}
                    />

                    {/* SETS */}
                    <input
                        type="number"
                        className="input input-bordered"
                        value={settings.sets}
                        onChange={(e) => update(["sets"], +e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}