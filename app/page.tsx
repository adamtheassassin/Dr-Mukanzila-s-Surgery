"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import AppointmentForm from "@/components/AppointmentForm";
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  Phone,
  Stethoscope,
  Baby,
  Activity,
  HeartPulse,
  ShieldCheck,
  Scissors,
  FileCheck,
  Bandage,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Cross,
  User
} from "lucide-react";

// Custom Components
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}

// Constants
const PHONE_DISPLAY = "016 020 0081";
const PHONE_TEL = "tel:+27160200081";
const WHATSAPP_LINK =
  "https://wa.me/27763598648?text=" +
  encodeURIComponent("Hi, I would like to book an appointment at Dr Mukanzila's Surgery.");

const SERVICES = [
  {
    name: "General Medicine",
    icon: Stethoscope,
    blurb: "Colds, flu, blood pressure, diabetes and everything in between. Come in when you feel unwell.",
    features: ["Colds & Flu", "Blood Pressure", "Diabetes Care", "Chronic Scripts"],
    bg: "bg-indigo-50",
    imageBg: "from-indigo-100 to-indigo-200",
    iconColor: "text-indigo-400",
  },
  {
    name: "Pregnancy Care",
    icon: Baby,
    blurb: "We look after you and your baby from your first positive test all the way through your pregnancy.",
    features: ["Antenatal Checkups", "Baby's Progress", "Health Advice"],
    bg: "bg-orange-50",
    imageBg: "from-orange-100 to-orange-200",
    iconColor: "text-orange-400",
  },
  {
    name: "Family Planning",
    icon: Activity,
    blurb: "We help you pick a contraceptive that suits your body and your plans, explained plainly.",
    features: ["Contraceptive Options", "Injections & Pills", "Honest Advice"],
    bg: "bg-emerald-50",
    imageBg: "from-emerald-100 to-emerald-200",
    iconColor: "text-emerald-400",
  },
  {
    name: "HIV Care",
    icon: HeartPulse,
    blurb: "We offer private testing, counselling and treatment. Everything stays between you and your doctor.",
    features: ["Private Testing", "Counselling", "Ongoing Treatment"],
    bg: "bg-violet-50",
    imageBg: "from-violet-100 to-violet-200",
    iconColor: "text-violet-400",
  },
  {
    name: "Male Medical Care",
    icon: ShieldCheck,
    blurb: "Men can talk to us openly about any health worry, and we sort it out without any awkwardness.",
    features: ["Men's Checkups", "Private Consults", "Screenings"],
    bg: "bg-brand-50",
    imageBg: "from-brand-100 to-brand-200",
    iconColor: "text-brand-400",
  },
  {
    name: "Circumcision",
    icon: Scissors,
    blurb: "A doctor performs safe medical circumcision in clean surgical conditions, with guided aftercare.",
    features: ["Safe Procedure", "Sterile Conditions", "Guided Aftercare"],
    bg: "bg-rose-50",
    imageBg: "from-rose-100 to-rose-200",
    iconColor: "text-rose-400",
  },
  {
    name: "Medicals",
    icon: FileCheck,
    blurb: "We do medical checkups and certificates for work, school and drivers, usually in one visit.",
    features: ["Work Medicals", "School Medicals", "Driver's Medicals", "Certificates"],
    bg: "bg-amber-50",
    imageBg: "from-amber-100 to-amber-200",
    iconColor: "text-amber-500",
  },
  {
    name: "Minor Surgical Procedures",
    icon: Bandage,
    blurb: "We do stitches, growth removals and other small procedures right here at the practice.",
    features: ["Stitches", "Growth Removals", "Wound Care"],
    bg: "bg-teal-50",
    imageBg: "from-teal-100 to-teal-200",
    iconColor: "text-teal-400",
  },
  {
    name: "Miscarriage Management",
    icon: Cross,
    blurb: "We give you kind, private care during a very hard time, and we make sure your health comes first.",
    features: ["Private Care", "Gentle Support", "Follow-up Checks"],
    bg: "bg-cream-100",
    imageBg: "from-cream-200 to-cream-300",
    iconColor: "text-ink-400",
  },
];

