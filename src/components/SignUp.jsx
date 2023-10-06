import React, { useState, useContext } from "react";
import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Context } from "../context/contextApi"; // Import your context

// <--- material-ui snake imports ----------> 
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';


const defaultTheme = createTheme({ palette: { mode: "dark" } });

const SignUp = () => {
  
  
  // <--------- snake-bar -----> 
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
 
  const [snakeBarOpen, setSnakeBarOpen] = useState(false);

  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

  const handleClickSnakeBar = () => {
    setSnakeBarOpen(true);
  };

  const handleCloseSnakeBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnakeBarOpen(false);
  };

  // < ------ snake bar end -------------> 




  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });


  // <------- Email validation --------> 
  
  const [emailError, setEmailError] = useState("");
  
  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const handleBlur = () => {
    const { email } = formData;

    if (!isEmailValid(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  // <-------End of Email validation --------> 





  const navigate = useNavigate();
  const { handleUserRegistrationAndLogin, setSnakeBarMessage,setShouldDisplaySignInMessage,snakeBar } = useContext(Context); // Access context function


  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      appType: "ott",
    };

    console.log(userData,"in signup userdata")

    try {
      // Make a POST request to register the user
      const response = await fetch(
        'https://academics.newtonschool.co/api/v1/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "projectId": "f104bi07c490"
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData,"here response")
        await handleUserRegistrationAndLogin(responseData, "register");
        console.log('User registered successfully! from signup');
        setSnakeBarMessage("")
        setShouldDisplaySignInMessage(false)
        navigate('/feed');
      } else {
        const errorData = await response.json();
        if (errorData.status === 'fail' && errorData.message === 'User already exists') {
          // User is already registered
          
          setSnakeBarMessage("User already exists. Please sign in")
          setShouldDisplaySignInMessage(false)
          handleClickSnakeBar();
          
          // navigate("/signin")
        } else {

          setSnakeBarMessage("Something went wrong")
          setShouldDisplaySignInMessage(false)
          handleClickSnakeBar();

          console.log('Registration failed. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };



  return (


    <>

      <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
 

        <div className="flex h-5 items-center">
          <Link to="/feed" className="flex h-5 items-center">
            <img
              className="h-full hidden dark:md:block"
              src={ytLogo}
              alt="Youtube"
            />
            <img
              className="h-full md:hidden"
              src={ytLogoMobile}
              alt="Youtube"
            />
          </Link>
        </div>
      </div>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur} // Trigger email validation on blur
                    error={!!emailError} // Set error to true if there's an email validation error
                    helperText={emailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formData.fullName || !isEmailValid(formData.email) || !formData.password}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signin" variant="body2">
                    {"Already have an account?"} <span className="text-[#74a6f2]">Sign in</span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>


      <div>
        <Snackbar open={snakeBarOpen} autoHideDuration={6000} onClose={handleCloseSnakeBar} TransitionComponent={TransitionRight} >
          <Alert onClose={handleCloseSnakeBar} severity="error" sx={{ width: '100%' }}>
            {snakeBar.text}
          </Alert>
        </Snackbar>
      </div>

    </>
  );
};

export default SignUp;
