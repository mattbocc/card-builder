import React, { useState } from 'react';
import Settings from '../components/settings/Settings';
import Poke from '../components/cards/Poke';
import type { CardStyleType } from '../types/CardStyleType';
import type { EnergyType } from '../types/EnergyType';
import type { AbilityType } from '../types/AbilityType';
import type { AttackType } from '../types/AttackType';
import type { CropperType } from '../types/CropperType';

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
    const [crop, setCrop] = useState<CropperType>({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = useState<number>(1);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-row mx-auto items-start gap-10 py-10">
                <Poke
                    cardStyle={cardStyle}
                    cardType={cardType}
                    evolution={evolution}
                    weaknessEnergy={weaknessEnergy}
                    resistanceEnergy={resistanceEnergy}
                    retreatEnergy={retreatEnergy}
                    ability={ability}
                    attack={attack}
                    crop={crop}
                    zoom={zoom}
                    setCrop={setCrop}
                    setZoom={setZoom}
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
