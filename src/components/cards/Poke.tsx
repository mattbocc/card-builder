import React, { useEffect, useState } from 'react';
import type { CardStyleType } from '../../types/CardStyleType';
import type { EnergyType } from '../../types/EnergyType';
import type { AbilityType } from '../../types/AbilityType';
import type { AttackType } from '../../types/AttackType';
import type { CroppedAreaPixelsType } from '../../types/CroppedAreaPixelsType';
import { CroppedImage } from './CroppedImage';

type CardProps = {
    cardStyle: CardStyleType;
    cardType: string;
    evolution: string;
    title: string;
    health: string;
    showHP: boolean;
    weaknessEnergy: EnergyType;
    resistanceEnergy: EnergyType;
    retreatEnergy: EnergyType;
    ability: AbilityType;
    attack: AttackType;
    croppedAreaPixels: CroppedAreaPixelsType | null;
    aiImage: string;
    isLandscape: boolean;
};

const Poke: React.FC<CardProps> = ({
    cardStyle,
    cardType,
    evolution,
    title,
    health,
    showHP,
    weaknessEnergy,
    resistanceEnergy,
    retreatEnergy,
    ability,
    attack,
    croppedAreaPixels,
    aiImage,
    isLandscape
}) => {
    const [outputImage, setOutputImage] = useState<string>('/images/output/output_image.png');
    useEffect(() => {
        async function getCroppedImage() {
            if (!croppedAreaPixels) return;
            const url = await CroppedImage(aiImage, croppedAreaPixels);
            setOutputImage(url);
        }
        getCroppedImage();
    }, [croppedAreaPixels, aiImage]);

    return (
        <div className="flex flex-col items-center w-[600px] sticky smd:static top-10 align-self">
            <img
                src={`/images/${cardStyle.version}/${cardStyle.style}/${cardType}_${evolution}.png`}
                alt="card-holder"
                className="z-1"
            />
            <div className="flex flex-row absolute top-7 left-28 z-2">
                <span className={`pokemon-title text-heading4Xl ${isLandscape ? '' : 'outline-white'}`}>{title}</span>
            </div>
            {health ? (
                <div className="flex flex-row items-baseline gap-2 absolute top-9 right-20 z-2 max-[50px]">
                    {showHP ? (
                        <span className={`pokemon-title text-headingMd ${isLandscape ? '' : 'outline-white'}`}>HP</span>
                    ) : null}
                    <span className={`pokemon-title text-heading2Xl ${isLandscape ? '' : 'outline-white'}`}>
                        {health}
                    </span>
                </div>
            ) : null}

            <div className={`absolute ${isLandscape ? 'top-18' : 'h-full w-full rounded-[36px] overflow-hidden'}`}>
                <img src={outputImage} alt="cropped" className={`${isLandscape ? 'max-h-[380px]' : 'w-full h-full'}`} />
            </div>
            <div className="flex flex-row gap-2 items-end absolute bottom-23.5 left-23 z-2">
                <img src={`/images/energy/${weaknessEnergy.type}.png`} alt="weakness-energy" className="w-5 h-5" />
                <span className="pokemon-energy text-xl leading-6">x</span>
                <span className="pokemon-energy text-2xl leading-5.5">{weaknessEnergy.total}</span>
            </div>
            <div className="flex flex-row gap-2 items-end absolute bottom-23.5 left-66 z-2">
                <img src={`/images/energy/${resistanceEnergy.type}.png`} alt="resistance-energy" className="w-5 h-5" />
                <span className="pokemon-energy text-2xl leading-6">-</span>
                <span className="pokemon-energy text-2xl leading-5.5">{resistanceEnergy.total}</span>
            </div>
            <div className="flex flex-row gap-0.5 items-end absolute bottom-23.5 left-111 z-2">
                {retreatEnergy.total > 0 ? (
                    <>
                        {Array.from({ length: retreatEnergy.total }).map((_, index) => (
                            <img
                                key={index}
                                src={`/images/energy/${retreatEnergy.type}.png`}
                                alt="retreat-energy"
                                className="w-5 h-5"
                            />
                        ))}
                    </>
                ) : null}
            </div>

            <div className="flex flex-col gap-6 absolute bottom-74 z-4 px-12 w-full">
                <div className="flex flex-row gap-8">
                    <img src="/images/sun_moon/ability.png" />
                    <h3 className={`text-headingXl text-red-800 font-bold ${isLandscape ? '' : 'outline-white'}`}>
                        {ability.name}
                    </h3>
                </div>
                <h4 className={`text-headingMd font-semibold ${isLandscape ? '' : 'outline-black text-white'}`}>
                    {ability.description}
                </h4>
            </div>

            <div className="flex flex-col gap-4 absolute bottom-52 z-4 px-12 w-full">
                <div className="flex flex-row justify-between items-end w-full">
                    <img src={`/images/energy/${attack.attackEnergy.type}.png`} className="w-6 h-6" />
                    <h2 className={`text-headingXl font-bold ${isLandscape ? '' : 'outline-white'}`}>{attack.name}</h2>
                    <h3 className="text-headingXl font-bold">{attack.attackEnergy.total}</h3>
                </div>
                <h4 className={`text-headingMd font-semibold ${isLandscape ? '' : 'outline-black text-white'}`}>
                    {attack.description}
                </h4>
            </div>
        </div>
    );
};

export default Poke;
