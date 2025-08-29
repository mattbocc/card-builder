import React, { useState } from 'react';
import Settings from '../components/settings/Settings';
import type { CardStyleType } from '../types/CardStyleType';
import Poke from '../components/cards/poke';
import type { EnergyType } from '../types/EnergyType';

const Home: React.FC = () => {
    // State Variables
    const [cardStyle, setCardStyle] = useState<CardStyleType>({
        name: 'Sun and Moon',
        style: 'regular',
        version: 'sun_moon'
    });
    const [cardType, setCardType] = useState<string>('colorless');
    const [evolution, setEvolution] = useState<string>('basic');
    const [weaknessEnergy, setWeaknessEnergy] = useState<EnergyType>({
        type: 'colorless',
        total: 1
    });
    const [resistanceEnergy, setResistanceEnergy] = useState<EnergyType>({
        type: 'colorless',
        total: 1
    });
    const [retreatEnergy, setRetreatEnergy] = useState<EnergyType>({
        type: 'colorless',
        total: 1
    });

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
            <div className="flex flex-row justify-center items-center mx-auto gap-10 py-44">
                <Poke
                    cardStyle={cardStyle}
                    cardType={cardType}
                    evolution={evolution}
                    weaknessEnergy={weaknessEnergy}
                    resistanceEnergy={resistanceEnergy}
                    retreatEnergy={retreatEnergy}
                />
                <Settings
                    setCardStyle={setCardStyle}
                    setCardType={setCardType}
                    setEvolution={setEvolution}
                    setWeaknessEnergy={setWeaknessEnergy}
                    setResistanceEnergy={setResistanceEnergy}
                    setRetreatEnergy={setRetreatEnergy}
                    weaknessEnergy={weaknessEnergy}
                    resistanceEnergy={resistanceEnergy}
                    retreatEnergy={retreatEnergy}
                />
            </div>
        </div>
    );
};

export default Home;
