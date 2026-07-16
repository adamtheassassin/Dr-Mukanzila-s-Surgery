"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://hook.eu2.make.com/632581slmwhp51q3j2mgdqqxcxbuucx8", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          service,
          preferredTime,
          notes,
        }),
      });

      if (response.ok) {
        setStatus("success");
        if (typeof window !== "undefined") {
          const windowWithDataLayer = window as any;
          windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
          windowWithDataLayer.dataLayer.push({
            event: "appointment_request",
            formName: "Appointment Consultation Request",
            serviceRequested: service,
          });
        }
      } else {
        throw new Error(`Failed with status: ${response.status}`);
      }
    } catch (err: any) {
      console.error("Webhook submission error:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  }

  const inputClasses =
    "w-full rounded-xl border border-cream-200 bg-white/50 px-4 py-3 text-brand-950 placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all backdrop-blur-sm";

  if (status === "success") {
    return (
      <div className="text-center py-8 px-4 animate-fade-in">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-950">
          Request Submitted!
        </h3>
        <p className="mt-3 text-ink-600 max-w-md mx-auto">
          Thank you, <strong>{name}</strong>. Your appointment request for <strong>{service}</strong> has been received. We will contact you at <strong>{phone}</strong> shortly to confirm.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setName("");
            setPhone("");
            setService(SERVICES[0]);
            setPreferredTime("");
            setNotes("");
          }}
          className="mt-8 rounded-xl border border-brand-200 bg-brand-50 px-6 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-100 transition-colors cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-5 text-sm text-brand-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-3">
            <span className="text-xl leading-none" aria-hidden="true">⚠️</span>
            <div>
              <p className="font-bold text-rose-800">Submission failed</p>
              <p className="text-rose-700/90 mt-0.5">{errorMessage || "We couldn't submit your request. Please try again or contact us directly."}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
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
              if (typeof window !== "undefined") {
                const windowWithDataLayer = window as any;
                windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
                windowWithDataLayer.dataLayer.push({
                  event: "appointment_whatsapp_fallback",
                  formName: "Appointment Consultation Request Fallback",
                  serviceRequested: service,
                });
              }
              window.open(url, "_blank");
            }}
            className="shrink-0 w-full sm:w-auto rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 text-xs font-bold shadow-md transition-colors text-center cursor-pointer"
          >
            Send via WhatsApp
          </button>
        </div>
      )}
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
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-500 hover:shadow-brand-600/30 active:scale-[0.98] sm:w-auto sm:px-12 disabled:bg-brand-400 disabled:pointer-events-none cursor-pointer"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Request Appointment"
          )}
        </button>
      </div>
    </form>
  );
}
