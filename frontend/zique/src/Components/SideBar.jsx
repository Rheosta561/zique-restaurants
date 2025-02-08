import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SideBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleProfileClick = ()=>{
    navigate(`/profile/${props.userId}`);
  }
  const handleFoodGalleryClick = ()=>{
    navigate(`/foodGallery/${props.userId}`);
  }
  const handleAmbienceGalleryClick = ()=>{
    navigate(`/ambienceGallery/${props.userId}`);
  }


  return (
    <div>
      <button
        onClick={toggleSidebar}
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 bg-zinc-50 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 fixed top-0 z-30  "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-50 md:z-0 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"

      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                aria-controls="dropdown-example"
                onClick={toggleDropdown}
              >
               <svg
  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 24 24"
>
  <path d="M8 2C7.44772 2 7 2.44772 7 3V11C7 12.6569 8.34315 14 10 14V21C10 21.5523 10.4477 22 11 22H13C13.5523 22 14 21.5523 14 21V14C15.6569 14 17 12.6569 17 11V3C17 2.44772 16.5523 2 16 2C15.4477 2 15 2.44772 15 3V11C15 11.5523 14.5523 12 14 12C13.4477 12 13 11.5523 13 11V3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11C11 11.5523 10.5523 12 10 12C9.44772 12 9 11.5523 9 11V3C9 2.44772 8.55228 2 8 2Z" />
  <path d="M19 2C18.4477 2 18 2.44772 18 3V10H17C16.4477 10 16 10.4477 16 11V13C16 13.5523 16.4477 14 17 14H20C20.5523 14 21 13.5523 21 13V3C21 2.44772 20.5523 2 20 2H19Z" />
</svg>

                <span className="flex-1 ms-3 text-left whitespace-nowrap">Restaurant</span>
                <svg
                  className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-example" className={`${dropdownOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                <li>
                  <a
                    onClick={handleProfileClick}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleFoodGalleryClick}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                  >
                    Food Gallery
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleAmbienceGalleryClick}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                  >
                    Ambience Gallery
                  </a>
                </li>
              </ul>
            </li>
            <li>
                { 
                isOpen &&            <button class="flex items-center pl-3 w-full space-x-2 p-2 hover:bg-gray-200 transition-all rounded" onClick={toggleSidebar}>
                <span className='pr-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
                Close
              </button>
                }


            </li>
            <li>
              <a href="http://localhost:5173/" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                
                <span className="ms-3">Logout</span>
              </a>
            </li>

          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;