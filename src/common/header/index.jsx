import React, { useState, useEffect } from "react";
import Mainlog from "../../assets/svg/MainLogo";
import { NavLink } from "react-router-dom";
import SearchIcon from "../../assets/svg/SearchIcon";
import GlobIcon from "../../assets/svg/GlobIcon";
import UserIcon from "../../assets/svg/UserIcon";
import HeartIcon from "../../assets/svg/HeartIcon";
import CartIcon from "../../assets/svg/CartIcon";
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

const Header = () => {
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
          setCartProducts(JSON.parse(savedCartItems));
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };
    fetchCartProducts();

    // Listen for storage changes to update cart products
    const handleStorageChange = () => {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        setCartProducts(JSON.parse(savedCartItems));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartChange', handleStorageChange);
    };
  }, []);

  const handleCartMouseEnter = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartMouseLeave = () => {
    setCartAnchorEl(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white py-4">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <NavLink
              to={"/"}
              className="text-[20px] font-semibold leading-[25px] font-jaro text-black uppercase"
            >
              home
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[20px] font-semibold leading-[25px] font-jaro text-black uppercase"
            >
              template
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[20px] font-semibold leading-[25px] font-jaro text-black uppercase"
            >
              docs
            </NavLink>
            <NavLink
              to={"/"}
              className="text-[20px] font-semibold leading-[25px] font-jaro text-black uppercase"
            >
              sale
            </NavLink>
          </div>
          <NavLink to={"/"}>
            <div className="w-[103px] h-[36px]">
              <Mainlog />
            </div>
          </NavLink>
          <div className="flex items-center gap-5">
            <div className="w-[25px] h-[25px] cursor-pointer flex justify-center items-center opacity-50">
              <SearchIcon />
            </div>
            <div className="w-[25px] h-[25px] cursor-pointer flex justify-center items-center opacity-50">
              <GlobIcon />
            </div>
            <div className="w-[25px] h-[25px] cursor-pointer flex justify-center items-center opacity-50">
              <UserIcon />
            </div>
            <div className="w-[25px] h-[25px] cursor-pointer flex justify-center items-center opacity-50">
              <HeartIcon iconblack />
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
                          <Avatar alt={product.title} src={product.thumbnail || product.image} />
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
