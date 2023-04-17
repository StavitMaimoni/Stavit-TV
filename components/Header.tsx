import Image from 'next/image';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BasicMenu from './BasicMenu';
import stavitLogo from "../assets/images/stavit-logo.png";
import { useRecoilState } from 'recoil';
import { videoType, kidsClick, myListClick, newClick } from '../atoms/modalAtom.';
import useList from '../hooks/useList';
import useAuth from '../hooks/useAuth';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [type, setType] = useRecoilState(videoType);
    const [myList, setMyList] = useRecoilState(myListClick);
    const [newPopular, setNewPopular] = useRecoilState(newClick);
    const [statusKidsClick, setStatusKidsClick,] = useRecoilState(kidsClick);
    const { user,logout } = useAuth();
    const list = useList(user?.uid);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Set active link based on stored value in local storage
    useEffect(() => {
        const storedLink = localStorage.getItem('activeLink');
        if (storedLink) {
            setActiveLink(storedLink);
        }
    }, []);

    // Update stored value in local storage when active link changes
    useEffect(() => {
        localStorage.setItem('activeLink', activeLink);
    }, [activeLink]);

    return (
        <header className={`${isScrolled && 'bg-[#141414]'} ${!isScrolled && 'headerColor'}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <Link href="/">
                    <a onClick={() => {
                        setActiveLink('home');
                        setType('tv');
                        setStatusKidsClick(false);
                    }
                    }>      <Image
                            src={stavitLogo}
                            width={120}
                            height={50}
                            className="cursor-pointer object-contain"
                        /></a>
                </Link>

                <BasicMenu />

                <ul className="hidden space-x-4 md:flex">
                    <li className={`headerLink ${activeLink === 'home' && 'font-semibold text-white hover:text-white'}`}>
                        {!statusKidsClick && <>
                            <Link href="/">
                                <a onClick={() => {
                                    setActiveLink('home');
                                    setType('tv');
                                    setStatusKidsClick(false);
                                }
                                }>Home</a>
                            </Link>
                        </>}
                        {statusKidsClick && <>
                            <Link href="/kids">
                                <a onClick={() => {
                                    setActiveLink('home');
                                    setType('tv');
                                    setStatusKidsClick(true);
                                }
                                }>Home</a>
                            </Link>
                        </>}
                    </li>
                    <li className={`headerLink ${activeLink === 'series' && 'font-semibold text-white hover:text-white'}`}>
                        {!statusKidsClick && <>
                            <Link href="/">
                                <a onClick={() => {
                                    setActiveLink('series');
                                    setType('tv');
                                    setStatusKidsClick(false);
                                }
                                }>TV Shows</a>
                            </Link>
                        </>}
                        {statusKidsClick && <>
                            <Link href="/kids">
                                <a onClick={() => {
                                    setActiveLink('series');
                                    setType('tv');
                                    setStatusKidsClick(true);
                                }
                                }>TV Shows</a>
                            </Link>
                        </>}
                    </li>
                    <li className={`headerLink ${activeLink === 'movies' && 'font-semibold text-white hover:text-white'}`}>
                        {!statusKidsClick && <>
                            <Link href="/movies">
                                <a onClick={() => {
                                    setActiveLink('movies');
                                    setType('movie');
                                    setStatusKidsClick(false);
                                }
                                }>Movies</a>
                            </Link>
                        </>}
                        {statusKidsClick && <>
                            <Link href="/kids">
                                <a onClick={() => {
                                    setActiveLink('movies');
                                    setType('movie');
                                    setStatusKidsClick(true);
                                }
                                }>Movies</a>
                            </Link>
                        </>}
                    </li>
                    <li className={`headerLink ${activeLink === 'newPopular' && 'font-semibold text-white hover:text-white'}`}>
                        <Link href="/new-popular">
                            <a onClick={() => {
                                setActiveLink('newPopular');
                                setNewPopular(true);
                            }
                            }>New & Popular</a>
                        </Link>
                    </li>
                    <li className={`headerLink ${activeLink === 'myList' && 'font-semibold text-white hover:text-white'}`}>
                        {list.length > 0 && <>
                            <Link href="/my-list">
                                <a onClick={() => {
                                    setActiveLink('myList');
                                    setMyList(true);
                                }
                                }>My List</a>
                            </Link>
                        </>}
                        {list.length < 1 && <>
                            <Link href="/">
                                <a onClick={() => {
                                    setActiveLink('series');
                                    setMyList(true);
                                }
                                }>My List</a>
                            </Link>
                        </>}

                    </li>
                </ul>

            </div>
            <div className="flex items-center space-x-4 text-sm font-light">
                <Link href="/search">
                    <SearchIcon className="sm h-6 w-6 sm:inline cursor-pointer" onClick={() => {
                        setActiveLink('search');
                    }} />
                </Link>
                <p className="lg:inline cursor-pointer">
                    {statusKidsClick && <>
                        <Link href="/">
                            <a className='exitKids flex items-center rounded px-1.5 py-0.5 text-sm font-semibold transition hover:opacity-75 md:py-1 md:px-2' onClick={() => {
                                setActiveLink('home');
                                setStatusKidsClick(false);
                            }
                            }>Exit Kids</a>
                        </Link>
                    </>}
                    {!statusKidsClick && <>
                        <Link href="/kids">
                            <a onClick={() => {
                                setActiveLink('kids');
                                setStatusKidsClick(true);
                            }
                            }>Kids</a>
                        </Link>
                    </>}
                </p>
                <BellIcon className="h-6 w-6 hidden sm:block" />
                <img
                    src="https://rb.gy/g1pwyx"
                    alt=""
                    className="cursor-pointer rounded fa fa-caret-down"
                    onMouseOver={() => setShowDropdown(true)}
                />
                {showDropdown && <>
                    <div className="dropdownContainer  bg-black text-white-700 divide-y divide-gray-100/50 shadow w-50"
                        onMouseLeave={() => setShowDropdown(false)}>
                        <div className="px-4 py-3 text-sm text-white-700 ">
                            <div className="font-medium truncate">{user?.email}</div>
                        </div>
                        <ul className="py-2 text-sm text-white-700" aria-labelledby="dropdownInformationButton">
                            <li>
                                <a href="#" className="block bg-black px-4 py-2 hover:underline">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className="block bg-black px-4 py-2 hover:underline">Settings</a>
                            </li>
                            <li>
                                <a href="#" className="block bg-black px-4 py-2 hover:underline">Earnings</a>
                            </li>
                        </ul>

                        <div className="py-2">
                            <a className="block bg-black px-4 py-2 text-sm text-white-700 hover:underline cursor-pointer"
                                onClick={logout}
                            >Sign out of Stavit TV</a>
                        </div>
                    </div>
                </>}
            </div>
        </header >
    )
}

export default Header
