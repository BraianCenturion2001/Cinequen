import React from 'react'
import { Icon } from "semantic-ui-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../hooks"
import "./SideBar.scss"
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Divider, Typography } from "@mui/material"
import { linkUsers, linksAdmin } from './links.admin'
import { map } from 'lodash'
import { Scrollbar } from "./scrollbar";


export function SideBar() {
  const { pathname } = useLocation();
  const { auth } = useAuth();

  const content = (
    <Drawer
      anchor="left"
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 220
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="permanent"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Scrollbar
          sx={{
            height: '100%',
            '& .simplebar-content': {
              height: '100%'
            },
            '& .simplebar-scrollbar:before': {
              background: 'neutral.400'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            Cinequén Administración
          </Box>
          <Divider sx={{ borderColor: 'neutral.700' }} />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {map(linksAdmin, (link, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={Link} to={link.pathname} selected={link.pathname === pathname}>
                    <ListItemIcon>
                      <Icon name={link.iconName} />
                    </ListItemIcon>
                    <ListItemText primary={link.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {auth.me?.is_staff && (
              <>
                <Divider />
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={linkUsers.pathname}>
                      <ListItemIcon>
                        <Icon name={linkUsers.iconName} />
                      </ListItemIcon>
                      <ListItemText primary={linkUsers.title} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </>
            )}
          </Box>
        </Scrollbar>
      </Box>
    </Drawer>
  );
  return (
    <Drawer
      anchor="left"
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.black',
          width: 220
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="permanent"
    >
      {content}
    </Drawer>
  );
} 