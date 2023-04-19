import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const router = useRouter();

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div className="md:!hidden">
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
                <MenuItem onClick={() => {
                    router.push(`/my-list`);
                    handleClose;
                }
                }>My List</MenuItem>
            </Menu>
        </div>
    )
}
