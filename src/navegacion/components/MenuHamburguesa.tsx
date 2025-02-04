import { useState } from "react";
import { Menu } from "./";

export const MenuHamburguesa = () => {
  const [showMenu, setShowMenu] = useState(true);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="md:hidden p-4">
      {showMenu ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={handleShowMenu}
          width="26"
          height="26"
        >
          <path
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            fill="bisque"
          />
        </svg>
      ) : (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            onClick={handleShowMenu}
            width="26"
            height="26"
          >
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              fill="bisque"
            />
          </svg>
          <Menu />
        </div>
      )}
    </div>
  );
};
