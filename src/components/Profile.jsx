import * as React from 'react';
import { useContext, useState } from 'react';
import { Context } from "../context/contextApi";


import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Modal from '@mui/material/Modal';
import Header from './Header';
import CircularProgress from '@mui/material/CircularProgress';


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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export default function Subscription() {

    const { storageState, setStorageState, userData, userToken } = useContext(Context);
    const [progress, SetProgress] = useState(false);

    // <----- form -------> 
    const [formData, setFormData] = useState({
        fullName: userData.name,
        address: userData.address ? userData.address : "",
        education: userData.education ? userData.education : "",
        skills: userData.skills ? userData.skills : "",
        workExprience: userData.workExprience ? userData.workExprience : "",
    });

    const [password, setPassword] = useState({
        passwordCurrent: "",
        newPassword: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData, "formData");
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value })
        console.log(password, "password")

    }

    const passwordChangeRequest = async () => {


        const requestBody = {
            email: userData.email,
            passwordCurrent: password.passwordCurrent,
            password: password.newPassword,
            appType: "ott"
        };

        console.log("body", JSON.stringify(requestBody))

        try {
            // Make a POST request to log in the user
            const response = await fetch(
                'https://academics.newtonschool.co/api/v1/user/updateMyPassword',
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        "projectId": "f104bi07c490",
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            console.log(response)

            if (response.ok) {
                const responseData = await response.json();

                setPassword({
                    passwordCurrent: "",
                    newPassword: ""
                })
                handleModalClose()
                console.log('User logged in successfully!', responseData);


            } else {
                const errorData = await response.json();
                console.log('Login failed. Please try again later.', errorData);

            }
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {

        }

    }

    const [openModal, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    // <------ finsish modal -----> 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: formData.fullName ? formData.fullName : userData.name,
            address: formData.address,
            education: formData.education,
            skills: formData.skills,
            workExprience: formData.workExprience,
            appType: "ott",
        };

        try {
            // Make a POST request to log in the user
            const response = await fetch(
                'https://academics.newtonschool.co/api/v1/user/updateme',
                {
                    method: 'PATCH',
                    headers: {
                        "projectId": "f104bi07c490",
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                }
            );
            if (response.ok) {
                const responseData = await response.json();

                console.log('User logged in successfully!', responseData.data.user);
                setStorageState({
                    ...storageState,
                    userData: responseData.data.user
                })

                // navigate('/feed');
            } else {
                const errorData = await response.json();
                // Wrong email or password
                if (errorData.status === 'fail' && errorData.message === 'Incorrect EmailId or Password') {

                } else {
                    console.log('Login failed. Please try again later.');
                }
            }
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {

        }
    };

    const handleFileChange = (file) => {
        if (!file) {
            return;
        }

        SetProgress(true);
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('profileImage', file);

        // Make a fetch request to update the profile image
        fetch('https://academics.newtonschool.co/api/v1/user/updateProfileImage', {
            method: 'PATCH',
            body: formData,
            headers: {
                Authorization: `Bearer ${userToken}`, // Replace with your JWT token
                projectId: 'f104bi07c490', // Replace with your project ID
            },
        })
            .then((response) => response.json())
            .then((data) => {

                // Handle the response data as needed
                setStorageState({
                    ...storageState,
                    userData: data.data.user
                })
                SetProgress(false)
            })
            .catch((error) => {
                console.error('File upload error:', error);
                alert('An error occurred while updating the profile picture.');
                setTimeout(() => {
                    alert(null); // Clear the alert message
                }, 3000);
            });
    };

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

                {progress ? (
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress size="65px" />

                    </Box>

                ) : (

                    <Box sx={{ width: '90%', alignSelf: "center", display: 'flex', flexDirection: "column", justifyContent: "center", padding: "10px", gap: 4 }}>

                        <Container sx={{ display: "flex", alignItems: "center", gap: 1, }}>
                            {/* <img src='https://www.gstatic.com/youtube/img/unlimited/ytu_mobile_premium_logo_short_dark_310x40.png' style={{ width: "200px", height: "28px" }}></img> */}
                            <Avatar
                                sx={{ height: "60px", width: "60px", objectFit:"fill" }}
                                alt="Remy Sharp"
                                src={userData.profileImage ? userData.profileImage : ""}
                            >
                                {/* {name} */}
                            </Avatar>
                            {/* <TextField label="Filled success" variant="filled" color="success" disabled sx={{borderBottom: "1px solid green",}} /> */}
                            <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <h3 style={{ fontWeight: "600", fontSize: "28px", fontFamily: 'sans-serif' }}>{userData.name && userData.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</h3>
                                <h3 style={{ color: "#22bb33", fontStyle: 'italic' }}>{userData.email}</h3>
                            </Container>

                            <Divider />
                        </Container>

                        {/* <----- 2nd list ---->  */}

                        <Container sx={{ display: "flex", gap: 2, flexDirection: "column", }}>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb: 1 }}>

                                {/* name and email  */}
                                <Container sx={{ display: "flex", gap: 2 }}>
                                    <TextField

                                        margin="normal"

                                        fullWidth
                                        id="fullName"
                                        name="fullName"
                                        label="Full Name"
                                        autoComplete="name"
                                        value={formData.fullName}
                                        onChange={handleChange}


                                    />
                                    <TextField
                                        margin="normal"

                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        value={userData.email}

                                        InputProps={{
                                            readOnly: true,
                                            style: { color: "#74a6f2", fontStyle: "italic" }
                                        }}

                                    />
                                </Container>

                                {/* change password */}
                                <Container sx={{ display: "flex", gap: 2 }}>

                                    <Button
                                        variant="outlined"
                                        size="medium"
                                        fullWidth
                                        onClick={handleModalOpen}
                                        sx={{
                                            p: 1.5,
                                            mt: 1,
                                            mb: 1,
                                            borderRadius: 3,
                                            fontSize: 'large',
                                            color: '#74a6f2',
                                            fontFamily: 'system-ui',
                                            // textTransform: 'none',
                                            whiteSpace: 'nowrap',
                                            border: '0.1px solid rgba(255, 255, 255, 0.2)', // Add border
                                            transition: 'background-color 0.5s', // Add transition
                                            '&:hover': {
                                                backgroundColor: 'rgba(122, 186, 242, 0.1)', // Change background color on hover
                                            }
                                        }}
                                    >
                                        Change Password
                                    </Button>

                                    <Modal
                                        open={openModal}
                                        onClose={handleModalClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >

                                        <Container sx={style}>
                                            <Container sx={{ display: "flex", flexDirection: "column", width: "60%", gap: 2 }}>
                                                <TextField
                                                    margin="normal"

                                                    fullWidth
                                                    id="passwordCurrent"
                                                    name="passwordCurrent"
                                                    label="Current Password"
                                                    type='password'
                                                    autoComplete="current-password"
                                                    value={password.passwordCurrent}
                                                    onChange={handlePasswordChange}
                                                />
                                                <TextField
                                                    margin="normal"

                                                    fullWidth
                                                    id="newPassword"
                                                    name="newPassword"
                                                    label="New Password"
                                                    type='password'
                                                    autoComplete="new-password"
                                                    value={password.newPassword}
                                                    onChange={handlePasswordChange}
                                                />

                                                <Button
                                                    variant="outlined"
                                                    size="medium"
                                                    fullWidth
                                                    onClick={passwordChangeRequest}
                                                    sx={{
                                                        p: 1.5,
                                                        mt: 1,
                                                        mb: 1,
                                                        borderRadius: 3,
                                                        fontSize: 'large',
                                                        color: '#74a6f2',
                                                        fontFamily: 'system-ui',
                                                        // textTransform: 'none',
                                                        whiteSpace: 'nowrap',
                                                        border: '0.1px solid rgba(255, 255, 255, 0.2)', // Add border
                                                        transition: 'background-color 0.5s', // Add transition
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(122, 186, 242, 0.1)', // Change background color on hover
                                                        }
                                                    }}
                                                >
                                                    Change Password
                                                </Button>
                                            </Container>

                                        </Container>

                                    </Modal>
                                </Container>

                                {/* Upload profile pic */}
                                <Container sx={{ display: "flex", gap: 2 }}>

                                    <Button
                                        component="label"
                                        variant="outlined"
                                        size="medium"
                                        fullWidth
                                        sx={{
                                            p: 1.5,
                                            mt: 1,
                                            mb: 1,
                                            borderRadius: 3,
                                            fontSize: 'large',
                                            color: '#74a6f2',
                                            fontFamily: 'system-ui',
                                            // textTransform: 'none',
                                            whiteSpace: 'nowrap',
                                            border: '0.1px solid rgba(255, 255, 255, 0.2)', // Add border
                                            transition: 'background-color 0.5s', // Add transition
                                            '&:hover': {
                                                backgroundColor: 'rgba(122, 186, 242, 0.1)', // Change background color on hover
                                            }
                                        }}
                                        startIcon={<CloudUploadIcon sx={{ fontSize: "large" }} />
                                        }
                                    >
                                        Upload Profile Picture
                                        <input
                                            type="file"
                                            accept=".png, .jpg, .jpeg" // Specify accepted file types
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFileChange(e.target.files[0])}
                                        />
                                    </Button>
                                </Container>

                                {/* Address and Eduction */}
                                <Container sx={{ display: "flex", gap: 2 }}>
                                    <TextField

                                        margin="normal"
                                        fullWidth
                                        id="address"
                                        name="address"
                                        label="Address"
                                        autoComplete="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="education"
                                        name="education"
                                        label="Education"
                                        autoComplete="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                    />

                                </Container>

                                {/* skills and workExprience */}
                                <Container sx={{ display: "flex", gap: 2 }}>
                                    <TextField

                                        margin="normal"

                                        fullWidth
                                        id="skills"
                                        name="skills"
                                        label="Skills"
                                        autoComplete="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        margin="normal"

                                        fullWidth
                                        id="workExprience"
                                        name="workExprience"
                                        label="Work Exprience"
                                        autoComplete="workExprience"
                                        value={formData.workExprience}
                                        onChange={handleChange}
                                    />

                                </Container>

                                {/* Update Details */}
                                <Container sx={{ display: "flex", gap: 2 }}>

                                    <Button
                                        type='submit'
                                        variant="outlined"
                                        size="medium"
                                        fullWidth
                                        onClick={() => console.log("ok")}
                                        sx={{
                                            p: 1.5,
                                            mt: 1,
                                            mb: 1,
                                            borderRadius: 3,
                                            fontSize: 'large',
                                            color: '#74a6f2',
                                            fontFamily: 'system-ui',
                                            // textTransform: 'none',
                                            whiteSpace: 'nowrap',
                                            border: '0.1px solid rgba(255, 255, 255, 0.2)', // Add border
                                            transition: 'background-color 0.5s', // Add transition
                                            '&:hover': {
                                                backgroundColor: 'rgba(122, 186, 242, 0.1)', // Change background color on hover
                                            }
                                        }}
                                    >
                                        Update Details
                                    </Button>
                                </Container>

                            </Box>
                        </Container>
                    </Box>
                )

                }
            </Container>
        </ThemeProvider>
    );
}