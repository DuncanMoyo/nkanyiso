"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useScrollDirection from "../hooks/useScrollDirection";
import { navLinks } from "@/lib/constants";
import Icon from "./ui/Icon";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ModeToggle } from "./ui/ModeToggle";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const scrollDir = useScrollDirection();

  useEffect(() => {
    function handleScroll() {
      const currentScrollTop = window.pageYOffset;

      if (currentScrollTop > lastScrollTop) {
        // scrolled down
        setNavVisible(false);
      } else {
        // scrolled up
        setNavVisible(true);
      }
      setLastScrollTop(currentScrollTop);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <header
      className={`w-full z-50 bg-emeraldMeadow md:fixed`}
      style={{
        transition: "transform 0.3s ease",
        // transform: navVisible ? "translateY(0)" : "translateY(-100%)",
        transform: scrollDir === "up" ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="max-w-7xl lg:mx-auto p-2 md:px-10 xl:px-0 w-full items-center justify-between md:justify-around hidden md:flex">
        <AnchorLink href="profile">
          <Image
            src="/assets/images/cffs-logo.png"
            alt="logo_white"
            width={50}
            height={50}
          />
        </AnchorLink>

        <div className="hidden md:justify-center md:flex">
          <ol className="flex items-center justify-between p-0 m-0">
            {navLinks.map(({ name, url }, index) => (
              <AnchorLink className="mx-16 uppercase" key={index} href={url}>
                <motion.li
                  whileHover={{
                    scale: 1.2,
                    textShadow: "0px 0px 8px rgb(255, 255, 255)",
                  }}
                  className="text-white"
                >
                  {name}
                </motion.li>
              </AnchorLink>
            ))}
          </ol>
          <ModeToggle />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div
        className={`fixed flex bg-emeraldMeadow overflow-x-hidden z-50 shadow-md px-4 top-0 left-0 right-0 w-full justify-between py-3 items-center md:hidden ${
          toggle ? "transition-all ease-out duration-500" : ""
        }`}
        style={{
          transition: "transform 0.3s ease",
          // transform: navVisible ? "translateY(0)" : "translateY(-100%)",
          transform: scrollDir === "up" ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <AnchorLink href="#home">
          <Image
            src="/assets/images/logo_white.png"
            alt="logo_white"
            width={35}
            height={35}
          />
        </AnchorLink>

        <Icon
          name={toggle ? "close" : "menu"}
          onClick={() => setToggle(!toggle)}
          color="white"
        />
      </div>
      {toggle && (
        <div className="flex fixed top-10 bottom-0 left-0 right-0 z-30 md:hidden pt-20 bg-emeraldMeadow shadow-md border-b h-screen border-gray flex-col transition-all ease-out duration-500">
          {navLinks.map(({ name, url }, index) => (
            <AnchorLink
              onClick={() => setToggle(false)}
              className="my-2 mx-auto text-lighterTeal font-robotoFont"
              key={index}
              href={url}
            >
              <p className="uppercase text-white">{name}</p>
            </AnchorLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
