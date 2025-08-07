import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Swords, Box } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface GameMode {
  name: string;
  image: string;
  aiHint: string;
}

const gameModes: GameMode[] = [
  { name: "Mystery Boxes", image: "https://placehold.co/300x200.png", aiHint: "glowing box" },
  { name: "Battles", image: "https://placehold.co/300x200.png", aiHint: "crossed swords" },
  { name: "Crash", image: "https://placehold.co/300x200.png", aiHint: "rocket launch" },
  { name: "Plinko", image: "https://placehold.co/300x200.png", aiHint: "abstract spheres" },
];

export function GameModes() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gameModes.map((mode) => (
          <Card key={mode.name} className="bg-card hover:bg-primary/20 border-primary/20 transition-all duration-300 hover:-translate-y-1 group cursor-pointer overflow-hidden">
            <CardContent className="p-0 relative">
              <Image
                src={mode.image}
                alt={mode.name}
                width={300}
                height={200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={mode.aiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <p className="absolute bottom-4 left-4 text-lg font-bold">{mode.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
