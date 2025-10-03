import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CardStyles } from './data/CardStyles.ts';
import { EnergyTypes } from './data/EnergyTypes.ts';
import { CardTypes } from './data/CardTypes.ts';
import { SpecialCardTypes } from './data/SpecialCardTypes.ts';
import { CardEvolution } from './data/CardEvolutions.ts';
import type { CardStyleType } from '../../types/CardStyleType';
import type { EnergyType } from '../../types/EnergyType.ts';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ProgressSpinner } from 'primereact/progressspinner';
import type { AbilityType } from '../../types/AbilityType.ts';
import type { AttackType } from '../../types/AttackType.ts';
import type { CropperType } from '../../types/CropperType';
import type { CroppedAreaPixelsType } from '../../types/CroppedAreaPixelsType.ts';
import Cropper from 'react-easy-crop';
import axios from 'axios';
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
    setAttack,
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
    attack,
    crop,
    zoom,
    aiImage,
    isPortrait,
    exportRef
}) => {
    const handleCropComplete = React.useCallback((_area: any, pixels: any) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const [file, setFile] = useState<File | null>(null);
    const [inputFileNames, setInputFileNames] = useState<string[]>(['']);
    const [outputFileNames, setOutputFileNames] = useState<string[]>(['']);
    const [outputFile, setOutputFile] = useState<string>('');
    const [imageToGenerate, setImageToGenerate] = useState<string>('');
    const [ongoingGeneration, setOngoingGeneration] = useState<boolean>(false);

    // select portrait
    const [specialEvent, setSpecialEvent] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');

    async function submitImage() {
        if (!file) {
            alert('Please insert an image before submitting');
            return;
        }
        const formData = new FormData();
        formData.append('file', file, file.name);
        try {
            const res = await axios.post('/api/poke/image/upload', formData, {
                headers: { 'Content-type': 'multipart/form-data' }
            });
            console.log(res.data.message);
            alert(res.data.message);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function generateImage() {
        setOngoingGeneration(true);
        try {
            const res = await axios.post('/api/poke/image/create', {
                image_name: imageToGenerate,
                type: cardType,
                stage: evolution,
                portrait: isPortrait,
                special_event: specialEvent ? specialEvent : null
            });
            console.log(res.data);
            alert('Image Generation Complete!');
        } catch (error) {
            console.log(error);
            alert(error);
            setOngoingGeneration(false);
        }
        setOngoingGeneration(false);
        getFileNames();
    }

    async function selectImage() {
        try {
            const res = await axios.get(`/api/poke/image/get/static/${outputFile}?t=${Date.now()}`, {
                responseType: 'blob'
            });
            console.log(res.data);
            const url = URL.createObjectURL(res.data);
            console.log(url);
            setAiImage(url);
            setCroppedAreaPixels(null);
        } catch (error) {
            console.log(error);
        }
    }

    async function getFileNames() {
        try {
            const res_input = await axios.get('/api/poke/image/get/inputs');
            const res_output = await axios.get('/api/poke/image/get/outputs');
            setInputFileNames(res_input.data);
            setOutputFileNames(res_output.data);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(() => {
        getFileNames();
    }, []);

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
        <div className="flex flex-col items-center justify-center flex-wrap wrap-normal gap-8 w-[500px] py-10 bg-white rounded-lg border-1 border-gray-200 px-14">
            <div className="flex flex-col flex-wrap gap-8 w-full">
                <h2 className="text-2xl font-bold text-black">General settings</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col flex-wrap gap-6">
                        <div className="flex gap-2 justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-headingMd font-bold text-gray-700">Card Style</h3>

                                <Menu as="div" className="relative inline-block w-[175px]">
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                        {cardStyle?.name ? cardStyle?.name : 'Card Style'}
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl overflow-hidden bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                            {CardStyles.map(style => (
                                                <MenuItem key={style.name}>
                                                    <button
                                                        onClick={() => {
                                                            if (SpecialCardTypes.includes(cardType)) {
                                                                setCardType('colorless');
                                                                setSpecialEvent('');
                                                            }
                                                            setCardStyle(style);
                                                        }}
                                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                                        key={style.name}
                                                    >
                                                        {style.name}
                                                    </button>
                                                </MenuItem>
                                            ))}
                                        </ScrollPanel>
                                    </MenuItems>
                                </Menu>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-headingMd font-bold text-gray-700">Card Stage</h3>
                                <Menu as="div" className="relative inline-block w-[175px]">
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                        {evolution ? evolution[0].toUpperCase() + evolution.slice(1) : 'Evolution'}
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl overflow-hidden bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                            {CardEvolution.map(evolution => (
                                                <MenuItem key={evolution}>
                                                    <button
                                                        onClick={() => {
                                                            if (SpecialCardTypes.includes(cardType)) {
                                                                setCardType('colorless');
                                                                setSpecialEvent('');
                                                            }
                                                            setEvolution(evolution);
                                                        }}
                                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                                    >
                                                        {evolution.charAt(0).toUpperCase() + evolution.slice(1)}
                                                    </button>
                                                </MenuItem>
                                            ))}
                                        </ScrollPanel>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-headingMd font-bold text-gray-700">Card Type</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {CardTypes.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setCardType(type)}
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
                                            <img src={`/images/energy/${type}.png`} className="w-5 h-5" />
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

            <div className="flex flex-col flex-wrap gap-8 ">
                <h2 className="text-2xl font-bold text-black">Energy Types</h2>

                <div className="flex flex-col gap-2">
                    <h3 className="text-headingMd font-bold text-gray-700">Weakness</h3>
                    <div className="flex flex-row justify-center flex-wrap gap-8 ">
                        <Menu as="div" className="relative inline-block w-[125px]">
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
                            className="placeholder:text-gray-500 px-4 py-1 rounded-2xl border-1 border-gray-200 font-thin"
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
                    <div className="flex flex-row justify-center flex-wrap gap-8 ">
                        <Menu as="div" className="relative inline-block w-[125px]">
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
                            className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin"
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
                    <div className="flex flex-row justify-center flex-wrap gap-8 ">
                        <Menu as="div" className="relative inline-block w-[125px]">
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
                            className="placeholder:text-gray-500 px-3 py-1 rounded-2xl border-1 border-gray-200 font-thin"
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

                        <div className="flex flex-row justify-center flex-wrap gap-8 ">
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
                        <div className="flex flex-row justify-center flex-wrap gap-8">
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
                        <div className="flex flex-row justify-center flex-wrap gap-8 ">
                            <Menu as="div" className="relative inline-block w-[125px]">
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
                        <div className="flex flex-row justify-center flex-wrap gap-8 ">
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
                        <div className="flex flex-row justify-center flex-wrap gap-8 ">
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
            <div className="flex flex-col justify-center gap-4">
                <h2 className="text-2xl font-bold text-black">Image</h2>
                <div className={`relative w-[420px] h-[280px] rounded-md overflow-hidden border border-gray-200 `}>
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
                <div>
                    <label className="text-sm text-gray-600">Zoom</label>
                    <input
                        type="range"
                        min={1}
                        max={2.5}
                        step={0.01}
                        value={zoom}
                        onChange={e => setZoom(Number(e.target.value))}
                        className="w-[420px]"
                    />
                </div>
            </div>
            {!ongoingGeneration ? (
                <div>
                    <div className="flex flex-col w-full gap-6 items-start">
                        <div className="flex items-baseline justify-between w-full">
                            <Menu as="div" className="relative inline-block w-[175px]">
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                    {outputFile ? outputFile : 'Select an image'}
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
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
                                className="hover:cursor-pointer px-2 py-2 transition delay-50 duration-100 ease-in-out hover:bg-gray-100 rounded-full"
                                onClick={() => getFileNames()}
                            >
                                <img src="/images/general_icons/reload.svg" className="w-4" />
                            </button>
                            <button
                                className="flex px-1 py-2 rounded-2xl justify-center items-center font-semibold text-headingMd text-white bg-blue-700 hover:cursor-pointer w-[140px] hover:bg-blue-500 transition delay-50 duration-100 ease-in-out"
                                onClick={() => selectImage()}
                            >
                                Choose Image
                            </button>
                        </div>
                        <div className="flex items-baseline justify-between w-full">
                            <div className="flex">
                                <label
                                    className="w-[175px] inline-flex justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50"
                                    htmlFor="img"
                                >
                                    {file ? file.name : 'Select a jpeg'}
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-800" />
                                </label>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg"
                                    onChange={e => {
                                        const f = e.target.files?.[0] ?? null;
                                        setFile(f);
                                    }}
                                    id="img"
                                    name="file"
                                />
                            </div>
                            <button
                                className="flex px-1 py-2 rounded-2xl justify-center items-center font-semibold text-headingMd text-white bg-blue-700 hover:cursor-pointer w-[140px] hover:bg-blue-500 transition delay-50 duration-100 ease-in-out"
                                onClick={() => submitImage()}
                            >
                                Upload Image
                            </button>
                        </div>

                        <div className="flex items-baseline justify-between w-full">
                            <Menu as="div" className="relative inline-block w-[175px]">
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                    {imageToGenerate ? imageToGenerate : 'Select an image'}
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl overflow-hidden bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                        {inputFileNames.map(name => (
                                            <MenuItem key={name}>
                                                <button
                                                    onClick={() => setImageToGenerate(name)}
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
                                className="hover:cursor-pointer px-2 py-2 transition delay-50 duration-100 ease-in-out hover:bg-gray-100 rounded-full"
                                onClick={() => getFileNames()}
                            >
                                <img src="/images/general_icons/reload.svg" className="w-4" />
                            </button>
                            <button
                                className="flex px-1 py-2 rounded-2xl justify-center items-center font-semibold text-headingMd text-white bg-blue-700 hover:cursor-pointer w-[140px] hover:bg-blue-500 transition delay-50 duration-100 ease-in-out"
                                onClick={() => generateImage()}
                            >
                                Generate Image
                            </button>
                        </div>
                        <div className="flex flex-row w-full justify-between items-center">
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
            ) : (
                <div>
                    <ProgressSpinner
                        style={{ width: '200px', height: '200px' }}
                        strokeWidth="5"
                        animationDuration="1.5s"
                    />
                </div>
            )}
        </div>
    );
};

export default Settings;
