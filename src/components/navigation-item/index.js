import { memo } from "react";
import './style.css';
import { Link } from "react-router-dom";

function NavigationItem({ link, text }) {
  return (
    <div className='Navigation-item'>
      <Link className='Navigation-link' to={link}>{text}</Link>
    </div>
  );
}

export default memo(NavigationItem);
