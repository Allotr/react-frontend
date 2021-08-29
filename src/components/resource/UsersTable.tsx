import React, { useEffect, useState, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
// import { useForm, SubmitHandler } from "react-hook-form";
import { LocalRole } from "allotr-graphql-schema-types"
import ActionButton from "../generic/ActionButton";
import { useQuery } from "@apollo/client";
import { SearchUsersQuery, SearchUsers } from "allotr-graphql-schema-types";
import { useMutation } from "@apollo/react-hooks";
import { useForm, SubmitHandler } from "react-hook-form";
// type Inputs = {
//     name: string,
//     description?: string,
//     maxActiveTickets: number,
//     userList: Array<{ id: string, role: LocalRole }>
// };

function UsersTable() {
    // let textToQuery = "";
    const [textToQuery, setTextToQuery] = useState("");
    const searchStringInput = useRef("");
    const { data, loading, error } = useQuery<SearchUsersQuery>(SearchUsers, { variables: { query: textToQuery } });

    // mutateFunction({ variables: { query: textToQuery } })

    console.log("DATA FROM SEARCH", { data, error, loading })
    // const { t } = useTranslation();
    // const history = useHistory();

    // const name = ""

    useEffect(() => {
        // Add your init code
    }, [])

    // const action = () => { }
    // 
    const { register, handleSubmit, watch, formState: { errors } } = useForm<{}>();
    // const onSubmit: SubmitHandler<Inputs> = data => console.log("HEY ON SUBMIT!", data);

    // console.log(watch("name")) // watch input value by passing the name of it
    // console.log("errors", errors)
    // 
    return (

        <div className="resourceCard bg-purple-dark h-96 w-11/12 ml-3 mt-10 flex justify-between break-all md:break-normal mb-20">
            <div className="flex mt-3 ml-2 justify-between m-auto w-full">
                <div className="flex-1">
                    <input type="text" className="h-9 w-full bg-purple-light text-blue-light " value={textToQuery}
                        onChange={() => { }}
                    ></input>
                </div>
                <div className="flex mr-2 flex-1 justify-end">

                    <ActionButton action={() => { }} label="SearchUserTable"></ActionButton>
                </div>
            </div>

        </div>
    );
}

export default UsersTable;