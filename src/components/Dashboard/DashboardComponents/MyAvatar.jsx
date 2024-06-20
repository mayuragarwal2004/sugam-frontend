import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../../context/auth/AuthState";
import { auth } from "../../../base";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const avatarColors = [
  "D28100",
  "D1423F",
  "DC1677",
  "C233A0",
  "6163E1",
  "246DB6",
  "008290",
  "7BA100",
  "9355D2",
  "627A89",
];

function randomColor(string) {
  return "#" + avatarColors[Math.floor(Math.random() * avatarColors.length)];
}

function stringAvatar(name) {
  const abbreviation =
    name.search(" ") === -1
      ? `${name.split(" ")[0][0]}`
      : `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  return {
    children: abbreviation,
  };
}

function MyAvatar(props) {
  const { currentAvatarColor } = props;
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSignOut() {
    console.log("nothing");
    if (currentUser) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/auth", {replace: true})
        })
        .catch((error) => {
          // An error happened.
        });
    }
  }

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <AvatarImage
            name={currentUser.displayName}
            photoURL={currentUser.photoURL}
            currentAvatarColor={currentAvatarColor}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
function AvatarImage(props) {
  const { name, photoURL, currentAvatarColor } = props;
  //   return <div></div>
  if (Boolean(photoURL)) {
    return <Avatar alt={name} src={photoURL} />;
  } else if (Boolean(name)) {
    return <Avatar {...stringAvatar(name)} sx={{ bgcolor: currentAvatarColor}} />;
  } else {
    return <Avatar alt={name} src={photoURL} />;
  }
}

export default MyAvatar;
