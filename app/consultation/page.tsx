import type { Metadata } from "next";
import ConsultationBooking from "../components/ConsultationBooking";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Root Education",
  description: "Book a free 30-minute study abroad consultation with a Root Education advisor, by video, phone or in our London and Dhaka offices.",
};

export default function ConsultationPage() {
  return (
    <main className="flex-1">
      <ConsultationBooking />
    </main>
  );
}
