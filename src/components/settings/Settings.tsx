import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CardStyles } from './data/CardStyles.ts';
import { CardTypes } from './data/CardTypes.ts';
import { CardEvolution } from './data/CardEvolutions.ts';
import type { CardStyleType } from '../../types/CardStyleType';

type SettingsProps = {
    setCardStyle: React.Dispatch<React.SetStateAction<CardStyleType>>;
    setCardType: React.Dispatch<React.SetStateAction<string>>;
    setEvolution: React.Dispatch<React.SetStateAction<string>>;
};

const Settings: React.FC<SettingsProps> = ({ setCardStyle, setCardType, setEvolution }) => {
    return (
        <div className="flex flex-col items-center justify-center flex-wrap wrap-normal gap-8 w-[500px] py-10 bg-white rounded-lg border-1 border-gray-200 px-14">
            <div className="flex flex-col flex-wrap gap-8 ">
                <h2 className="text-2xl font-bold text-gray-700">Card Styling</h2>
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
                            {CardTypes.map(type => (
                                <MenuItem key={type}>
                                    <button
                                        onClick={() => setCardType(type)}
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-100 text-left w-full"
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                </MenuItem>
                            ))}
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
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Settings;
