import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { EnergyTypes } from './data/EnergyTypes.ts';
import { SpecialCardTypes } from './data/SpecialCardTypes.ts';
import type { CardStyleType } from '../../types/CardStyleType';
import type { EnergyType } from '../../types/EnergyType.ts';
import { ScrollPanel } from 'primereact/scrollpanel';
import type { AbilityType } from '../../types/AbilityType.ts';
import type { AttackType } from '../../types/AttackType.ts';
import type { CropperType } from '../../types/CropperType';
import type { CroppedAreaPixelsType } from '../../types/CroppedAreaPixelsType.ts';
import Cropper from 'react-easy-crop';
import ExportCard from '../cards/ExportCard.tsx';
import SubmitCardSettings from '../cards/SubmitCardSettings.tsx';

type SettingsProps = {
    setCardStyle: React.Dispatch<React.SetStateAction<CardStyleType>>;
    setCardType: React.Dispatch<React.SetStateAction<string>>;
    setEvolution: React.Dispatch<React.SetStateAction<string>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setHealth: React.Dispatch<React.SetStateAction<string>>;
    setShowHP: React.Dispatch<React.SetStateAction<boolean>>;
    setWeaknessEnergy: React.Dispatch<React.SetStateAction<EnergyType>>;
    setResistanceEnergy: React.Dispatch<React.SetStateAction<EnergyType>>;
    setRetreatEnergy: React.Dispatch<React.SetStateAction<EnergyType>>;
    setAbility: React.Dispatch<React.SetStateAction<AbilityType>>;
    setAttack: React.Dispatch<React.SetStateAction<AttackType>>;
    setCrop: React.Dispatch<React.SetStateAction<CropperType>>;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    setCroppedAreaPixels: React.Dispatch<React.SetStateAction<CroppedAreaPixelsType | null>>;
    setAiImage: React.Dispatch<React.SetStateAction<string>>;
    setIsPortrait: React.Dispatch<React.SetStateAction<boolean>>;
    cardStyle: CardStyleType;
    cardType: string;
    evolution: string;
    showHP: boolean;
    title: string;
    health: string;
    weaknessEnergy: EnergyType;
    resistanceEnergy: EnergyType;
    retreatEnergy: EnergyType;
    ability: AbilityType;
    attack: AttackType;
    crop: CropperType;
    zoom: number;
    aiImage: string;
    isPortrait: boolean;
    exportRef: React.RefObject<HTMLDivElement | null>;
};

