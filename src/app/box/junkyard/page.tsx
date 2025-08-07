
'use client';

import { UnboxingExperience } from '@/components/unboxing-experience';

const dropItems = [
    { name: 'Scissors', image: 'https://i.imgur.com/FTUSmxU.png', aiHint: 'pair scissors', price: 1.99, percentage: '0.7112%' },
    { name: 'Nails', image: 'https://i.imgur.com/tuwOizG.png', aiHint: 'metal nails', price: 1.59, percentage: '2.9967%' },
    { name: 'Sticky Notes', image: 'https://i.imgur.com/ptPT5Sl.png', aiHint: 'sticky notes', price: 1.24, percentage: '3.3647%' },
    { name: 'Eraser', image: 'https://i.imgur.com/ch0Nium.png', aiHint: 'pink eraser', price: 0.99, percentage: '4.0259%' },
    { name: 'Black Ink Pen', image: 'https://i.imgur.com/SON8gzS.png', aiHint: 'ink pen', price: 0.64, percentage: '4.5654%' },
    { name: 'Bandaid', image: 'https://i.imgur.com/Ssj1puq.png', aiHint: 'adhesive bandage', price: 0.34, percentage: '4.9084%' },
    { name: 'Stick', image: 'https://i.imgur.com/8i4QCyM.png', aiHint: 'wood stick', price: 0.19, percentage: '5.4623%' },
    { name: 'Sheet of Paper', image: 'https://i.imgur.com/UQRwSDY.png', aiHint: 'white paper', price: 0.01, percentage: '73.9654%' },
];

export default function JunkyardBoxPage() {
    return (
        <UnboxingExperience
            boxName="Junkyard"
            boxImage="https://i.imgur.com/knHJPhj.png"
            boxPrice={0.14}
            dropItems={dropItems}
        />
    );
}
