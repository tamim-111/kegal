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
        <div className="card bg-base-100 shadow-md sm:shadow-xl">
            <div className="card-body p-4 sm:p-6">

                <h2 className="text-xl sm:text-2xl font-bold">Settings</h2>
                <div className="divider my-1" />

                <div className="space-y-6">

                    {/* LONG HOLD */}
                    <div className="bg-base-200 rounded-xl p-4 space-y-3">
                        <h3 className="font-semibold">Long Hold</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input className="input input-bordered w-full" value={settings.longHold.hold}
                                onChange={(e) => update(["longHold", "hold"], +e.target.value)} placeholder="Hold (sec)" />

                            <input className="input input-bordered w-full" value={settings.longHold.rest}
                                onChange={(e) => update(["longHold", "rest"], +e.target.value)} placeholder="Rest (sec)" />

                            <input className="input input-bordered w-full" value={settings.longHold.reps}
                                onChange={(e) => update(["longHold", "reps"], +e.target.value)} placeholder="Reps" />
                        </div>
                    </div>

                    {/* LONG REST A */}
                    <div className="bg-base-200 rounded-xl p-4">
                        <h3 className="font-semibold mb-2">Rest After Long Set</h3>
                        <input
                            className="input input-bordered w-full"
                            value={settings.longRestA}
                            onChange={(e) => update(["longRestA"], +e.target.value)}
                            placeholder="Seconds"
                        />
                    </div>

                    {/* SHORT HOLD */}
                    <div className="bg-base-200 rounded-xl p-4 space-y-3">
                        <h3 className="font-semibold">Short Hold</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input className="input input-bordered w-full"
                                value={settings.shortHold.hold}
                                onChange={(e) => update(["shortHold", "hold"], +e.target.value)}
                                placeholder="Hold" />

                            <input className="input input-bordered w-full"
                                value={settings.shortHold.rest}
                                onChange={(e) => update(["shortHold", "rest"], +e.target.value)}
                                placeholder="Rest" />

                            <input className="input input-bordered w-full"
                                value={settings.shortHold.reps}
                                onChange={(e) => update(["shortHold", "reps"], +e.target.value)}
                                placeholder="Reps" />
                        </div>
                    </div>

                    {/* REST B */}
                    <div className="bg-base-200 rounded-xl p-4">
                        <h3 className="font-semibold mb-2">Final Rest</h3>
                        <input
                            className="input input-bordered w-full"
                            value={settings.longRestB}
                            onChange={(e) => update(["longRestB"], +e.target.value)}
                            placeholder="Seconds"
                        />
                    </div>

                    {/* SETS */}
                    <div className="bg-primary/10 rounded-xl p-4">
                        <h3 className="font-semibold mb-2">Sets</h3>
                        <input
                            className="input input-bordered w-full"
                            value={settings.sets}
                            onChange={(e) => update(["sets"], +e.target.value)}
                            placeholder="Number of sets"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}