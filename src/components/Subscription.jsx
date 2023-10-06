import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';

import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import Header from './Header';
import Text from './Text';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#0f0f0f',
            paper: '#0c0b0b',
        },
    }
},);



export default function Subscription() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >

                <Header />
            </AppBar>

            <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>

                <Box sx={{ width: '90%',alignSelf:"center", display: 'flex', flexDirection: "column", justifyContent: "center", padding: "10px", gap: 7 }}>

                    <Container sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <img src='https://www.gstatic.com/youtube/img/unlimited/ytu_mobile_premium_logo_short_dark_310x40.png' style={{ width: "200px", height: "28px" }}
                        alt='logo'
                        ></img>
                        <h3>Individual membership</h3>
                        <Divider />
                    </Container>

                    <Container sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                            <h3 style={{ fontWeight: "600" }}>Pre-paid plans</h3>
                            <h3 style={{ color: "#bdbdbd" }}>Pay up front. Top up at any time. We accept many forms of payment, including UPI.</h3>
                        </Container>
                        <Container sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            <List component="nav" aria-label="mailbox folders" sx={{ border: "0.1px solid rgba(255, 255, 255, 0.2)" }}>

                                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <ListItemText sx={{ marginBottom: 0.1 }} primary="12-month" />
                                    <ListItemText secondary="₹1,290.00" />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
                                    <ListItemText sx={{ marginBottom: 0.1 }} primary="3-month" />
                                    <ListItemText secondary="₹399.00" />
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: -5 }}>
                                    <ListItemText sx={{ marginBottom: 0.1 }} primary="1-month" />
                                    <ListItemText secondary="₹139.00" />
                                </ListItem>


                            </List>
                        </Container>

                    </Container>

                    {/* <----- 2nd list ---->  */}

                    <Container sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                            <h2 style={{ fontWeight: "600" }}>Subscription plan</h2>
                            <h3 style={{ color: "#bdbdbd" }}>Automatic payments such as credit cards are required. Billing recurs monthly. Cancel at any time.</h3>
                        </Container>
                        <Container sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            <List component="nav" aria-label="mailbox folders" sx={{ display: "flex", justifyContent: "space-between", border: "0.1px solid rgba(255, 255, 255, 0.2)", paddingRight: 3, alignItems: "center", textAlign:"center" }}>

                                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <ListItemText sx={{ marginBottom: 0.1 }} primary="1 month free" />
                                    <ListItemText secondary="₹129/month after free trail" />
                                </ListItem>

                                <Button
                                    size="large"
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 5,
                                        height: 45,
                                        fontSize: 'large',
                                        color: '#74a6f2',
                                        fontFamily: 'system-ui',
                                        textTransform: 'none',
                                        whiteSpace: 'nowrap',
                                        border: '0.1px solid rgba(255, 255, 255, 0.2)', // Add border
                                        transition: 'background-color 0.3s', // Add transition
                                        '&:hover': {
                                            backgroundColor: 'rgba(122, 186, 242, 0.1)', // Change background color on hover
                                        },
                                    }}
                                >
                                    1 month free
                                </Button>

                            </List>
                        </Container>


                        <Container>
                            <Text />

                        </Container>



                    </Container>



                </Box>

            </Container>





        </ThemeProvider>
    );
}