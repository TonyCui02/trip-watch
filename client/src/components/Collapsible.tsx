// Collapsible.js
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface CollapsibleProps {
  children: React.ReactNode;
}

function Collapsible(props: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute bg-neutral-100 rounded-md top-24 right:1/2 p-3 md:top-11 md:right-6 m-1 md:m-5 md:p-5 z-50 text-black w-60">
      <div
        className="flex items-center cursor-pointer justify-between"
        onClick={toggleOpen}
      >
        <h5 className="text-md font-semibold">Layer Controls</h5>
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </div>
      {isOpen && <div className="mt-2">{props.children}</div>}
    </div>
  );
}

export default Collapsible;
