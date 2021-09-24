import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PublicUser } from "allotr-graphql-schema-types";
import ActionButton from "../../generic/ActionButton";
import SearchUsersCall from "./SearchUsersCall";
import SearchUsersTableRow from "./SearchUsersTableRow";
import MagnifyingGlass from "../../../assets/MagnifyingGlass";
import { COLORS } from "../../../consts/colors";
import "./SearchUsersTable.css";

function SearchUsersTable({
    searchString = "",
    selectedUserList = [],
    onSelectedUserListChanged
}: {
    searchString?: string;
    selectedUserList?: PublicUser[];
    onSelectedUserListChanged: (userList: PublicUser[]) => void;
}) {
    const { t } = useTranslation();
    const [textToQuery, setTextToQuery] = useState(searchString);
    const [inpuText, setInputText] = useState("");
    const [searchResult, setSearchResult] = useState<PublicUser[]>([]);
    const [hasClickedSearch, setHasClickedSearch] = useState<boolean>(false);
    const [selectedUserListState, setSelectedUserListState] = useState<PublicUser[]>([]);

    const checkKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key !== 'Enter') return;
        onSearchClick();
        e.preventDefault();
    };

    // Event listeners
    const onSearchClick = () => {
        setTextToQuery(inpuText);
        setHasClickedSearch(true);
    }

    const onSearchResultLoaded = (userList: PublicUser[]) => {
        setHasClickedSearch(false);
        filterRefreshResults(userList, selectedUserListState);
    };

    useEffect(() => {
        // Make initial search
        setSelectedUserListState(selectedUserList);
        setHasClickedSearch(true);
    }, [selectedUserList])

    const filterRefreshResults = (userList: PublicUser[], selectedUserList: PublicUser[]) => {
        const filteredUsers = userList.filter(user => !selectedUserList.some(({ id }) => id === user.id));
        setSearchResult(filteredUsers);
    };

    const onAddClickListener = (publicUser: PublicUser) => {
        const newUserList = [...selectedUserListState, publicUser];
        filterRefreshResults(searchResult, newUserList);
        onSelectedUserListChanged(newUserList);
    };

    return (
        // Resource Card
        <div className="usersTablestatic resourceCard bg-purple-dark h-72 w-11/12  break-word md:break-normal overflow-y-scroll">
            {/* Search bar */}
            <div className="absolute h-14 pt-1 w-10/12 bg-purple-dark">
                <div className="flex pt-1 pl-3 justify-items-end m-auto w-full ">
                    {/* Input search */}
                    <div className="flex-1">
                        <input
                            type="text"
                            className="h-9 w-full bg-purple-light text-yellow cursor-text placeholder-yellow placeholder-opacity-60 pl-3"
                            value={inpuText}
                            onKeyDown={(e) => checkKeyDown(e)}
                            onChange={(event) => setInputText(event?.target.value)}
                            placeholder={t("SearchPlaceholder")}
                        />
                    </div>
                    {/* Search button */}
                    <div className="flex mr-4 flex-1 justify-end">
                        <ActionButton
                            type="button"
                            action={onSearchClick}
                            label="SearchUserTable"
                            logo={MagnifyingGlass}
                            fill={COLORS.blue.light}
                        ></ActionButton>
                    </div>
                </div>
            </div>

            {/* Table Results */}
            <div className="block mt-14">
                {searchResult.map((result) => (
                    <SearchUsersTableRow
                        key={result.id}
                        publicUser={result}
                        onAddClick={onAddClickListener}
                    />
                ))}
            </div>
            <div className="mb-10"></div>

            {/* Query search */}
            <SearchUsersCall
                searchString={textToQuery}
                onSearchResult={onSearchResultLoaded}
                hasUserClicked={hasClickedSearch}
            />
        </div>
    );
}

export default SearchUsersTable;
