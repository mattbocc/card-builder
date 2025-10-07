import React, { useState, useRef } from 'react';
import Settings from '../components/settings/Settings';
import Poke from '../components/cards/Poke';
import type { CardStyleType } from '../types/CardStyleType';
import type { EnergyType } from '../types/EnergyType';
import type { AbilityType } from '../types/AbilityType';
import type { AttackType } from '../types/AttackType';
import type { CropperType } from '../types/CropperType';
import type { CroppedAreaPixelsType } from '../types/CroppedAreaPixelsType';

const Home: React.FC = () => {
    /* State Variables */

    // General Section
    const [cardStyle, setCardStyle] = useState<CardStyleType>({
        name: 'Sun and Moon',
        style: 'regular',
        version: 'sun_moon'
    });
    const [cardType, setCardType] = useState<string>('colorless');
    const [evolution, setEvolution] = useState<string>('basic');
    const [title, setTitle] = useState<string>('');
    const [health, setHealth] = useState<string>('');
    const [showHP, setShowHP] = useState<boolean>(true);

    // Energy Styles Section
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

    // Ability Section
    const [ability, setAbility] = useState<AbilityType>({
        name: 'Ability-name',
        description: 'Ability-description'
    });

    // Attack Section
    const [attack, setAttack] = useState<AttackType>({
        name: 'Attack-name',
        description: 'Attack-description',
        attackEnergy: {
            type: 'colorless',
            total: 0
        },
        show: false
    });
    const [crop, setCrop] = useState<CropperType>({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixelsType | null>(null);
    const [aiImage, setAiImage] = React.useState<string>('/images/output/output_image.png');
    const [isPortrait, setIsPortrait] = useState<boolean>(false);

    // Pokemon Card export
    const exportRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-row col:flex-col mx-auto items-start justify-center col:items-center gap-10 pt-10 pb-32">
                <Poke
                    cardStyle={cardStyle}
                    cardType={cardType}
                    evolution={evolution}
                    title={title}
                    health={health}
                    showHP={showHP}
                    weaknessEnergy={weaknessEnergy}
                    resistanceEnergy={resistanceEnergy}
                    retreatEnergy={retreatEnergy}
                    ability={ability}
                    attack={attack}
                    croppedAreaPixels={croppedAreaPixels}
                    aiImage={aiImage}
                    isPortrait={isPortrait}
                    exportRef={exportRef}
                />
                <Settings
                    setCardStyle={setCardStyle}
                    setCardType={setCardType}
                    setEvolution={setEvolution}
                    setTitle={setTitle}
                    setHealth={setHealth}
                    setShowHP={setShowHP}
                    setWeaknessEnergy={setWeaknessEnergy}
                    setResistanceEnergy={setResistanceEnergy}
                    setRetreatEnergy={setRetreatEnergy}
                    setAbility={setAbility}
                    setAttack={setAttack}
                    setCrop={setCrop}
                    setZoom={setZoom}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                    setAiImage={setAiImage}
                    setIsPortrait={setIsPortrait}
                    cardStyle={cardStyle}
                    cardType={cardType}
                    evolution={evolution}
                    title={title}
                    showHP={showHP}
                    health={health}
                    weaknessEnergy={weaknessEnergy}
                    resistanceEnergy={resistanceEnergy}
                    retreatEnergy={retreatEnergy}
                    ability={ability}
                    attack={attack}
                    crop={crop}
                    zoom={zoom}
                    aiImage={aiImage}
                    isPortrait={isPortrait}
                    exportRef={exportRef}
                />
            </div>
        </div>
    );
};

export default Home;
