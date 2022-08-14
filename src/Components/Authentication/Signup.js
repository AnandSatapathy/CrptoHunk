
import { useState, useEffect } from "react";
import { Box, Button, TextField , Snackbar } from "@material-ui/core";
const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSubmit = () => {
  
   if(password) { return; }
  };
    
   

  return (
    <div>
      <Box
        p={3}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Email Address field*/}
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        {/* Password field */}
        <TextField
          variant="outlined"
          type="password"
          label="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        {/* Confirm Password field */}
        <TextField
          variant="outlined"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          />
          {/*  Signup button*/}
          <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      </Box>
    </div>
  );
};

export default Signup;
