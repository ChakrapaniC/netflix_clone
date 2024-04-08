
const MobileMenu = ({ visible }) => {
  const MobileItems = [
    "Home",
    "Series",
    "Films",
    "New & Popular",
    "My List",
    "Browse by Language",
  ];
  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-col absolute w-56 bg-black top-8 left-0 py-4 items-center border-2 border-gray-800 transition duration-1000 ease-in">
      <div className="flex flex-col gap-3">
        {MobileItems.map((item, index) => (
          <div key={index} className="text-white text-center px-3 hover:underline">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
