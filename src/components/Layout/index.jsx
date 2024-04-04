import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useAuth } from "../context/auth/AuthState";

const pages = ["Complaints", "Analytics", "About Us"];
const settings = ["Profile", "Dashboard", "Logout"];

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
const currentAvatarColor =
  "#" + avatarColors[Math.floor(Math.random() * avatarColors.length)];

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = React.useState("");
  const [anchorElUser, setAnchorElUser] = React.useState("");
  const { currentUser, currentUserRole } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // clear cookies and refresh
    fetch("/sugam/api/logout").then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="navbar-parent">
      <AppBar position="static" sx={{ backgroundColor: "#0ca074e1" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SUGAM
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link to="complaints">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Complaints</Typography>
                  </MenuItem>
                </Link>
                <Link to="analytics">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Analytics</Typography>
                  </MenuItem>
                </Link>
                <Link to="aboutus">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">About Us</Typography>
                  </MenuItem>
                </Link>
                <Link to="track">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Track</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SUGAM
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="complaints">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Complaints</Typography>
                </MenuItem>
              </Link>
              <Link to="analytics">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Analytics</Typography>
                </MenuItem>
              </Link>
              <Link to="aboutus">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">About Us</Typography>
                </MenuItem>
              </Link>
              <Link to="track">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Track</Typography>
                </MenuItem>
              </Link>
            </Box>

            {currentUser ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AvatarImage
                      name={currentUser.displayName}
                      // photoURL={currentUser.photoURL}
                      currentAvatarColor={currentAvatarColor}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to="Profile">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="aboutus">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">About Us</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="charts">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                {/* //add login button */}
                <Link to="login">
                  <Button variant="contained" color="success">
                    Login
                  </Button>
                </Link>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />

      <footer className="footer--light">
        <div className="footer-big">
          <div className="footer-containermain">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget">
                  <div className="widget-about">
                    <img
                      decoding="async"
                      src="images/bg-1.png"
                      alt=""
                      className="img-fluid"
                    />
                    <p>SUGAM ...Steping toward the clean city!!</p>
                    <ul className="contact-details">
                      <li>
                        <i className="fas fa-phone-alt"></i> Call Us:
                        <br />
                        <a href="#">+91 9921318237</a>
                        <br />
                        <a href="#">+91 9322087344</a>
                        <br />
                        <a href="#">+91 9823632117</a>
                      </li>
                      <li>
                        <i className="fas fa-envelope-open-text"></i>
                        <br />
                        <a href="#">mayur.agarwal22@vit.edu</a>
                        <br />
                        <a href="#">bhavesh.agone22@vit.edu</a>
                        <br />
                        <a href="#">vaishnavi.mahindrakar22@vit.edu</a>
                        <br />
                        <a href="#">ankush.devangad22@vit.edu</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6" style={{ marginTop: "100px" }}>
                <div className="footer-widget">
                  <div className="footer-menu">
                    <h4 className="footer-widget-title">Popular Category</h4>
                    <ul>
                      <li>
                        <Link to="Complaints">Complaint</Link>
                      </li>
                      <li>
                        <Link to="Analytics">Analytics</Link>
                      </li>

                      <li>
                        <Link to="aboutus">About Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6" style={{ marginTop: "100px" }}>
                <div className="footer-widget">
                  <div className="footer-menu">
                    <h4 className="footer-widget-title">Our Team</h4>
                    <ul>
                      <li>
                        <Link to="aboutus">About Us</Link>
                      </li>
                      <li>
                        <Link to="">Home</Link>
                      </li>
                      <li>
                        <Link to="dashboard">Dashboard</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function stringAvatar(name) {
  const abbreviation =
    name.search(" ") === -1
      ? `${name.split(" ")[0][0]}`
      : `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  return {
    children: abbreviation,
  };
}

function AvatarImage(props) {
  const { name, photoURL, currentAvatarColor } = props;
  //   return <div></div>
  if (Boolean(photoURL)) {
    return <Avatar alt={name} src={photoURL} />;
  } else if (Boolean(name)) {
    return (
      <Avatar {...stringAvatar(name)} sx={{ bgcolor: currentAvatarColor }} />
    );
  } else {
    return <Avatar alt={name} src={photoURL} />;
  }
}

export default Layout;
