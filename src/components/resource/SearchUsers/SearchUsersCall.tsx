import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import {
    SearchUsersQuery,
    SearchUsers,
    PublicUser,
} from "allotr-graphql-schema-types";

function SearchUsersCall({
    searchString,
    hasUserClicked,
    onSearchResult }: {
        searchString?: string;
        hasUserClicked: boolean,
        onSearchResult: (value: PublicUser[]) => void;
    }) {
    const { data, loading } = useQuery<SearchUsersQuery>(SearchUsers, { variables: { query: searchString } });
    const currentResult = useRef<PublicUser[]>([]);
    useEffect(() => {
        const newResult = data?.searchUsers ?? [];
        if (loading || newResult == null || !hasUserClicked) {
            return;
        }
        currentResult.current = newResult;
        onSearchResult(currentResult.current);
    }, [data, hasUserClicked, loading, onSearchResult]);

    return null;
}

export default SearchUsersCall;
