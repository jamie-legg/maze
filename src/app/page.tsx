import Image from "next/image";
import Maze from "./components/Maze";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense>
        <Maze />
      </Suspense>
    </main>
  );
}
