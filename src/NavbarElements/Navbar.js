import { Nav, NavLink, NavMenu } 
    from "./NavbarStyles";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/courseinfo" activestyle='true'>
            Courseinfo
          </NavLink>
          <NavLink to="/phonebook" activestyle='true'>
            Phonebook
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;