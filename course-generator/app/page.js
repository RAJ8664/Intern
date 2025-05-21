import Image from "next/image";
import { Button } from "@/components/ui/button";
import  Header  from "./_components/Header.jsx";
import Hero from "./_components/Hero.jsx";
export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
    </div>
  );
}
