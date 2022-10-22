import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const SideBar = ({ items, icons, selectedIndex, setSelectedIndex }) => {

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const drawerWidth = 240;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },

            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {items.map((text, index) => (
                        <ListItem key={index} disablePadding >
                            <ListItemButton selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}>
                                <ListItemIcon>
                                    {icons[index]}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Box>
        </Drawer>

    )
}

export default SideBar