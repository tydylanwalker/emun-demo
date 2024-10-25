import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ISidebarContent } from "./Sidebar";

export function SidebarItem(props: ISidebarItemProps) {
    const router = useRouter();
    const {sidebarItem, sidebarOpen, handleDrawerOpen} = props;
    const {icon, label, href, children } = sidebarItem;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        // If has an href route to that page
        if (href) router.push(href); 
        // If has children open them and open sidebar if not already open
        if (children) {
            setOpen(!open);
            if (!sidebarOpen) handleDrawerOpen();
        }
    }
    return (
        <ListItem disablePadding  sx={{
            display: 'block',
            // Whatever page we are on set fontweight bold for that item
            // ...(router.asPath === href && {
            //     '& .MuiListItemIcon-root': {
            //         fontWeight: 1000, // Bold icon
            //     },
            //     '& .MuiListItemText-root': {
            //         fontWeight: 1000, // Bold text
            //     },
            //     '& .MuiSvgIcon-root': {
            //         fontWeight: 1000, // Bold chevrons (ExpandLess, ExpandMore)
            //     }
            // })
        }}>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} sx={{fontSize: '4rem !important'}} />
            {children ? open ? <ExpandLess /> : <ExpandMore /> : <></>}
            </ListItemButton>
            {children &&        
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List disablePadding sx={{pl: 1}}>
                        {children.map((child, index) => (
                            <SidebarItem key={index} sidebarOpen={sidebarOpen} sidebarItem={child} handleDrawerOpen={handleDrawerOpen}/> 
                        ))}
                    </List>
                </Collapse>
            }
        </ListItem>
    )
}

interface ISidebarItemProps {
    sidebarOpen?: boolean
    sidebarItem: ISidebarContent;
    handleDrawerOpen: () => void;
}