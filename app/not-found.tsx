import type { Metadata } from "next";
import NotFoundScene from "./components/NotFoundScene";

export const metadata: Metadata = {
  title: "Page not found | Root Education",
};

export default function NotFound() {
  return (
    <main className="flex-1">
      <NotFoundScene />
    </main>
  );
}
