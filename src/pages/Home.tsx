import React, { useState } from 'react';
import Settings from '../components/settings/Settings';
import type { CardStyleType } from '../types/CardStyleType';

const Home: React.FC = () => {
    // State Variables
    const [cardStyle, setCardStyle] = useState<CardStyleType>({
        name: 'Sun and Moon',
        style: 'regular',
        version: 'sun_moon'
    });
    const [cardType, setCardType] = useState<string>('colorless');
    const [evolution, setEvolution] = useState<string>('basic');

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
            <div className="flex flex-row justify-center items-center mx-auto gap-10 py-44">
                <div className="flex flex-col w-[600px] relative">
                    <img
                        src={`/images/${cardStyle.version}/${cardStyle.style}/${cardType}_${evolution}.png`}
                        alt="card-holder"
                        className="z-1"
                    />
                    <div className="flex flex-row absolute top-7 left-28 z-2">
                        <span className="pokemon-title text-4xl">Matthew & Lisa</span>
                    </div>
                    <div className="flex flex-col absolute top-10 ">
                        <img src="/images/picture/kitty_land.png" alt="card-picture" />
                    </div>
                    <div className="flex flex-row gap-2 items-end absolute bottom-23.5 left-23 z-2">
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-5 h-5" />
                        <span className="pokemon-energy text-2xl leading-6">x</span>
                        <span className="pokemon-energy text-3xl leading-6">1</span>
                    </div>
                    <div className="flex flex-row gap-0.5 items-center absolute bottom-23.5 left-66 z-2">
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-5 h-5" />
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-5 h-5" />
                    </div>
                    <div className="flex flex-row gap-0.5 items-center absolute bottom-23.5 left-110 z-2">
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-5 h-5" />
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-5 h-5" />
                    </div>
                </div>
                <Settings setCardStyle={setCardStyle} setCardType={setCardType} setEvolution={setEvolution} />
            </div>
        </div>
    );
};

export default Home;
