"use client";

import { useState } from "react";

const SERVICES = [
  "General consultation",
  "Pregnancy care",
  "Family planning",
  "HIV care",
  "Male medical care",
  "Circumcision",
  "Medicals",
  "Minor surgical procedure",
  "Miscarriage management",
  "IV drip treatment",
  "Something else",
];

export default function AppointmentForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      "Hi, I would like to request an appointment.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Reason: ${service}`,
    ];
    if (preferredTime.trim()) {
      lines.push(`Preferred day and time: ${preferredTime}`);
    }
    if (notes.trim()) {
      lines.push(`Notes: ${notes}`);
    }
    const url = `https://wa.me/27763598648?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  }

  const inputClasses =
    "w-full rounded-xl border border-cream-200 bg-white/50 px-4 py-3 text-brand-950 placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all backdrop-blur-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink-700">
            Your name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink-700">
            Your phone number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 076 123 4567"
            className={inputClasses}
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-ink-700">
            What do you need help with?
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClasses}
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="time" className="mb-1.5 block text-sm font-semibold text-ink-700">
            Preferred day and time <span className="text-ink-400 font-normal">(optional)</span>
          </label>
          <input
            id="time"
            type="text"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            placeholder="e.g. Tuesday morning"
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-ink-700">
          Notes / Details <span className="text-ink-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any extra details, symptoms, or medical history you want to share..."
          rows={3}
          className={`${inputClasses} resize-none`}
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center pt-2">
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-500 hover:shadow-brand-600/30 active:scale-[0.98] sm:w-auto sm:px-12"
        >
          Request Appointment
        </button>
      </div>
    </form>
  );
}