const DRIPS = [
  { name: "Consultation + Basic Medicine", price: "R450", blurb: "You see the doctor and leave with your medicine, all in one price." },
  { name: "Multivitamin Drip", price: "R790", blurb: "A mix of vitamins that helps when you feel run down." },
  { name: "Booster Drip", price: "R790", blurb: "A pick-me-up for your energy and your immune system." },
  { name: "Glow Drip", price: "R890", blurb: "Our patients love this one for skin that looks brighter and healthier." },
  { name: "Glutathione Drip", price: "R970", blurb: "A strong antioxidant drip that supports your skin and your liver." },
  { name: "Iron Drip", price: "Priced on blood results", blurb: "We first check your blood results, then we quote you on what your body needs." },
];

const FAQS = [
  {
    q: "Do I need an appointment to see the doctor?",
    a: "No. Walk-ins are welcome seven days a week, 8:00 to 18:00. If you prefer a set time, send us a WhatsApp and we will confirm a slot for you.",
  },
  {
    q: "Which medical aids do you accept?",
    a: "We accept most major medical aids. Bring your card along and our front desk will sort out the rest. Cash patients pay clear upfront prices.",
  },
  {
    q: "How much does a consultation cost?",
    a: "A consultation with basic medicine costs R450, and you leave with your medicine from our on-site dispensary.",
  },
  {
    q: "What do the IV drips cost?",
    a: "Our drips range from R790 to R970, and the Iron Drip is priced on your blood results. Ask us on WhatsApp and we will help you choose the right one.",
  },
  {
    q: "Do pensioners get special rates?",
    a: "Yes. We have special rates for pensioners, discounted rates for the Sharpeville community, and 10% off all services rendered at the moment.",
  },
  {
    q: "Where exactly are you?",
    a: "78 Cassandra Ave, Bedworth Park, Vereeniging, right opposite Bedworth Centre. There is parking on the premises.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-brand-950/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
      >
        <span className="font-display text-lg font-bold text-brand-950 sm:text-xl">{q}</span>
        <span className="text-2xl font-light leading-none text-brand-950 select-none" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="-mt-2 max-w-xl pb-6 text-sm leading-relaxed text-ink-600 sm:text-base">
          {a}
        </p>
      )}
    </div>
  );
}

const WHY_ITEMS = [
  {
    title: "Rated 4.9/5 by Our Patients",
    body: "75 people have reviewed us on Google and almost every single one gave us five stars. Patients keep coming back because they feel heard and looked after.",
  },
  {
    title: "Open 7 Days a Week",
    body: "We are open Monday to Sunday, 8:00 to 18:00. Walk in any time that suits you, no appointment necessary.",
  },
  {
    title: "Most Medical Aids Accepted",
    body: "Bring your medical aid card and our front desk sorts out the rest. Cash patients see clear prices upfront, so there are never surprise bills.",
  },
  {
    title: "On-site Dispensary",
    body: "We keep a stocked dispensary at the practice, so most patients walk out with their medicine in hand straight after the consultation.",
  },
  {
    title: "Special Rates & Discounts",
    body: "We have special rates for pensioners, discounted rates for the Sharpeville community, and 10% off all services rendered at the moment.",
  },
];

const TEAM = [
  { name: "Dr M. E. Mukanzila", role: "General Practitioner" },
  { name: "Dr Kala", role: "General Practitioner" },
];

function WhyAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="border-t border-brand-950/10">
      {WHY_ITEMS.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.title} className="border-b border-brand-950/10">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center gap-3 py-5 text-left"
            >
              <span className="text-lg text-brand-950" aria-hidden="true">
                ✳
              </span>
              <span className="font-display text-lg font-bold text-brand-950 sm:text-xl">
                {item.title}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-lg pb-6 pl-8 text-sm leading-relaxed text-ink-600 sm:text-base">
                    {item.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  // The section is as tall as the horizontal overflow so scroll speed feels 1:1
  useEffect(() => {
    const measure = () => {
      if (trackRef.current && viewportRef.current) {
        setRange(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-cream-50 pt-24 sm:pt-0"
      style={{ height: range ? `calc(100vh + ${range}px)` : "300vh" }}
    >
      {/* Title block shown above sticky container on mobile, so it scrolls away */}
      <div className="mx-auto mb-6 max-w-3xl px-4 text-center sm:hidden">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm ring-1 ring-cream-200">
          <Cross className="h-3.5 w-3.5 text-brand-600" strokeWidth={2} />
          Our Services
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand-950">
          Complete Medical Care <br className="hidden sm:block" />
          for <span className="text-brand-600">the Whole Family</span>
        </h2>
      </div>

      <div
        ref={viewportRef}
        className="sticky top-[68px] flex h-[calc(100dvh-68px)] flex-col justify-start overflow-hidden sm:top-0 sm:h-screen sm:justify-center sm:pt-0"
      >
        {/* Title block inside sticky container on desktop */}
        <div className="mx-auto mb-6 hidden max-w-3xl px-4 text-center sm:mb-12 sm:block">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm ring-1 ring-cream-200">
            <Cross className="h-3.5 w-3.5 text-brand-600" strokeWidth={2} />
            Our Services
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:mt-6 sm:text-5xl">
            Complete Medical Care <br className="hidden sm:block" />
            for <span className="text-brand-600">the Whole Family</span>
          </h2>
          <p className="mt-3 hidden text-lg leading-relaxed text-ink-600 sm:block">
            Keep scrolling to browse everything we treat at the practice, from
            everyday illnesses to specialised procedures.
          </p>
        </div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-5 px-4 will-change-transform sm:gap-8 sm:px-8 lg:pl-[max(2rem,calc((100vw-72rem)/2))] lg:pr-[max(2rem,calc((100vw-72rem)/2))]"
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.name}
              className={`relative flex w-[88vw] max-w-[1000px] shrink-0 flex-col rounded-[2rem] p-5 sm:p-8 lg:grid lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:p-10 ${service.bg}`}
            >
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight text-brand-900 sm:text-4xl">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <div className="mt-4 lg:mt-auto">
                  <h3 className="font-display text-xl font-bold text-brand-950 sm:text-3xl">
                    {service.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600 line-clamp-3 sm:mt-3 sm:text-base sm:line-clamp-none">
                    {service.blurb}
                  </p>
                  <a
                    href="#appointment"
                    className="mt-6 hidden items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-brand-950 shadow-sm ring-1 ring-brand-950/5 transition hover:shadow-md lg:inline-flex"
                  >
                    Book a Visit
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-950 text-white">
                      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </a>
                </div>
              </div>
              <div
                className={`relative mt-4 h-[clamp(11rem,calc(100vh-33rem),30rem)] overflow-hidden rounded-2xl bg-gradient-to-br sm:h-64 lg:mt-0 lg:h-[420px] ${service.imageBg}`}
              >
                {/* Placeholder until the practice photos arrive */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <service.icon
                    className={`h-16 w-16 sm:h-28 sm:w-28 ${service.iconColor}`}
                    strokeWidth={1.2}
                  />
                </div>
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2 sm:inset-x-4 sm:bottom-4">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-900 shadow-sm sm:bg-white/90 sm:backdrop-blur"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-950" strokeWidth={2.5} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="#appointment"
                className="mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-brand-950 shadow-sm ring-1 ring-brand-950/5 lg:hidden"
              >
                Book a Visit
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-950 text-white">
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MobileWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const services = document.getElementById("services");
      
      if (!hero || !services) return;
      
      const heroRect = hero.getBoundingClientRect();
      const servicesRect = services.getBoundingClientRect();
      
      // Show when hero section is mostly out of view
      const isPastHero = heroRect.bottom <= 100;
      
      // Hide when on services section
      const isOnServices = servicesRect.top < window.innerHeight && servicesRect.bottom > 0;
      
      setIsVisible(isPastHero && !isOnServices);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 left-5 right-5 z-50 flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-base font-bold text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#20bd5a] md:hidden"
        >
          <WhatsAppIcon className="h-6 w-6" />
          WhatsApp Us
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <div className="bg-cream-50 selection:bg-brand-200 selection:text-brand-900">
      {/* Top info bar */}
      <div className="bg-brand-950 px-4 py-2 text-center text-xs text-brand-100 sm:text-sm font-medium tracking-wide">
        Open Monday to Sunday, 8:00 to 18:00 &nbsp;·&nbsp; 78 Cassandra Ave, Bedworth Park, Vereeniging
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-cream-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-4 sm:gap-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100 sm:h-10 sm:w-10">
              <Cross className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-brand-950 sm:text-xl">
              Dr Mukanzila&rsquo;s
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-ink-600 md:flex">
            <a href="#services" className="transition-colors hover:text-brand-600">Services</a>
            <a href="#prices" className="transition-colors hover:text-brand-600">Prices</a>
            <a href="#visit" className="transition-colors hover:text-brand-600">Visit Us</a>
            <a href="#appointment" className="transition-colors hover:text-brand-600">Appointments</a>
          </nav>
          <a
            href={PHONE_TEL}
            className="hidden items-center gap-2 rounded-xl bg-brand-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-950/10 transition-all hover:bg-brand-900 hover:shadow-brand-950/20 md:inline-flex"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-950 px-3.5 py-2 text-xs font-semibold text-white shadow-md sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:hidden"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2} />
            Call
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section id="hero" className="relative overflow-hidden">
          {/* Practice image background */}
          <div 
            className="absolute inset-0 bg-cover bg-center lg:bg-[size:100%_auto]" 
            style={{ backgroundImage: "url('/images/practice-outside.jpeg')" }}
          />
          {/* Light beige overlay with backdrop blur for text readability */}
          <div className="absolute inset-0 bg-white/82 backdrop-blur-[1.5px]"></div>

          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-24 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
              <motion.h1 variants={fadeInUp} className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-brand-950 sm:text-5xl lg:text-[3.4rem] xl:text-6xl">
                Your General Practitioner in <span className="text-brand-600">Vereeniging</span>, ready to see you today.
              </motion.h1>
              <motion.div variants={fadeInUp} className="mt-6 overflow-hidden rounded-2xl shadow-xl shadow-brand-950/10 ring-1 ring-brand-950/5 lg:hidden">
                <Image
                  src="/images/doctor-placeholder.png"
                  alt="General Practitioner at Dr Mukanzila's Surgery"
                  width={1280}
                  height={960}
                  priority
                  className="h-full w-full object-cover aspect-[4/3]"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:mt-10 lg:justify-start">
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-brand-600/40 active:translate-y-0"
                >
                  <Phone className="h-5 w-5" strokeWidth={2} />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[#25D366]/40 active:translate-y-0"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative hidden w-full lg:block"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-100 to-cream-50 rounded-[2.5rem] transform -rotate-3 z-0"></div>
              <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-950/10 ring-1 ring-brand-950/5">
                <Image
                  src="/images/doctor-placeholder.png"
                  alt="General Practitioner at Dr Mukanzila's Surgery"
                  width={1280}
                  height={960}
                  priority
                  className="h-full w-full object-cover aspect-[4/3] lg:aspect-[5/4] xl:aspect-[6/5]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 hidden items-center gap-4 rounded-2xl bg-white/95 p-5 shadow-xl shadow-brand-950/10 backdrop-blur-md ring-1 ring-cream-200 sm:flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <HeartPulse className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="text-sm leading-tight">
                  <p className="font-bold text-brand-950">Expert Care</p>
                  <p className="text-ink-500 mt-0.5">7 days a week</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Offers strip */}
        <div className="bg-brand-950 pb-36">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-center text-sm font-medium tracking-wide text-white sm:px-6">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> Special rates for pensioners</span>
            <span className="hidden text-white/20 sm:inline">|</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> Discounted rates for the Sharpeville community</span>
            <span className="hidden text-white/20 sm:inline">|</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> 10% off all services rendered</span>
          </div>
        </div>

        {/* Google Reviews */}
        <section aria-label="Google reviews" className="relative z-10 -mt-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-[2rem] bg-white p-4 shadow-2xl shadow-brand-950/25 ring-1 ring-cream-200 sm:p-8"
            >
              {/* Elfsight Google Reviews | Dr Mukanzila's Surgery */}
              <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
              <div
                className="elfsight-app-0b269927-4294-4794-ad12-aeef39472f31 min-h-[280px]"
                data-elfsight-app-lazy
              />
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <ServicesShowcase />

        {/* IV Drips & Pricing */}
        <section id="prices" className="scroll-mt-24 py-20 sm:py-28 bg-brand-950 text-white relative overflow-hidden">
          {/* Abstract background blobs for a modern medical feel */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-brand-900/20 blur-3xl"></div>
            <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-teal-900/20 blur-3xl"></div>
          </div>
          
          <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
            <div className="max-w-2xl text-center sm:text-left">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Clinical IV Therapy & Pricing
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-100">
                Transparent pricing for high-end wellness treatments. You know the exact cost before your procedure begins.
              </p>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {DRIPS.map((drip) => (
                <motion.div
                  variants={fadeInUp}
                  key={drip.name}
                  className="flex flex-col rounded-3xl bg-brand-900/50 p-8 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-brand-900 hover:ring-brand-500/50"
                >
                  <h3 className="font-display text-xl font-bold text-white">
                    {drip.name}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-400">
                    {drip.blurb}
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="font-display text-2xl font-semibold text-brand-400 tracking-tight">
                      {drip.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-4 text-base font-semibold text-brand-950 transition-all hover:bg-cream-100 active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                Ask about IV Therapy
              </a>
            </motion.div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-4 py-1.5 text-xs font-semibold text-ink-700 ring-1 ring-cream-200">
                <Cross className="h-3.5 w-3.5 text-brand-600" strokeWidth={2} />
                Why Choose Us
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-5xl">
                We Treat You Like Family, Because{" "}
                <span className="text-brand-500">Your Health Matters Most</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-600 sm:text-lg lg:mx-0">
                One practice for the whole family, with fair prices and a team
                that takes time with every patient.
              </p>
              <div className="mt-10 text-left">
                <WhyAccordion />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-brand-950/10 ring-1 ring-cream-200">
              <Image
                src="/images/waiting-area.jpeg"
                alt="Comfortable waiting area at Dr Mukanzila's Surgery in Vereeniging"
                width={900}
                height={1200}
                className="h-full max-h-[640px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-brand-100 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm ring-1 ring-cream-200">
                <Cross className="h-3.5 w-3.5 text-brand-600" strokeWidth={2} />
                Our Team
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-5xl">
                Our <span className="text-brand-500">Experts</span> in Family
                Health
              </h2>
              <p className="mt-4 leading-relaxed text-ink-600 sm:text-lg">
                Every visit is with a qualified doctor who listens first and
                explains everything in plain language.
              </p>
            </div>
            <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
              {TEAM.map((doc) => (
                <div key={doc.name} className="relative overflow-hidden rounded-2xl">
                  {/* Placeholder until the doctors' photos arrive */}
                  <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-brand-200 to-brand-300">
                    <User className="h-24 w-24 text-brand-400" strokeWidth={1.2} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-10 rounded-xl bg-white p-4 shadow-lg">
                    <p className="font-display text-lg font-bold text-brand-950">
                      {doc.name}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-500">{doc.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 sm:py-28 bg-cream-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl mb-12 text-center sm:text-left">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
                A Modern, Pristine Environment
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Experience healthcare in a facility designed for comfort, hygiene, and efficiency.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="group relative overflow-hidden rounded-[2rem] bg-cream-200 aspect-[3/4]">
                <Image
                  src="/images/reception.jpeg"
                  alt="Reception desk at Dr Mukanzila's Surgery"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              <div className="group relative overflow-hidden rounded-[2rem] bg-cream-200 aspect-[3/4] sm:-translate-y-8">
                <Image
                  src="/images/waiting-area.jpeg"
                  alt="Waiting area at Dr Mukanzila's Surgery"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              <div className="group relative overflow-hidden rounded-[2rem] bg-cream-200 aspect-[3/4]">
                <Image
                  src="/images/dispensary.jpeg"
                  alt="On-site medicine dispensary"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit us */}
        <section id="visit" className="scroll-mt-24 py-20 sm:py-28 bg-white border-t border-cream-100">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl lg:text-left">
                Locate Our Clinic
              </h2>
              <p className="mt-4 text-center text-lg leading-relaxed text-ink-600 lg:text-left">
                We are conveniently located on Cassandra Ave, directly opposite Bedworth Centre, with secure on-site parking.
              </p>
              <div className="mt-10 space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream-50 border border-cream-100">
                    <MapPin className="h-6 w-6 text-brand-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-950">Address</h4>
                    <p className="mt-1 text-ink-600">78 Cassandra Ave, Bedworth Park<br />Vereeniging, 1947</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream-50 border border-cream-100">
                    <Clock className="h-6 w-6 text-brand-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-950">Operating Hours</h4>
                    <p className="mt-1 text-ink-600">Monday to Sunday<br />08:00 – 18:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream-50 border border-cream-100">
                    <Phone className="h-6 w-6 text-brand-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-950">Contact</h4>
                    <p className="mt-1 text-ink-600">
                      <a href={PHONE_TEL} className="hover:text-brand-600 transition-colors font-medium">{PHONE_DISPLAY}</a><br />
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors font-medium">WhatsApp 076 359 8648</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-cream-200/50 ring-1 ring-cream-200">
              <iframe
                title="Map to Dr Mukanzila's Surgery, 78 Cassandra Ave, Bedworth Park, Vereeniging"
                src="https://www.google.com/maps?q=Dr%20Mukanzila's%20Surgery%2C%2078%20Cassandra%20Ave%2C%20Bedworth%20Park%2C%20Vereeniging%2C%201947&output=embed"
                className="h-[500px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 bg-cream-50 py-20 sm:py-28">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
          />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm ring-1 ring-cream-200">
                <Cross className="h-3.5 w-3.5 text-brand-600" strokeWidth={2} />
                FAQ
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-5xl">
                <span className="text-brand-500">Questions</span> We Get Often
              </h2>
              <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-600 sm:text-lg lg:mx-0">
                Answers to the things patients ask us most about visits, prices
                and medical aids.
              </p>
              <div className="mt-10 rounded-3xl bg-white p-7 text-left shadow-sm ring-1 ring-cream-200">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 text-brand-950">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-brand-950">
                  Still have a question?
                </h3>
                <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                  <p className="max-w-[220px] text-sm leading-relaxed text-ink-600">
                    Our front desk is ready to help with anything you need.
                  </p>
                  <a
                    href={PHONE_TEL}
                    className="inline-flex items-center gap-3 rounded-full bg-brand-950 py-2 pl-6 pr-2 text-sm font-semibold text-white transition hover:bg-brand-900"
                  >
                    Make a Call
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-brand-950/10 lg:mt-2">
              {FAQS.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Appointment form */}
        <section id="appointment" className="scroll-mt-24 py-20 sm:py-28 bg-brand-100">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-2xl shadow-cream-200/50 ring-1 ring-cream-200">
              <div className="mb-10 text-center">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-950">
                  Request a Consultation
                </h2>
                <p className="mt-3 text-lg text-ink-600">
                  Select a service and time. We will confirm via WhatsApp shortly.
                </p>
              </div>
              <AppointmentForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-950 py-16 text-ink-400">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-3 sm:px-6">
          <div>
            <a href="#top" className="flex items-center gap-2 mb-6 group inline-flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900/50 text-brand-400 transition-colors group-hover:bg-brand-900">
                <Cross className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                Dr Mukanzila&rsquo;s
              </span>
            </a>
            <p className="text-sm leading-relaxed">
              78 Cassandra Ave, Bedworth Park,<br />
              Vereeniging, 1947
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a href={PHONE_TEL} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp: 076 359 8648
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 tracking-wide text-sm uppercase">Information</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#prices" className="hover:text-white transition-colors">Pricing & IV Therapy</a></li>
              <li><a href="#visit" className="hover:text-white transition-colors">Location & Hours</a></li>
              <li><a href="#appointment" className="hover:text-white transition-colors">Book Appointment</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 tracking-wide text-sm uppercase">Primary Services</h3>
            <ul className="space-y-3 text-sm">
              <li>General Medicine</li>
              <li>Pregnancy & Family Planning</li>
              <li>Male Medical & Circumcision</li>
              <li>IV Drip Treatments</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-6xl border-t border-brand-900 px-4 pt-8 text-sm text-ink-500 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Dr Mukanzila&rsquo;s Surgery. All rights reserved.</p>
        </div>
      </footer>

      <MobileWhatsAppButton />
    </div>
  );
}
