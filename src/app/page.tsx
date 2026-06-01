"use client";

import { useEffect, useState } from "react";
import ExerciseSettings from "@/components/ExerciseSettings";
import ExerciseTimer from "@/components/ExerciseTimer";

const DEFAULT_SETTINGS = {
  longHold: { hold: 10, rest: 5, reps: 10 },
  longRestA: 60,
  shortHold: { hold: 1, rest: 1, reps: 15 },
  longRestB: 60,
  sets: 10,
};

function getInitialSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const saved = localStorage.getItem("exercise-settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export default function HomePage() {
  const [settings, setSettings] = useState(getInitialSettings);

  // persist only (side-effect is correct here)
  useEffect(() => {
    localStorage.setItem("exercise-settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <div>

      <div className="hidden md:block ">
        <div className="min-h-screen bg-base-200 px-3 py-4 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 sm:gap-6">
            <ExerciseSettings settings={settings} setSettings={setSettings} />
            <ExerciseTimer settings={settings} />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="min-h-screen bg-base-200 px-3 py-4 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 sm:gap-6">

            <div className="order-2 lg:order-1">
              <ExerciseSettings settings={settings} setSettings={setSettings} />
            </div>

            <div className="order-1 lg:order-2">
              <ExerciseTimer settings={settings} />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}