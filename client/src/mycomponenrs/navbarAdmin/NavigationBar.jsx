import React, {useState, useEffect} from 'react'
// import './NavigationBar.css';
import {BsFillPlayCircleFill} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NavigationBarAdmin = () => {
  const [menuClickedCount,setMenuClickedCount]=useState(0);
  const toggleResponsiveNav = () => {
    let homepage_navigation_navMain = document.querySelector('.homepage_navigation_navMain');
    let navBarIconBurger = document.querySelector('.navBarIconBurger');
    let navBarIconCross = document.querySelector('.navBarIconCross');
    //alert(menuClickedCount);
    if(menuClickedCount&1){
      homepage_navigation_navMain.classList.remove('homepage_navigation_navMainOpen');
      navBarIconBurger.style.visibility = 'visible';
      navBarIconCross.style.visibility = 'hidden';
    }
    else{
      homepage_navigation_navMain.classList.add('homepage_navigation_navMainOpen');
      navBarIconCross.style.visibility = 'visible';
      navBarIconBurger.style.visibility = 'hidden';
    }
    setMenuClickedCount(menuClickedCount+1);
  }

  //check if user is logged in
  const loginToggle = () => {
    const token = localStorage.getItem('hackInShellAccessToken');
    return (token == null || token == undefined || token == "");
  }
  
  //check user name
  const getLoggedUserName = () => {
    //console.log(localStorage.getItem('hackInShellAccessToken'));
    const user = jwtDecode(localStorage.getItem('hackInShellAccessToken'));
    //console.log(user);
    return user.email;
  }

  //screen size
  const [deviceType, setDeviceType] = useState('');

  //change navbar accorging to screen size
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setDeviceType('mobile');
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('pc');
      }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call the resize handler initially to set the initial state
    handleResize();

    // Cleanup: remove event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to ensure effect runs only once
  
  return (
    <div className="homepage_navigation">
      <Sheet>
        <div className="homepage_navigation_mainBox">
          <div className="homepage_navigation_logoBar">
            <a href="/" className='my-auto'>
              <img src="/navbar/logo.png" alt="navlogo" loading="lazy"/>
            </a>
            <SheetTrigger className='my-auto navBarIconBar'>
              <GiHamburgerMenu className='my-auto navBurgerIcon navBarIconBurger text-green-900' onClick={()=> toggleResponsiveNav()}/>
              <ImCross className=' my-auto navBurgerIcon navBarIconCross text-green-900' onClick={()=> toggleResponsiveNav()}/>
            </SheetTrigger>
          </div>

          <div className='homepage_navigation_navMain'>
            <div className='homepage_navigation_navMenu'>
              <div className="my-auto homepage_navigation_navSubMenu">
                {/* <Link to="/" className='homepage_navigation_navMenuPageLinks'>Home</Link>  */}
                <Link to="/create" className='homepage_navigation_navMenuPageLinks'>Add</Link> 
                <Link to="/users/userlist" className='homepage_navigation_navMenuPageLinks'>Users</Link> 
                <a href="#pricing" className='homepage_navigation_navMenuPageLinks'>Pricing</a>
                <a href="#guides" className='homepage_navigation_navMenuPageLinks'>Guides</a> 
                {
                  loginToggle() ? 
                  (
                    <Link to="/login" className="my-auto homepage_navigation_loginButton">
                      <button className='mx-auto'>Log In</button>
                    </Link>
                  )
                  :
                  (
                    <Link to="/profile" className="my-auto homepage_navigation_loginButton">
                      <button className='mx-auto'>{getLoggedUserName()}</button>
                    </Link>
                  )
                }
              </div>
            </div> 
            {/* <div className='navExtra' onClick={()=> respNav()}></div> */}
          </div>
          {/*deviceType != 'pc' &&
          <SheetContent className='homepage_navigation_navMenu'>
            <div className="my-auto homepage_navigation_navSubMenu">
              <Link to="/" className='homepage_navigation_navMenuPageLinks'>Home</Link> 
              <Link to="/chats" className='homepage_navigation_navMenuPageLinks'>Chat</Link> 
              <Link to="/projects" className='homepage_navigation_navMenuPageLinks'>Projects</Link> 
              <Link to="/chats" className='homepage_navigation_navMenuPageLinks'>Pricing</Link> 
              <Link to="/projects" className='homepage_navigation_navMenuPageLinks'>Guides</Link>
              {
                loginToggle() ? 
                (
                  <Link to="/login" className="homepage_navigation_loginButton">
                    <button className='mx-auto'>Log In</button>
                  </Link>
                )
                :
                (
                  <Link to="/profile" className="homepage_navigation_loginButton">
                    <button className='mx-auto'>{getLoggedUserName()}</button>
                  </Link>
                )
              } 
            </div>
          </SheetContent> 
            */}
        </div>
      </Sheet>
    </div>
  )
}

export default NavigationBarAdmin