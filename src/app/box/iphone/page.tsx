
'use client';

import { UnboxingExperience } from '@/components/unboxing-experience';

const dropItems = [
    { name: 'iPhone 16 - Ultramarine, 128GB', image: 'https://i.imgur.com/uioI8os.png', aiHint: 'blue iphone', price: 799.99, percentage: '0.1454%' },
    { name: 'iPhone 16e - White, 128GB', image: 'https://i.imgur.com/PnE5NlY.png', aiHint: 'white iphone', price: 599.99, percentage: '0.2865%' },
    { name: 'iPhone 12 - Black, 64GB', image: 'https://i.imgur.com/xMxxApt.png', aiHint: 'black iphone', price: 249.99, percentage: '0.3912%' },
    { name: 'iPhone SE 2nd Generation - Black', image: 'https://i.imgur.com/72vLnYr.png', aiHint: 'black iphone se', price: 144.99, percentage: '0.4587%' },
    { name: 'Belkin BoostCharge Pro', image: 'https://i.imgur.com/e2Ah65e.png', aiHint: 'magnetic power bank', price: 64.49, percentage: '0.7432%' },
    { name: 'DJI Osmo Mobile SE', image: 'https://i.imgur.com/PhOwLsG.png', aiHint: 'phone gimbal', price: 74.99, percentage: '0.6688%' },
    { name: 'Wireless Carplay Adapter', image: 'https://i.imgur.com/Cv8Rnva.png', aiHint: 'carplay adapter', price: 50.49, percentage: '0.8554%' },
    { name: 'Anker iPhone Lightning Charger', image: 'https://i.imgur.com/OaLRvx1.png', aiHint: 'iphone charger', price: 18.99, percentage: '2.0013%' },
    { name: 'Apple EarPods with Lightning Connector', image: 'https://i.imgur.com/HNCuhm2.png', aiHint: 'apple earpods', price: 27.99, percentage: '1.3409%' },
    { name: 'mophie Dual USB-C 40W PD Car Charger', image: 'https://i.imgur.com/D5piXn3.png', aiHint: 'car charger', price: 38.99, percentage: '0.9989%' },
    { name: 'Adjustable Phone Stand for Desk', image: 'https://i.imgur.com/OSKGp2l.png', aiHint: 'phone stand', price: 11.99, percentage: '2.6601%' },
    { name: 'Transparent iPhone Case Cover', image: 'https://i.imgur.com/D0q8ONW.png', aiHint: 'transparent iphone case', price: 7.29, percentage: '3.1727%' },
    { name: 'Tempered Glass Screen Protector', image: 'https://i.imgur.com/XksWFiD.png', aiHint: 'screen protector', price: 4.19, percentage: '4.6665%' },
    { name: 'Authentic Apple Logo Sticker', image: 'https://i.imgur.com/YVIFcn1.png', aiHint: 'apple logo sticker', price: 1.09, percentage: '37.9354%' },
    { name: 'Side Eye Emoji Sticker', image: 'https://i.imgur.com/HMS6EAa.png', aiHint: 'emoji sticker', price: 0.14, percentage: '43.6746%' },
];

export default function IphoneBoxPage() {
    return (
        <UnboxingExperience
            boxName="1% iPhone"
            boxImage="https://i.imgur.com/HuKgXB4.png"
            dropItems={dropItems}
            boxPrice={2.79}
        />
    );
}
