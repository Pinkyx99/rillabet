
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedBox {
  name: string;
  image: string;
  aiHint: string;
  price?: string;
  isSpecial?: boolean;
  link?: string;
}

const boxes: FeaturedBox[] = [
  { name: "Lucky Dip", price: "$0.29", image: "https://i.imgur.com/js9o1CO.png", aiHint: "lucky dip box", isSpecial: true, link: '/box/lucky-dip' },
  { name: "1% iPhone", price: "$2.79", image: "https://i.imgur.com/rrgz00G.png", aiHint: "iphone box", isSpecial: true, link: '/box/iphone' },
  { name: "Junkyard", price: "$0.14", image: "https://i.imgur.com/knHJPhj.png", aiHint: "junkyard box", isSpecial: true, link: '/box/junkyard' },
];

export function FeaturedBoxes() {
  return (
    <section>
      <div className="flex justify-center mb-4">
        <Button variant="outline" className="border-primary/50 bg-card hover:bg-primary/20">Featured boxes</Button>
      </div>
      <p className="text-center text-muted-foreground mb-8">Discover & win the hottest items in our provably fair boxes</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {boxes.map((box) => {
          const cardContent = (
             <>
              {box.isSpecial ? (
                <div className="group cursor-pointer rounded-lg flex flex-col items-center justify-end text-center transition-all duration-300 active:scale-95 relative overflow-hidden h-full bg-card/50 p-4 hover:bg-card/80">
                  <div className="relative w-full h-32 mb-4">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={box.aiHint}
                    />
                  </div>
                  <div className="mt-auto text-center w-full">
                    <p className="font-bold text-lg text-white truncate">{box.name}</p>
                    {box.price && (
                       <div className="inline-block bg-primary/80 text-white font-bold rounded-md px-4 py-2 mt-2 shadow-md w-full">
                        {box.price}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Card className="bg-card border-primary/20 group overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-glow-accent cursor-pointer h-full">
                  <CardContent className="p-0 relative">
                    <Image
                      src={box.image}
                      alt={box.name}
                      width={300}
                      height={300}
                      className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={box.aiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <p className="absolute bottom-2 left-2 font-semibold text-sm">{box.name}</p>
                  </CardContent>
                </Card>
              )}
            </>
          );

          if (box.link) {
            return (
              <Link href={box.link} key={box.name} className="block h-full">
                {cardContent}
              </Link>
            );
          }

          return <div key={box.name} className="h-full">{cardContent}</div>;
        })}
      </div>
       <div className="flex justify-start mt-4">
        <Button variant="ghost" size="icon" className="bg-card hover:bg-primary/20">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
