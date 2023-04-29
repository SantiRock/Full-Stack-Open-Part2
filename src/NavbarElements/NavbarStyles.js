import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
background: #f7f7f7;
height: 40px;
min-width: max-content;
display: flex;
justify-content: start;
padding: 3px 0;
`;


export const NavMenu = styled.div`
  display: flex;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
`;


export const NavLink = styled(Link)`
color: #000000;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
font-family: sans-serif;

&.active {
	color: #4d4dff;
}
`;

