import type { Metadata } from "next";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Root Education",
  description:
    "Talk to Root Education: send us a message, book a free consultation or visit our offices in London and Dhaka.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <Contact />
    </main>
  );
}
