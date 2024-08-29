import { useState } from "react";

function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <div>
      <button
          className="flex justify-center items-center h-14 w-14 rounded-full bg-white cursor-pointer shadow-2xl hover:border-2 hover:border-blue-600"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-user-round"
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </button>
      {isOpen && (
        <>
          <div className="absolute top-16 right-5 bg-white p-4 rounded-lg shadow-lg">
            <a
              href="/profile"
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100 hover:rounded-2xl"
            >
              Profile
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 hover:rounded-2xl"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
