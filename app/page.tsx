import Hero from "./components/Hero";
import HowWeHelp from "./components/HowWeHelp";
import Stats from "./components/Stats";
import WhyRoot from "./components/WhyRoot";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <WhyRoot />
      <HowWeHelp />
      <section className="min-h-screen bg-white" />
    </main>
  );
}
