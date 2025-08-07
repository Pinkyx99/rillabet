
'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface GameMode {
  name: string;
  image: string;
  aiHint: string;
  link?: string;
}

const gameModes: GameMode[] = [
  { name: "Mystery Boxes", image: "https://i.imgur.com/3HcCrHx.png", aiHint: "glowing box", link: "/boxes" },
  { name: "Battles", image: "https://placehold.co/300x200.png", aiHint: "crossed swords" },
  { name: "Crash", image: "https://placehold.co/300x200.png", aiHint: "rocket launch" },
  { name: "Plinko", image: "https://placehold.co/300x200.png", aiHint: "abstract spheres" },
];

export function GameModes() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gameModes.map((mode) => {
          const cardContent = (
            <Card key={mode.name} className="bg-card hover:bg-primary/20 border-primary/20 transition-all duration-300 hover:-translate-y-1 group cursor-pointer overflow-hidden aspect-[3/2]">
              <CardContent className="p-0 relative h-full w-full">
                <Image
                  src={mode.image}
                  alt={mode.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={mode.aiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-4 left-4 text-lg font-bold">{mode.name}</p>
              </CardContent>
            </Card>
          );

          if (mode.link) {
            return (
              <Link href={mode.link} key={mode.name}>
                {cardContent}
              </Link>
            )
          }
          return cardContent;
        })}
      </div>
    </section>
  );
}
