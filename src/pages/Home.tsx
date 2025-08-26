import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="flex flex-row justify-center items-center mx-auto gap-10 py-44">
                <div className="flex flex-col w-[500px] relative">
                    <img src="/images/sun_moon/water_basic.png" alt="card-holder" className="w-[500px]" />
                    <div className="flex flex-col w-[500px] absolute top-10 z-[-1]">
                        <img src="/images/picture/kitty_land.png" className="" alt="card-picture" />
                    </div>
                    <div className="flex flex-row absolute bottom-19.25 left-20">
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-4.5 h-4.5" />
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-row absolute bottom-19.25 left-55">
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-4.5 h-4.5" />
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-row absolute bottom-19.25 right-24">
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-4.5 h-4.5" />
                        <img src="/images/energy/colorless.png" alt="retreat-energy" className="w-4.5 h-4.5" />
                    </div>
                </div>
                <div className="flex flex-col w-[500px]">
                    <Menu as="div" className="relative inline-block w-[225px]">
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                            Options
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            <div className="py-1">
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        Account settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        Support
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        License
                                    </a>
                                </MenuItem>
                                <form action="#" method="POST">
                                    <MenuItem>
                                        <button
                                            type="submit"
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        >
                                            Sign out
                                        </button>
                                    </MenuItem>
                                </form>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Home;
