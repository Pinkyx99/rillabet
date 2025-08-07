
'use client';

import { UnboxingExperience } from '@/components/unboxing-experience';

const dropItems = [
    { name: 'Po "SKADOOSH" Sticker', image: 'https://i.imgur.com/rWG7jdb.png', aiHint: 'kung fu panda', price: 4.69, percentage: '0.6221%' },
    { name: 'Patrick Star Ass Sticker', image: 'https://i.imgur.com/uHbvOJP.png', aiHint: 'patrick star sticker', price: 3.49, percentage: '1.2764%' },
    { name: 'Baljeet Phineas and Ferb Sticker', image: 'https://i.imgur.com/NhxA3Ii.png', aiHint: 'baljeet sticker', price: 2.89, percentage: '1.7224%' },
    { name: 'Diabeto Family Guy Sticker', image: 'https://i.imgur.com/HFREXFA.png', aiHint: 'diabeto sticker', price: 2.29, percentage: '2.9765%' },
    { name: 'Jerry "Don\'t Be A Jerry" Sticker', image: 'https://i.imgur.com/FbAZVso.png', aiHint: 'jerry sticker', price: 1.79, percentage: '3.5142%' },
    { name: 'Rocket Guardians Of The Galaxy Sticker', image: 'https://i.imgur.com/iVMJGKw.png', aiHint: 'rocket raccoon sticker', price: 1.34, percentage: '4.0325%' },
    { name: 'Panda We Bare Bears Sticker', image: 'https://i.imgur.com/BM2BOaK.png', aiHint: 'panda bear sticker', price: 0.89, percentage: '5.2132%' },
    { name: 'Rigby "Eggscellnt" Sticker', image: 'https://i.imgur.com/cy5eZqZ.png', aiHint: 'rigby sticker', price: 0.69, percentage: '6.8791%' },
    { name: '$0.10 PinkyBox Voucher', image: 'https://i.imgur.com/c3s59tk.png', aiHint: 'PinkyBox voucher', price: 0.1, percentage: '36.8821%' },
    { name: '$0.01 PinkyBox Voucher', image: 'https://i.imgur.com/pp85Apw.png', aiHint: 'PinkyBox voucher', price: 0.01, percentage: '41.2231%' },
];

export default function StickerStackerBoxPage() {
    return (
        <UnboxingExperience
            boxName="Sticker Stacker"
            boxImage="https://i.imgur.com/NsSL41j.png"
            boxPrice={0.44}
            dropItems={dropItems}
        />
    );
}
