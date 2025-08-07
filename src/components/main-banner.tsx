
'use client';
import Image from 'next/image';

export function MainBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="relative w-full overflow-hidden rounded-2xl animate-rainbow-glow">
        <Image
          src="https://i.imgur.com/aw1UedE.png"
          alt="Promotional banner for PinkyBox"
          width={1920}
          height={700}
          layout="responsive"
          data-ai-hint="promo banner"
          quality={100}
          className="rounded-2xl"
        />
      </div>
    </section>
  );
}
