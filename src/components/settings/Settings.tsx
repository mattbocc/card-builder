import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CardStyles } from './data/CardStyles.ts';
import { EnergyTypes } from './data/EnergyTypes.ts';
import { CardEvolution } from './data/CardEvolutions.ts';
import type { CardStyleType } from '../../types/CardStyleType';
import type { EnergyType } from '../../types/EnergyType.ts';
import { ScrollPanel } from 'primereact/scrollpanel';
import type { AbilityType } from '../../types/AbilityType.ts';
import type { AttackType } from '../../types/AttackType.ts';
import type { CropperType } from '../../types/CropperType';
import type { CroppedAreaPixelsType } from '../../types/CroppedAreaPixelsType.ts';
import Cropper from 'react-easy-crop';
import axios from 'axios';

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
    setIsLandscape: React.Dispatch<React.SetStateAction<boolean>>;
    showHP: boolean;
    weaknessEnergy: EnergyType;
    resistanceEnergy: EnergyType;
    retreatEnergy: EnergyType;
    ability: AbilityType;
    attack: AttackType;
    crop: CropperType;
    zoom: number;
    aiImage: string;
    isLandscape: boolean;
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
    setIsLandscape,
    showHP,
    weaknessEnergy,
    resistanceEnergy,
    retreatEnergy,
    ability,
    attack,
    crop,
    zoom,
    aiImage,
    isLandscape
}) => {
    const handleCropComplete = React.useCallback((_area: any, pixels: any) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const [file, setFile] = useState<File | null>(null);
    const [inputFileNames, setInputFileNames] = useState<string[]>(['']);
    const [outputFileNames, setOutputFileNames] = useState<string[]>(['']);
    const [outputFile, setOutputFile] = useState<string>('');
    const [imageToGenerate, setImageToGenerate] = useState<string>('');

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

    async function generateImage() {}

    async function selectImage() {
        try {
            const res = await axios.get(`/api/poke/image/get/static/${outputFile}`, {
                responseType: 'blob'
            });
            const url = URL.createObjectURL(res.data);
            setAiImage(url);
            setCroppedAreaPixels(null);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
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
        getFileNames();
    }, []);

    useEffect(() => {
        async function setOrientation() {
            if (!aiImage) return;
            const img = new Image();
            img.onload = () => {
                const land = img.naturalWidth > img.naturalHeight;
                if (land !== isLandscape) {
                    setIsLandscape(land);
                }
            };
            img.src = aiImage;
        }
        setOrientation();
    }, [aiImage]);

    return (
        <div className="flex flex-col items-center justify-center flex-wrap wrap-normal gap-8 w-[500px] py-10 bg-white rounded-lg border-1 border-gray-200 px-14">
            <div className="flex flex-col flex-wrap gap-8 ">
                <h2 className="text-2xl font-bold text-black">General settings</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-center flex-wrap gap-8 ">
                        <Menu as="div" className="relative inline-block w-[175px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                Card Style
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                    {CardStyles.map(style => (
                                        <MenuItem key={style.name}>
                                            <button
                                                onClick={() => setCardStyle(style)}
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
                        <Menu as="div" className="relative inline-block w-[175px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                Type
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                    {EnergyTypes.map(type => (
                                        <MenuItem key={type}>
                                            <button
                                                onClick={() => setCardType(type)}
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </ScrollPanel>
                            </MenuItems>
                        </Menu>
                        <Menu as="div" className="relative inline-block w-[175px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                Evolution
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <ScrollPanel style={{ width: '100%', height: '150px' }}>
                                    {CardEvolution.map(evolution => (
                                        <MenuItem key={evolution}>
                                            <button
                                                onClick={() => setEvolution(evolution.replaceAll(' ', ''))}
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

                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd text-gray-700">Title</h3>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200"
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
                            <h3 className="text-headingMd text-gray-700">HP</h3>

                            <input
                                type="checkbox"
                                checked={showHP}
                                onChange={() => {
                                    setShowHP(!showHP);
                                }}
                            />
                        </div>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200"
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
                <h2 className="text-2xl font-bold text-black">Energy Styles</h2>

                <div className="flex flex-col gap-2">
                    <h3 className="text-headingMd text-gray-700">Weakness</h3>
                    <div className="flex flex-row justify-center flex-wrap gap-8 ">
                        <Menu as="div" className="relative inline-block w-[125px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                Type
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </ScrollPanel>
                            </MenuItems>
                        </Menu>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200"
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
                    <h3 className="text-headingMd text-gray-700">Resistance</h3>
                    <div className="flex flex-row justify-center flex-wrap gap-8 ">
                        <Menu as="div" className="relative inline-block w-[125px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                Type
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </ScrollPanel>
                            </MenuItems>
                        </Menu>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200"
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
                    <h3 className="text-headingMd text-gray-700">Retreat</h3>
                    <div className="flex flex-row justify-center flex-wrap gap-8 ">
                        <Menu as="div" className="relative inline-block w-[125px]">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                Type
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </ScrollPanel>
                            </MenuItems>
                        </Menu>
                        <input
                            className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200"
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
                        <h3 className="text-headingMd text-gray-700">Name</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8 ">
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200 w-full"
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
                        <h3 className="text-headingMd text-gray-700">Description</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8">
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200 w-full"
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
                <div className="flex flex-col flex-wrap gap-8">
                    <h2 className="text-2xl font-bold text-black">Attack</h2>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd text-gray-700">Retreat</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8 ">
                            <Menu as="div" className="relative inline-block w-[125px]">
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                                    Type
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
                                                            }
                                                        })
                                                    }
                                                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </ScrollPanel>
                                </MenuItems>
                            </Menu>
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200"
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
                                        }
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd text-gray-700">Name</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8 ">
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200 w-full"
                                type="text"
                                name="search"
                                placeholder="1-24 characters"
                                onChange={e => {
                                    setAttack({
                                        name: e.target.value,
                                        description: attack.description,
                                        attackEnergy: attack.attackEnergy
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-headingMd text-gray-700">Description</h3>
                        <div className="flex flex-row justify-center flex-wrap gap-8 ">
                            <input
                                className="placeholder:text-gray-500 px-3 py-1 rounded-lg border-1 border-gray-200 w-full"
                                type="text"
                                name="search"
                                placeholder="1-200 characters"
                                onChange={e => {
                                    setAttack({
                                        name: attack.name,
                                        description: e.target.value,
                                        attackEnergy: attack.attackEnergy
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-4">
                <h2 className="text-2xl font-bold text-black">Image</h2>
                <div className={`relative w-[420px] h-[280px] rounded-md overflow-hidden border border-gray-200 `}>
                    <Cropper
                        image={aiImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={isLandscape ? 4 / 3 : 6 / 8}
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
            <div className="flex flex-col w-full gap-6 items-start">
                <div className="flex gap-4 w-full">
                    <div className="flex">
                        <label
                            className="flex items-center text-center justify-center gap-2 text-sm font-semibold text-gray-900 border-1 border-gray-200 w-[175px] px-3 py-[7px] rounded-md hover:cursor-pointer overflow-hidden "
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
                        className="flex flex-col px-3 py-1 rounded-md justify-center items-center font-semibold text-headingMd text-white bg-blue-700 hover:cursor-pointer w-[160px]"
                        onClick={() => submitImage()}
                    >
                        Upload Image
                    </button>
                </div>

                <div className="flex gap-4">
                    <Menu as="div" className="relative inline-block w-[175px]">
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                            {imageToGenerate ? imageToGenerate : 'Select an image'}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
                        className="flex flex-col px-3 py-1 rounded-md justify-center items-center font-semibold text-headingMd text-white bg-blue-700 hover:cursor-pointer w-[160px]"
                        onClick={() => generateImage()}
                    >
                        Generate AI Image
                    </button>
                </div>
                <div className="flex gap-4">
                    <Menu as="div" className="relative inline-block w-[175px]">
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-200 hover:bg-gray-50">
                            {outputFile ? outputFile : 'Select an image'}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
                        className="flex flex-col px-3 py-1 rounded-md justify-center items-center font-semibold text-headingMd text-white bg-blue-700 hover:cursor-pointer w-[160px]"
                        onClick={() => selectImage()}
                    >
                        Choose Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
