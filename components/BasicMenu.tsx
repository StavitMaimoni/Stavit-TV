import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useList from '../hooks/useList';
import useAuth from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';

export default function BasicMenu() {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const router = useRouter();
    const list = useList(user?.uid);
    const handleClose = () => {
        setAnchorEl(null);
    }
    const toastStyle = {
        background: 'white',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '15px',
        borderRadius: '9999px',
        maxWidth: '1000px',
    }
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        // Set the initial value of `isSmallScreen` on mount
        setIsSmallScreen(window.innerWidth < 768);

        // Add a resize listener to update `isSmallScreen` on window resize
        window.addEventListener("resize", handleResize);

        // Clean up the resize listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="md:!hidden">
            {isSmallScreen && <Toaster position="bottom-center" />}

            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="!capitalize !text-white"
            >
                Browse
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="menu"
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    router.push(`/`);
                    handleClose;
                }
                }>Home</MenuItem>
                <MenuItem onClick={() => {
                    router.push(`/`);
                    handleClose;
                }
                }>TV Shows</MenuItem>
                <MenuItem onClick={() => {
                    router.push(`/movies`);
                    handleClose;
                }
                }>Movies</MenuItem>
                <MenuItem onClick={() => {
                    router.push(`/new-popular`);
                    handleClose;
                }
                }>New & Popular</MenuItem>
                {list.length > 0 && <>
                    <MenuItem onClick={() => {
                        router.push(`/my-list`);
                        handleClose;
                    }
                    }>My List</MenuItem>
                </>}
                {list.length < 1 && <>
                    <MenuItem onClick={() => {
                        toast(
                            ` Your list is empty. Add your favorite movies and TV shows to create your list.`,
                            {
                                duration: 8000,
                                style: toastStyle,
                            }
                        );
                        handleClose;
                    }
                    }>My List</MenuItem>
                </>}

            </Menu>
        </div>
    )
}
