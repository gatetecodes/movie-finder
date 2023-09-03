import React from "react";

const Logo = () => (
    <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
    </div>
);

const Navbar = ({ children }) => {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
};

export default Navbar;
