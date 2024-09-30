import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const FirebaseLogin = ({ onLoginSuccess, setUsername, ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:9999/auth/login", {
        username: values.username,
        password: values.password,
      });

      if (response && response.data) {
        const { api_status, api_message, userInfo } = response.data;

        if (api_status === "success") {
          console.log("Login successful:", userInfo);

          // เก็บ username ใน Local Storage
          localStorage.setItem("username", values.username);

          // Redirect to the specified URL
          window.location.href = "http://localhost:3000/free/studen/";

          // Optional: Call onLoginSuccess if you still want to execute it
          if (typeof onLoginSuccess === 'function') {
            onLoginSuccess();
          }
        } else {
          setError(api_message);
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors({ submit: "Invalid username or password" });
    } finally {
      setSubmitting(false);
    }
  };




  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in Icit Account</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          username: '', // Change email to username
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'), // Update validation for username
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel> {/* Change label to Username */}
              <OutlinedInput
                id="outlined-adornment-username-login" // Change ID to reflect username
                value={values.username} // Change value to username
                name="username" // Change name to username
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username-login">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
            <Typography
              component="a"
              href="https://account.kmutnb.ac.th/web/recovery/index"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 2, display: 'block', color: '#EB6725', fontWeight: 'bold', textAlign: 'center' }}
            >
              Forgot ICIT Account Password
            </Typography>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;