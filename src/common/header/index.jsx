import React, { useState, useEffect } from "react";
import Mainlog from "../../assets/svg/MainLogo";
import { NavLink } from "react-router-dom";
import SearchIcon from "../../assets/svg/SearchIcon";
import GlobIcon from "../../assets/svg/GlobIcon";
import UserIcon from "../../assets/svg/UserIcon";
import HeartIcon from "../../assets/svg/HeartIcon";
import CartIcon from "../../assets/svg/CartIcon";
// import LogoutIcon from "../../assets/svg/LogoutIcon";
import {
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { auth } from "../../firebase/config"; // Import the auth object from your Firebase config

const Header = () => {
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [likeAnchorEl, setLikeAnchorEl] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [logoutAnchorEl, setLogoutAnchorEl] = useState(null);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const savedCartItems = localStorage.getItem("cartItems");
        if (savedCartItems) {
          setCartProducts(JSON.parse(savedCartItems));
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };
    fetchCartProducts();

    const savedLikedItems = localStorage.getItem("likedItems");
    if (savedLikedItems) {
      setLikedItems(JSON.parse(savedLikedItems));
    }

    const handleStorageChange = () => {
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        setCartProducts(JSON.parse(savedCartItems));
      }
      const savedLikedItems = localStorage.getItem("likedItems");
      if (savedLikedItems) {
        setLikedItems(JSON.parse(savedLikedItems));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartChange", handleStorageChange);
    window.addEventListener("likeChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartChange", handleStorageChange);
      window.removeEventListener("likeChange", handleStorageChange);
    };
  }, []);

  const handleCartMouseEnter = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartMouseLeave = () => {
    setCartAnchorEl(null);
  };

  const handleLikeMouseEnter = (event) => {
    setLikeAnchorEl(event.currentTarget);
  };

  const handleLikeMouseLeave = () => {
    setLikeAnchorEl(null);
  };

  const handleLogoutMouseEnter = (event) => {
    setLogoutAnchorEl(event.currentTarget);
  };

  const handleLogoutMouseLeave = () => {
    setLogoutAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Call signOut to log the user out
      console.log("User logged out");
      // Optionally, you can redirect the user or show a message
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white py-4">
      <div className="container">
        <div className="flex justify-between items-center">
          {/*<div className="flex items-center gap-5">
            <NavLink
              to={"/"}
              className="text-[20px] font-semibold leading-[25px] font-jaro text-black uppercase header-effect"
            >
              home
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[20px] font-semibold leading-[25px] font-jaro text-black uppercase header-effect"
            >
              template
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[20px] font-semibold leading-[25px] font-jaro text-black uppercase header-effect"
            >
              docs
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[20px] font-semibold leading-[25px] font-jaro text-black uppercase header-effect"
            >
              sale
            </NavLink>
          </div>*/}
          <NavLink to={"/"}>
            <div className="w-[103px] h-[36px]">
              <Mainlog />
            </div>
          </NavLink>
          <div className="flex items-center gap-5">
            <div className="w-[25px] h-[25px] cursor-pointer flex justify-center items-center opacity-50">
              <SearchIcon />
            </div>
            <div
              onMouseEnter={handleLogoutMouseEnter}
              onMouseLeave={handleLogoutMouseLeave}
            >
              <div className="w-[25px] h-[25px] cursor-pointer flex justify-center items-center opacity-50">
                <UserIcon />
              </div>
              <Menu
                anchorEl={logoutAnchorEl}
                open={Boolean(logoutAnchorEl)}
                onClose={handleLogoutMouseLeave}
                onClick={(event) => event.stopPropagation()}
                PaperProps={{
                  style: {
                    maxHeight: 200,
                    width: "150px",
                    padding: 0,
                  },
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
            <div
              onMouseEnter={handleLikeMouseEnter}
              onMouseLeave={handleLikeMouseLeave}
            >
              <IconButton aria-label="likes">
                <Badge badgeContent={likedItems.length} color="primary">
                  <div className="w-[25px] h-[25px] cursor-pointer flex justify-center items-center opacity-50">
                    <HeartIcon iconblack />
                  </div>
                </Badge>
              </IconButton>
              <Menu
                anchorEl={likeAnchorEl}
                open={Boolean(likeAnchorEl)}
                onClose={handleLikeMouseLeave}
                onClick={(event) => event.stopPropagation()}
                PaperProps={{
                  style: {
                    maxHeight: 500,
                    width: "300px",
                    padding: 0,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ p: 2, backgroundColor: "white", zIndex: 1 }}
                >
                  Liked Items
                </Typography>
                <List sx={{ maxHeight: 300, overflow: "auto" }}>
                  {likedItems.length === 0 ? (
                    <MenuItem onClick={handleLikeMouseLeave}>
                      No liked items
                    </MenuItem>
                  ) : (
                    likedItems.map((item) => (
                      <ListItem key={item.id} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt={item.title}
                            src={item.imageUrl || item.image || item.thumbnail}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={item.description}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
                <NavLink to={"/liked"}>
                  <MenuItem
                    onClick={handleLikeMouseLeave}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                      },
                      borderRadius: "4px",
                      margin: "10px",
                      textAlign: "center",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    Go to Likes
                  </MenuItem>
                </NavLink>
              </Menu>
            </div>
            <div
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <NavLink to={"/cart"}>
                <IconButton aria-label="cart">
                  <Badge badgeContent={cartProducts.length} color="primary">
                    <div className="w-[25px] h-[25px] cursor-pointer flex justify-center items-center opacity-50">
                      <CartIcon iconblack />
                    </div>
                  </Badge>
                </IconButton>
              </NavLink>
              <Menu
                anchorEl={cartAnchorEl}
                open={Boolean(cartAnchorEl)}
                onClose={handleCartMouseLeave}
                onClick={(event) => event.stopPropagation()}
                PaperProps={{
                  style: {
                    maxHeight: 500,
                    width: "300px",
                    padding: 0,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ p: 2, backgroundColor: "white", zIndex: 1 }}
                >
                  Cart
                </Typography>
                <List sx={{ maxHeight: 300, overflow: "auto" }}>
                  {cartProducts.length === 0 ? (
                    <MenuItem onClick={handleCartMouseLeave}>
                      No products in cart
                    </MenuItem>
                  ) : (
                    cartProducts.map((product) => (
                      <ListItem key={product.id} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt={product.title}
                            src={product.thumbnail || product.image}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.title}
                          secondary={`Price: $${product.price} x ${product.quantity}`}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
                <NavLink to={"/cart"}>
                  <MenuItem
                    onClick={handleCartMouseLeave}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                      },
                      borderRadius: "4px",
                      margin: "10px",
                      textAlign: "center",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    Go to Cart
                  </MenuItem>
                </NavLink>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
