import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "BEST Doctor Vereeniging - looking for a doctor near me, GP consultations, pregnancy care, circumcision, medicals or IV drips near me? Dr Mukanzila's Surgery in Bedworth Park is the place to be",
  description:
    "Trusted family doctor in Bedworth Park, Vereeniging. Walk-ins welcome Mon-Fri 8am-6pm and Sat 8am-3pm, most medical aids accepted, special rates for pensioners. Call 016 020 0081.",
  openGraph: {
    title: "Dr Mukanzila's Surgery | Family Doctor in Vereeniging",
    description:
      "Walk-ins welcome Mon-Fri 8am-6pm and Sat 8am-3pm. Most medical aids accepted. 78 Cassandra Ave, Bedworth Park, Vereeniging. Call 016 020 0081.",
    locale: "en_ZA",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Dr Mukanzila's Surgery",
  description:
    "Family medical practice in Bedworth Park, Vereeniging offering general medicine, pregnancy care, family planning, HIV care, circumcision, medicals, minor surgical procedures and IV drip treatments.",
  telephone: "+27160200081",
  address: {
    "@type": "PostalAddress",
    streetAddress: "78 Cassandra Ave, Bedworth Park",
    addressLocality: "Vereeniging",
    postalCode: "1947",
    addressCountry: "ZA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "15:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "75",
  },
  priceRange: "R450 - R970",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
