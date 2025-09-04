import React, { useState } from 'react';
import Settings from '../components/settings/Settings';
import Poke from '../components/cards/Poke';
import type { CardStyleType } from '../types/CardStyleType';
import type { EnergyType } from '../types/EnergyType';
import type { AbilityType } from '../types/AbilityType';
import type { AttackType } from '../types/AttackType';

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
        total: 0
    });
    const [resistanceEnergy, setResistanceEnergy] = useState<EnergyType>({
        type: 'colorless',
        total: 0
    });
    const [retreatEnergy, setRetreatEnergy] = useState<EnergyType>({
        type: 'colorless',
        total: 0
    });
    const [ability, setAbility] = useState<AbilityType>({
        name: 'Ability-name',
        description: 'Ability-description'
    });
    const [attack, setAttack] = useState<AttackType>({
        name: 'Attack-name',
        description: 'Attack-description',
        attackEnergy: {
            type: 'colorless',
            total: 0
        }
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
                    ability={ability}
                    attack={attack}
                />
                <Settings
                    setCardStyle={setCardStyle}
                    setCardType={setCardType}
                    setEvolution={setEvolution}
                    setWeaknessEnergy={setWeaknessEnergy}
                    setResistanceEnergy={setResistanceEnergy}
                    setRetreatEnergy={setRetreatEnergy}
                    setAbility={setAbility}
                    setAttack={setAttack}
                    weaknessEnergy={weaknessEnergy}
                    resistanceEnergy={resistanceEnergy}
                    retreatEnergy={retreatEnergy}
                    ability={ability}
                    attack={attack}
                />
            </div>
        </div>
    );
};

export default Home;
