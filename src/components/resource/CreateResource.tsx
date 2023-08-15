import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AllotrLogo from "../../assets/AllotrLogo";
import ActionButton from "../generic/ActionButton";
import DiscardButton from "../generic/DiscardButton";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    LocalRole,
    PublicUser,
    CreateResource as CreateResourceGQL,
    InputResource,
    CreateResourceMutation,
    OperationResult,
    User,
} from "allotr-graphql-schema-types";
import SearchUsersTable from "./SearchUsers/SearchUsersTable";
import { useMutation } from "@apollo/client";
import MiniActionButton from "../generic/MiniActionButton";
import Key from "../../assets/Key";
import { COLORS } from "../../consts/colors";
import TrashCan from "../../assets/TrashCan";
import { CURRENT_USER_DATA } from "../../consts/global_session_keys";
import { getSessionValue } from "../../utils/storage-utils";

type Inputs = {
    name: string;
    description?: string;
    maxActiveTickets: number;
    userList: Array<{ id: string; role: LocalRole }>;
};

function CreateResource() {
    const { t } = useTranslation();
    const history = useHistory();

    const { _id, username, name, surname } = getSessionValue<User>(CURRENT_USER_DATA);
    const [selectedUserList, setSelectedUserList] = useState<PublicUser[]>([{ id: _id, name, surname, username }]);
    const [selectedRoleMap, setSelectedRoleMap] = useState<Record<string, LocalRole>>({ [_id ?? ""]: LocalRole.ResourceAdmin });
    const [disabled, setDisabled] = useState(false);

    const [createResourceCall, { data, loading, error }] =
        useMutation<CreateResourceMutation>(CreateResourceGQL);

    const onSelectedUserListChanged = (userList: PublicUser[]) => {
        setSelectedUserList(userList);
    };


    // Scroll to top when first loading the screen
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    // Navigate to home once the resource is created
    useEffect(() => {
        if (
            !loading &&
            data?.createResource?.status === OperationResult.Ok &&
            !error
        ) {
            history.replace(`/viewResource/${data?.createResource?.newObjectId}`);
        }
        setDisabled(false);
    }, [loading, history, data, error]);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({ name, description, maxActiveTickets }) => {
        if (selectedUserList.length === 0) {
            return;
        }
        setDisabled(true);
        const resource: InputResource = {
            name,
            maxActiveTickets,
            description,
            userList: selectedUserList.map(({ id }) => ({
                id: id ?? "",
                role: selectedRoleMap[id ?? ""] ?? LocalRole.ResourceUser,
            })),
        };
        await createResourceCall({
            variables: { resource },
        });

    };


    const onDeletedUser = (user: PublicUser) => {
        const newSelectedUserList = selectedUserList.filter(({ id }) => id !== user.id);
        // Reset to default role if it were to be re-added later
        const newRoleMap = { ...selectedRoleMap, [user.id ?? ""]: LocalRole.ResourceUser };
        setSelectedRoleMap(newRoleMap)
        setSelectedUserList(newSelectedUserList);
    }

    const onRoleSwitched = (user: PublicUser) => {
        const newRole = selectedRoleMap?.[user.id ?? ""] === LocalRole.ResourceAdmin ? LocalRole.ResourceUser : LocalRole.ResourceAdmin
        const newRoleMap = { ...selectedRoleMap, [user.id ?? ""]: newRole };
        setSelectedRoleMap(newRoleMap)
    }

    return (
        <div className="bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            {/* Top bar with title */}
            <div className="flex fixed bg-purple w-screen h-12 justify-between z-10">
                <p className="text-yellow text-2xl m-auto">{t("CreateResource")}</p>
                <div className="absolute top-1 right-0 h-16 w-16">
                    <AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form md:pt-20 md:pl-8 pt-16 pl-2 break-words">
                    {/* Name */}
                    <label
                        htmlFor="name"
                        className="text-blue-light text-3xl text-left ml-3 m-auto block"
                    >{`${t("NameForm")}*`}</label>
                    <input
                        className="block mt-3  bg-purple-light text-yellow ml-3 pl-3 w-4/5"
                        {...register("name", { required: true, maxLength: 200 })}
                    />
                    {errors?.name && (
                        <span className="text-yellow text-left mt-1 mr-3 mb-5 ml-5 m-auto block">
                            {t("FieldRequired")}
                        </span>
                    )}

                    {/* Description */}
                    <label
                        htmlFor="description"
                        className="text-blue-light text-3xl text-left ml-3 m-auto block"
                    >
                        {t("DescriptionForm")}
                    </label>
                    <textarea
                        className="block mt-3 pt-1 mb-5 bg-purple-light text-yellow ml-3  pl-3 w-4/5 "
                        {...register("description", {
                            maxLength: 1000
                        })}
                    />

                    {/* Max Active tickets */}
                    <label
                        htmlFor="maxActiveTickets"
                        className="text-blue-light text-3xl text-left ml-3 m-auto block"
                    >{`${t("MaxUsersForm")}*`}</label>
                    <input
                        className="block mt-3  bg-purple-light text-yellow ml-3 h-10 pl-3 w-1/4"
                        type="number"
                        {...register("maxActiveTickets", {
                            min: 1,
                            max: 9999,
                            valueAsNumber: true,
                            required: true,
                        })}
                    />
                    {errors?.maxActiveTickets && (
                        <span className="text-yellow text-left mb-5 mr-3 mt-1 ml-5 m-auto block">
                            {t("InvalidNumberPositive")}
                        </span>
                    )}

                    {/* Search Users */}
                    <label
                        htmlFor="searchUserList"
                        className="text-blue-light text-3xl text-left ml-3 m-auto block"
                    >{`${t("SearchUsersForm")}*`}</label>
                    <div className="mt-3 ml-2">
                        <SearchUsersTable
                            selectedUserList={selectedUserList}
                            onSelectedUserListChanged={onSelectedUserListChanged}
                        />
                    </div>

                    {/* View added users */}
                    <label
                        htmlFor="userList"
                        className="text-yellow text-3xl text-left ml-3 mt-2 m-auto block"
                    >{`${t("UsersForm")}`}</label>
                    <div className="mt-3 ml-2 pb-5">
                        {selectedUserList.map(user => (
                            <div className="mb-2 flex h-14 justify-between w-11/12" key={user.id}>
                                {/* User data */}
                                <p className="text-yellow block text-left pt-4 pl-3">{user.name} {user.surname} - {user.username}</p>
                                {/* Admin button */}
                                <div className="flex justify-items-end">
                                    <div className="">
                                        <MiniActionButton
                                            action={() => onRoleSwitched(user)}
                                            logo={Key}
                                            fill={selectedRoleMap[user.id ?? ""] === LocalRole.ResourceAdmin ? COLORS.yellow.DEFAULT : COLORS.blue.light}
                                            type="button" />
                                    </div>
                                    {/* Separation line */}
                                    <div className="w-2"></div>
                                    {/* Delete button */}
                                    <div className="">
                                        <MiniActionButton
                                            action={() => onDeletedUser(user)}
                                            logo={TrashCan}
                                            fill={COLORS.blue.light}
                                            type="button" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedUserList.length === 0 && (
                        <span className="text-yellow text-left mb-5 mr-3 mt-1 ml-5 m-auto block">
                            {t("AddAUserError")}
                        </span>
                    )}
                    {/* Bottom spacing */}
                    <div className="mb-20"></div>
                </div>

                {/* Action Buttons */}
                <div className="buttonBar  flex justify-around pb-6">
                    <div className=" flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                        <DiscardButton action={() => history.goBack()} label="Cancel" />
                    </div>
                    <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                        <ActionButton
                            type="submit"
                            disabled={disabled}
                            action={() => handleSubmit(onSubmit)}
                            label="CreateResourceButton"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateResource;
