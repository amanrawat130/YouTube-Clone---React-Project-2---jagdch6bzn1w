import React, { useState, useContext, useEffect } from "react";
import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// <--- material-ui snake imports ----------> 
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';



import { Context } from "../context/contextApi"; // Import your context


const defaultTheme = createTheme({ palette: { mode: "dark" } });

const SignIn = () => {
  
  const { handleUserRegistrationAndLogin , snakeBar,setSnakeBarMessage,setShouldDisplaySignInMessage } = useContext(Context); // Access context function

  useEffect(() => {
    if (snakeBar.text !== "" && snakeBar.shouldDisplayText ) {
      handleClickSnakeBar();
    }

}, [snakeBar.text]);




  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



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



  const handleSubmit = async (e) => {
    e.preventDefault();


    const userData = {
      email: formData.email,
      password: formData.password,
      appType: "ott",
    };

    try {
      // Make a POST request to log in the user
      const response = await fetch(
        'https://academics.newtonschool.co/api/v1/user/login',
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
        handleUserRegistrationAndLogin(responseData, "login");
        console.log('User logged in successfully!');
        setSnakeBarMessage("")
        setShouldDisplaySignInMessage(false)
        navigate('/feed');
      } else {
        const errorData = await response.json();
        // Wrong email or password
        if (errorData.status === 'fail' && errorData.message === 'Incorrect EmailId or Password') {
          setSnakeBarMessage('Incorrect Email Id or Password.');
          handleClickSnakeBar();
          
        } else {
          // Handle other login errors
          setSnakeBarMessage('Something went wrong');
          handleClickSnakeBar();

          console.log('Login failed. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur} // Trigger email validation on blur
                error={!!emailError} // Set error to true if there's an email validation error
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"                
                value={formData.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isEmailValid(formData.email) || !formData.password}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/" variant="body2">
                    {"Don't have an account?"} <span className="text-[#74a6f2]">Sign Up</span>
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

export default SignIn;