const Settings: React.FC<SettingsProps> = ({
    setCardStyle,
    setCardType,
    setEvolution,
    setTitle,
    setHealth,
    setShowHP,
    setWeaknessEnergy,
    setResistanceEnergy,
    setRetreatEnergy,
    setAbility,
    setCrop,
    setZoom,
    setCroppedAreaPixels,
    setAiImage,
    setIsPortrait,
    cardStyle,
    cardType,
    evolution,
    title,
    showHP,
    health,
    weaknessEnergy,
    resistanceEnergy,
    retreatEnergy,
    ability,
    crop,
    zoom,
    aiImage,
    isPortrait,
    exportRef
}) => {
    const handleCropComplete = React.useCallback((_area: any, pixels: any) => {
        setCroppedAreaPixels(pixels);
    }, []);
    // @ts-ignore
    const [outputFileNames, setOutputFileNames] = useState<string[]>([
        'base.png',
        'halloween.jpeg',
        'christmas_one.jpeg',
        'christmas_two.jpeg'
    ]);
    const [outputFile, setOutputFile] = useState<string>('');

    // select portrait
    const [specialEvent, setSpecialEvent] = useState<string>('christmas');

    async function selectImage() {
        console.log(outputFile);
        setAiImage(`/images/placeholders/${outputFile}`);
        setCroppedAreaPixels(null);
    }

    useEffect(() => {
        async function setOrientation() {
            if (!aiImage) return;
            const img = new Image();
            img.onload = () => {
                const port = img.naturalWidth < img.naturalHeight;
                if (port !== isPortrait) {
                    setIsPortrait(port);
                }
            };
            img.src = aiImage;
        }
        setOrientation();
    }, [aiImage]);

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-[500px] smd:w-[350px] py-10 bg-white rounded-lg border-1 border-gray-200 px-14 smd:px-6">
            <div className="flex flex-col flex-wrap gap-8 w-full">
                <h2 className="text-2xl font-bold text-black">General settings</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col flex-wrap gap-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-headingMd font-bold text-gray-700">Special Card Type</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {SpecialCardTypes.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setCardType(type);
                                                setEvolution('stage 2');
                                                setCardStyle({
                                                    name: 'Sun and Moon Full',
                                                    style: 'full_art',
                                                    version: 'sun_moon'
                                                });
                                                setSpecialEvent(type);
                                            }}
                                            className={`flex items-center justify-center gap-2 font-semibold border-1 border-gray-200 shadow
										${
                                            cardType === type
                                                ? ' bg-gray-200'
                                                : 'hover:bg-gray-200 hover:-translate-y-1.5'
                                        } rounded-3xl px-3 py-2 hover:cursor-pointer
										transition delay-150 duration-300 ease-in-out`}
                                        >
                                            <img src={`/images/card_types/${type}.png`} className="w-5 h-5" />
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd font-bold text-gray-700">Title</h3>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin"
                            placeholder="0-14 characters"
                            type="text"
                            name="search"
                            onChange={e => {
                                setTitle(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <h3 className="text-headingMd font-bold text-gray-700">HP</h3>

                            <input
                                type="checkbox"
                                checked={showHP}
                                onChange={() => {
                                    setShowHP(!showHP);
                                }}
                            />
                        </div>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin"
                            placeholder="0-5 characters"
                            type="text"
                            name="search"
                            onChange={e => {
                                setHealth(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-wrap gap-8">
                <h2 className="text-2xl font-bold text-black">Energy Types</h2>

                <div className="flex flex-col gap-2">
                    <h3 className="text-headingMd font-bold text-gray-700">Weakness</h3>
                    <div className="flex flex-row justify-center flex-wrap gap-8 smd:flex-nowrap smd:gap-2">
                        <Menu as="div" className="relative inline-block w-[125px] smd:w-[75px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                {weaknessEnergy?.type ? (
                                    <img src={`/images/energy/${weaknessEnergy?.type}.png`} className="w-5 h-5" />
                                ) : (
                                    'Type'
                                )}
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-2xl overflow-hidden bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                    {EnergyTypes.map(type => (
                                        <MenuItem key={type}>
                                            <button
                                                onClick={() =>
                                                    setWeaknessEnergy({
                                                        type: type,
                                                        total: weaknessEnergy.total
                                                    })
                                                }
                                                className="flex gap-2 items-center font-semibold text-headingMd px-4 py-2 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                            >
                                                <img src={`/images/energy/${type}.png`} className="w-5 h-5" />
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </ScrollPanel>
                            </MenuItems>
                        </Menu>
                        <input
                            className="placeholder:text-gray-500 px-4 py-1 rounded-2xl border-1 border-gray-200 font-thin smd:max-w-[200px]"
                            placeholder="Number 1-4"
                            type="text"
                            name="search"
                            onChange={e => {
                                setWeaknessEnergy({
                                    type: weaknessEnergy.type,
                                    total: Number(e.target.value)
                                });
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-headingMd font-bold text-gray-700">Resistance</h3>
                    <div className="flex flex-row justify-center flex-wrap gap-8 smd:flex-nowrap smd:gap-2 ">
                        <Menu as="div" className="relative inline-block w-[125px] smd:w-[75px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                {resistanceEnergy?.type ? (
                                    <img src={`/images/energy/${resistanceEnergy?.type}.png`} className="w-5 h-5" />
                                ) : (
                                    'Type'
                                )}
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-2xl overflow-hidden bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                    {EnergyTypes.map(type => (
                                        <MenuItem key={type}>
                                            <button
                                                onClick={() =>
                                                    setResistanceEnergy({
                                                        type: type,
                                                        total: resistanceEnergy.total
                                                    })
                                                }
                                                className="flex gap-2 items-center font-semibold text-headingMd px-4 py-2 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                            >
                                                <img src={`/images/energy/${type}.png`} className="w-5 h-5" />
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </ScrollPanel>
                            </MenuItems>
                        </Menu>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin smd:max-w-[200px]"
                            placeholder="Number 1-100"
                            type="text"
                            name="search"
                            onChange={e => {
                                setResistanceEnergy({
                                    type: resistanceEnergy.type,
                                    total: Number(e.target.value)
                                });
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-headingMd font-bold text-gray-700">Retreat</h3>
                    <div className="flex flex-row justify-center flex-wrap gap-8 smd:flex-nowrap smd:gap-2 ">
                        <Menu as="div" className="relative inline-block w-[125px] smd:w-[75px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                {retreatEnergy?.type ? (
                                    <img src={`/images/energy/${retreatEnergy?.type}.png`} className="w-5 h-5" />
                                ) : (
                                    'Type'
                                )}
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-2xl overflow-hidden bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                    {EnergyTypes.map(type => (
                                        <MenuItem key={type}>
                                            <button
                                                onClick={() =>
                                                    setRetreatEnergy({
                                                        type: type,
                                                        total: retreatEnergy.total
                                                    })
                                                }
                                                className="flex gap-2 items-center font-semibold text-headingMd px-4 py-2 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                            >
                                                <img src={`/images/energy/${type}.png`} className="w-5 h-5" />
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </ScrollPanel>
                            </MenuItems>
                        </Menu>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin smd:max-w-[200px]"
                            placeholder="Number 1-4"
                            type="text"
                            name="search"
                            onChange={e => {
                                setRetreatEnergy({
                                    type: retreatEnergy.type,
                                    total: Number(e.target.value)
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-wrap gap-8 ">
                    <h2 className="text-2xl font-bold text-black">Ability</h2>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd font-bold text-gray-700">Name</h3>

                        <div className="flex flex-row justify-center flex-wrap gap-8 smd:flex-nowrap smd:gap-2 ">
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin w-full"
                                type="text"
                                name="search"
                                placeholder="1-24 characters"
                                onChange={e => {
                                    setAbility({
                                        name: e.target.value,
                                        description: ability.description
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd font-bold text-gray-700">Description</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8 smd:flex-nowrap smd:gap-2">
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin w-full"
                                type="text"
                                name="search"
                                placeholder="1-200 characters"
                                onChange={e => {
                                    setAbility({
                                        name: ability.name,
                                        description: e.target.value
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-col flex-wrap gap-8">
                    <div className="flex gap-2 w-full items-baseline">
                        <h2 className="text-2xl font-bold text-black">Attack</h2>
                        <input
                            type="checkbox"
                            checked={attack.show}
                            onChange={() =>
                                setAttack({
                                    name: attack.name,
                                    description: attack.description,
                                    attackEnergy: {
                                        type: attack.attackEnergy.type,
                                        total: attack.attackEnergy.total
                                    },
                                    show: !attack.show
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd font-bold text-gray-700">Retreat</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8 smd:flex-nowrap smd:gap-2 ">
                            <Menu as="div" className="relative inline-block w-[125px] smd:w-[100px]">
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                    {attack?.attackEnergy?.type ? (
                                        <img
                                            src={`/images/energy/${attack?.attackEnergy?.type}.png`}
                                            className="w-5 h-5"
                                        />
                                    ) : (
                                        'Type'
                                    )}
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-2xl overflow-hidden bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                        {EnergyTypes.map(type => (
                                            <MenuItem key={type}>
                                                <button
                                                    onClick={() =>
                                                        setAttack({
                                                            name: attack.name,
                                                            description: attack.description,
                                                            attackEnergy: {
                                                                type: type,
                                                                total: attack.attackEnergy.total
                                                            },
                                                            show: attack.show
                                                        })
                                                    }
                                                    className="flex gap-2 items-center font-semibold text-headingMd px-4 py-2 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                                >
                                                    <img src={`/images/energy/${type}.png`} className="w-5 h-5" />
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </ScrollPanel>
                                </MenuItems>
                            </Menu>
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin"
                                placeholder="Number 1-9999"
                                type="text"
                                name="search"
                                onChange={e => {
                                    setAttack({
                                        name: attack.name,
                                        description: attack.description,
                                        attackEnergy: {
                                            type: attack.attackEnergy.type,
                                            total: Number(e.target.value)
                                        },
                                        show: attack.show
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd font-bold text-gray-700">Name</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8 smd:flex-nowrap smd:gap-2 ">
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin w-full"
                                type="text"
                                name="search"
                                placeholder="1-24 characters"
                                onChange={e => {
                                    setAttack({
                                        name: e.target.value,
                                        description: attack.description,
                                        attackEnergy: attack.attackEnergy,
                                        show: attack.show
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd font-bold text-gray-700">Description</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8 smd:flex-nowrap smd:gap-2 ">
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin w-full"
                                type="text"
                                name="search"
                                placeholder="1-200 characters"
                                onChange={e => {
                                    setAttack({
                                        name: attack.name,
                                        description: e.target.value,
                                        attackEnergy: attack.attackEnergy,
                                        show: attack.show
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl font-bold text-black">Image</h2>
                <div
                    className={`relative w-[420px] h-[280px] smd:w-[300px] smd:h-[200px] rounded-md overflow-hidden border border-gray-200 `}
                >
                    <Cropper
                        image={aiImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={isPortrait ? 8 / 10 : 4 / 3}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleCropComplete}
                    />
                </div>
                <div className="flex flex-row justify-center items-center gap-2 w-full">
                    <label className="text-sm text-gray-600">Zoom</label>
                    <input
                        type="range"
                        min={1}
                        max={2.5}
                        step={0.01}
                        value={zoom}
                        onChange={e => setZoom(Number(e.target.value))}
                        className="w-[325px] smd:w-[250px]"
                    />
                </div>
            </div>

            <div>
                <div className="flex flex-col w-full gap-6 items-start">
                    <div className="flex flex-row gap-4 items-baseline justify-between w-full">
                        <Menu as="div" className="relative inline-block w-[160px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 smd:text-headingXs rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                {outputFile ? outputFile : 'Select an image'}
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 smd:size-4 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl overflow-hidden bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                    {outputFileNames.map(name => (
                                        <MenuItem key={name}>
                                            <button
                                                onClick={() => setOutputFile(name)}
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                                key={name}
                                            >
                                                {name}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </ScrollPanel>
                            </MenuItems>
                        </Menu>

                        <button
                            className="flex px-4 py-2 rounded-2xl justify-center items-center font-semibold text-headingMd smd:text-headingXs text-white bg-blue-700 hover:cursor-pointer hover:bg-blue-500 transition delay-50 duration-100 ease-in-out"
                            onClick={() => selectImage()}
                        >
                            Choose Image
                        </button>
                    </div>
                    <div className="flex flex-row gap-4 w-full justify-between items-center">
                        <ExportCard exportRef={exportRef} />
                        <SubmitCardSettings
                            cardStyle={cardStyle}
                            evolution={evolution}
                            cardType={cardType}
                            specialEvent={specialEvent}
                            title={title}
                            showHP={showHP}
                            health={health}
                            weaknessEnergy={weaknessEnergy}
                            resistanceEnergy={resistanceEnergy}
                            retreatEnergy={retreatEnergy}
                            ability={ability}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
