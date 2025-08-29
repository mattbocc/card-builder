import React, { useState } from 'react';
import type { CardStyleType } from '../../types/CardStyleType';
import type { EnergyType } from '../../types/EnergyType';

type CardProps = {
    cardStyle: CardStyleType;
    cardType: string;
    evolution: string;
    weaknessEnergy: EnergyType;
    resistanceEnergy: EnergyType;
    retreatEnergy: EnergyType;
};

const Poke: React.FC<CardProps> = ({
    cardStyle,
    cardType,
    evolution,
    weaknessEnergy,
    resistanceEnergy,
    retreatEnergy
}) => {
    return (
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
                <img src="/images/picture/us.png" alt="card-picture" />
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
                        {Array.from({ length: retreatEnergy.total }).map((_, i) => (
                            <img
                                key={i}
                                src={`/images/energy/${retreatEnergy.type}.png`}
                                alt="retreat-energy"
                                className="w-5 h-5"
                            />
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Poke;
