import React, { useState } from "react";
import { PublicUser } from "allotr-graphql-schema-types";
import MiniActionButton from "../../generic/MiniActionButton";
import Plus from "../../../assets/Plus";
import { COLORS } from "../../../consts/colors";

function SearchUsersTableRow({
  onAddClick,
  publicUser,
}: {
  onAddClick: (user: PublicUser) => void;
  publicUser: PublicUser;
}) {
  const [userData] = useState(publicUser);

  // Hover styling
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };

  // Button action

  return (
    <div className="resourceCard bg-purple h-14 w-11/12 ml-3 mt-1 flex justify-between">
      <p className="text-blue-light align-middle block m-auto ml-2">
        {userData.name} {userData.surname} - {userData.username}
      </p>
      <span className="bg-purple-dark w-1 ml-2"></span>
      <div className="" {...{ onMouseEnter, onMouseLeave }}>
        <MiniActionButton
          action={() => onAddClick(userData)}
          logo={Plus}
          fill={isHovered ? COLORS.blue.light : COLORS.purple.dark}
          type="button"
        />
      </div>
    </div>
  );
}

export default SearchUsersTableRow;
