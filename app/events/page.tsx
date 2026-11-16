import type { Metadata } from "next";
import Events from "../components/Events";

export const metadata: Metadata = {
  title: "Events & Webinars | Root Education",
  description:
    "Free study abroad webinars, education fairs and workshops from Root Education, online and at our London and Dhaka offices.",
};

export default function EventsPage() {
  return (
    <main className="flex-1">
      <Events />
    </main>
  );
}
