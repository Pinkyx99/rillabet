
'use client';

import { UnboxingExperience } from '@/components/unboxing-experience';

const dropItems = [
    { name: 'Dior Sticker - "High Top Shoe"', image: 'https://i.imgur.com/STJjZ0y.png', aiHint: 'dior high top shoe sticker', price: 2.29, percentage: '0.6954%' },
    { name: 'Cristiano Ronaldo Sticker', image: 'https://i.imgur.com/HQ4rXKJ.png', aiHint: 'ronaldo sticker', price: 1.99, percentage: '1.0054%' },
    { name: 'Supreme Sticker - FW19 Collection', image: 'https://i.imgur.com/XaROCqu.png', aiHint: 'supreme sticker', price: 1.69, percentage: '1.9124%' },
    { name: 'GoPro Black Sticker', image: 'https://i.imgur.com/FScxaEp.png', aiHint: 'gopro sticker', price: 1.34, percentage: '2.9984%' },
    { name: 'Vans Classic Green Logo Sticker', image: 'https://i.imgur.com/I8CQ0qQ.png', aiHint: 'vans logo sticker', price: 1.19, percentage: '4.3204%' },
    { name: 'Apple Logo Sticker', image: 'https://i.imgur.com/V1PquWM.png', aiHint: 'apple logo sticker', price: 0.79, percentage: '6.0521%' },
    { name: '"Buy The Dip" Sticker', image: 'https://i.imgur.com/Z7qdJTZ.png', aiHint: 'buy the dip sticker', price: 0.39, percentage: '8.6297%' },
    { name: '$0.05 RillaBox Voucher', image: 'https://i.imgur.com/taYNJzN.png', aiHint: 'rillabox voucher', price: 0.05, percentage: '35.1321%' },
    { name: '$0.01 RillaBox Voucher', image: 'https://i.imgur.com/T8J1Zy9.png', aiHint: 'rillabox voucher', price: 0.01, percentage: '39.2541%' },
];

export default function LuckyDipBoxPage() {
    return (
        <UnboxingExperience
            boxName="Lucky Dip"
            boxImage="https://i.imgur.com/js9o1CO.png"
            boxPrice={0.29}
            dropItems={dropItems}
        />
    );
}
