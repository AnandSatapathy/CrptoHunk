import React from "react";
import { auth, db } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { signOut } from "firebase/auth";

import { Avatar, Button } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext.js";

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
  },
  logout: {
    height: "8%",
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
  },

  picture: {
    width: 200,
    height: 200,

    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    alignSelf: "center",
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { user,setAlert } = CryptoState();
  console.log("🚀 ~ file: UserSidebar.js ~ line 65 ~ UserSidebar ~ setAlert", setAlert)
  console.log("🚀 ~ file: UserSidebar.js ~ line 27 ~ UserSidebar ~ user", user);
  const toggleDrawer = (anchor, open) => (event) => {
    console.log(
      "🚀 ~ file: UserSidebar.js ~ line 26 ~ toggleDrawer ~ event",
      event
    );
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    console.log("🚀 ~ file: UserSidebar.js ~ line 41 ~ toggleDrawer ~ ...state", ...state)
  };
  // sign out Authentication
  const logOut =()=>{
      signOut(auth);

      setAlert({
        open:true,
        type: "success",
        message: "Logout successfully !",
      });

      toggleDrawer();
  }

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
