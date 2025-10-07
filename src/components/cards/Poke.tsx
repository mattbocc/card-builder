import React, { useEffect, useState, useRef } from 'react';
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
    isPortrait: boolean;
    exportRef: React.RefObject<HTMLDivElement | null>;
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
    isPortrait,
    exportRef
}) => {
    const [outputImage, setOutputImage] = useState<string>(`/images/output/output_image.png?t=${Date.now()}`);
    useEffect(() => {
        async function getCroppedImage() {
            if (!croppedAreaPixels) return;
            const url = await CroppedImage(aiImage, croppedAreaPixels);
            setOutputImage(url);
        }
        getCroppedImage();
    }, [croppedAreaPixels, aiImage]);

    return (
        <div
            className="flex flex-col items-center w-[600px] smd:w-[350px] sticky smd:relative top-10 align-self"
            ref={exportRef}
        >
            <img
                src={`/images/${cardStyle.version}/${cardStyle.style}/${cardType}_${evolution.replaceAll(' ', '')}.png`}
                alt="card-holder"
                className="z-1"
            />
            <div className="flex flex-row absolute top-7 smd:top-4.5 left-28 smd:left-17 z-2">
                <span
                    className={`pokemon-title text-heading4Xl smd:text-headingLg whitespace-nowrap leading-none text-ellipsis ${
                        isPortrait ? 'outline-white' : ''
                    }`}
                >
                    {title}
                </span>
            </div>
            {health ? (
                <div className="flex flex-row items-baseline gap-2 absolute top-9 smd:top-4 right-20 smd:right-12  z-2 max-[50px]">
                    {showHP ? (
                        <span
                            className={`pokemon-title text-headingMd smd:text-headingXs ${
                                isPortrait ? 'outline-white' : ''
                            }`}
                        >
                            HP
                        </span>
                    ) : null}
                    <span
                        className={`pokemon-title text-heading2Xl smd:text-headingLg whitespace-nowrap leading-none text-ellipsis ${
                            isPortrait ? 'outline-white' : ''
                        }`}
                    >
                        {health}
                    </span>
                </div>
            ) : null}

            <div
                className={`absolute ${
                    isPortrait ? 'h-full w-full rounded-[36px] overflow-hidden' : 'top-18 smd:top-10.5'
                }`}
            >
                <img src={outputImage} alt="cropped" className={`${isPortrait ? 'w-full h-full' : 'max-h-[380px]'}`} />
            </div>
            <div className="flex flex-row gap-2 smd:gap-1.25 items-end absolute bottom-23.5 smd:bottom-13.5 left-23 smd:left-13.5 z-2">
                <img
                    src={`/images/energy/${weaknessEnergy.type}.png`}
                    alt="weakness-energy"
                    className="w-5 h-5 smd:w-3.25 smd:h-3.25"
                />
                <span className="pokemon-energy text-xl smd:text-sm leading-6 smd:leading-3.5">x</span>
                <span className="pokemon-energy text-2xl smd:text-lg leading-5.5 smd:leading-4">
                    {weaknessEnergy.total}
                </span>
            </div>
            <div className="flex flex-row gap-2 smd:gap-1.25 items-end absolute bottom-23.5 smd:bottom-13.5 left-66 smd:left-39 z-2">
                <img
                    src={`/images/energy/${resistanceEnergy.type}.png`}
                    alt="resistance-energy"
                    className="w-5 h-5 smd:w-3.25 smd:h-3.25"
                />
                <span className="pokemon-energy text-2xl smd:text-lg leading-6 smd:leading-4.5">-</span>
                <span className="pokemon-energy text-2xl smd:text-lg leading-5.5 smd:leading-4">
                    {resistanceEnergy.total}
                </span>
            </div>
            <div className="flex flex-row gap-0.5 items-end absolute bottom-23.5 smd:bottom-13.5 left-111 smd:left-65 z-2">
                {retreatEnergy.total > 0 ? (
                    <>
                        {Array.from({ length: retreatEnergy.total }).map((_, index) => (
                            <img
                                key={index}
                                src={`/images/energy/${retreatEnergy.type}.png`}
                                alt="retreat-energy"
                                className="w-5 h-5 smd:w-3.25 smd:h-3.25"
                            />
                        ))}
                    </>
                ) : null}
            </div>

            <div
                className={`flex flex-col gap-6 smd:gap-3 absolute z-4 px-12 smd:px-7 w-full ${
                    attack.show ? 'bottom-74' : 'bottom-52 smd:bottom-22'
                } h-28`}
            >
                <div className="flex flex-row gap-8 smd:gap-5 items-start">
                    <img src="/images/sun_moon/power.png" className="min-w-44 max-w-44 smd:min-w-26 smd:max-w-26" />
                    <h3
                        className={`text-headingXl smd:text-headingMd text-red-800 font-bold ${
                            isPortrait ? 'outline-white' : ''
                        }`}
                    >
                        {ability.name}
                    </h3>
                </div>
                <h4
                    className={`text-headingLg smd:text-headingSm font-semibold ${
                        isPortrait ? 'outline-black text-white' : ''
                    }`}
                >
                    {ability.description}
                </h4>
            </div>

            {attack.show ? (
                <div className="flex flex-col gap-4 absolute bottom-52 z-4 px-12 w-full h-40">
                    <div className="flex flex-row justify-between items-end w-full">
                        <img src={`/images/energy/${attack.attackEnergy.type}.png`} className="w-6 h-6" />
                        <h2 className={`text-headingXl font-bold ${isPortrait ? 'outline-white' : ''}`}>
                            {attack.name}
                        </h2>
                        <h3 className="text-headingXl font-bold">{attack.attackEnergy.total}</h3>
                    </div>
                    <h4 className={`text-headingLg font-semibold ${isPortrait ? 'outline-black text-white' : ''}`}>
                        {attack.description}
                    </h4>
                </div>
            ) : null}
        </div>
    );
};

export default Poke;
