import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AllotrLogo from "../../assets/AllotrLogo";
import ActionButton from "../generic/ActionButton/ActionButton";
import DiscardButton from "../generic/DiscardButton";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    LocalRole,
    PublicUser,
    UpdateResource,
    InputResource,
    UpdateResourceMutation,
    OperationResult,
    ViewResourceQuery,
    ViewResource,
    ResourceView,
    TicketStatusCode
} from "allotr-graphql-schema-types";
import SearchUsersTable from "./SearchUsers/SearchUsersTable";
import { useMutation, useQuery } from "@apollo/client";
import MiniActionButton from "../generic/MiniActionButton";
import Key from "../../assets/Key";
import { COLORS } from "../../consts/colors";
import TrashCan from "../../assets/TrashCan";

type Inputs = {
    name: string;
    description?: string;
    maxActiveTickets: number;
    userList: Array<{ id: string; role: LocalRole }>;
};

function EditResource() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // GraphQL data queries/mutations
    const { data: queryData, loading: queryLoading, error: queryError } = useQuery<ViewResourceQuery>(ViewResource, { variables: { resourceId: id } })
    
    const [viewResource, setViewResource] = useState<ResourceView>(!queryLoading ? queryData?.viewResource as ResourceView ?? {} as ResourceView : {} as ResourceView);
    const [selectedUserList, setSelectedUserList] = useState<PublicUser[]>([]);
    const [selectedRoleMap, setSelectedRoleMap] = useState<Record<string, { role: LocalRole, isActive: boolean }>>({});
    const [disabled, setDisabled] = useState(false);

    const checkKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    const [createResourceCall, {
        data: mutationData,
        loading: mutationLoading,
        error: mutationError
    }] = useMutation<UpdateResourceMutation>(UpdateResource);

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
            !mutationLoading &&
            mutationData?.updateResource?.status === OperationResult.Ok &&
            !mutationError
        ) {
            navigate(-1);
        }
        setDisabled(false);
    }, [mutationLoading, navigate, mutationData, mutationError, id]);

    // Load initial users and roles
    useEffect(() => {
        if (queryLoading || queryError) {
            return;
        }
        const viewResource = !queryLoading ? queryData?.viewResource as ResourceView ?? {} as ResourceView : {} as ResourceView
        const newSelectedUserList = viewResource.tickets.map(({ user }) => ({
            id: user.userId ?? "",
            name: user.name,
            surname: user.surname,
            username: user.username
        }));
        const newSelectedRoleMap = Object
            .fromEntries(
                viewResource.tickets
                    .map(({ user, lastStatus }) =>
                        [
                            user.userId ?? "",
                            {
                                role: user.role,
                                isActive: lastStatus.statusCode === TicketStatusCode.Active
                            }
                        ]
                    )
            );
        setSelectedUserList(newSelectedUserList);
        setViewResource(viewResource);
        setSelectedRoleMap(newSelectedRoleMap);
    }, [queryData, queryLoading, queryError])

    // Form validation
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = ({ name, description, maxActiveTickets }) => {
        // If there is no admin
        if (selectedUserList.filter(({ id }) => selectedRoleMap[id ?? ""]?.role === LocalRole.ResourceAdmin).length === 0) {
            return;
        }
        setDisabled(true);
        const resource: InputResource = {
            id,
            name,
            maxActiveTickets,
            description,
            userList: selectedUserList.map(({ id }) => ({
                id: id ?? "",
                role: selectedRoleMap[id ?? ""]?.role ?? LocalRole.ResourceUser,
            })),
        };
        return createResourceCall({
            variables: { resource },
        });

    };


    const onDeletedUser = (user: PublicUser) => {
        const newSelectedUserList = selectedUserList.filter(({ id }) => id !== user.id);
        // Reset to default role if it were to be re-added later
        const newRoleMap = { ...selectedRoleMap, [user.id ?? ""]: { role: LocalRole.ResourceUser, isActive: false } };
        setSelectedRoleMap(newRoleMap)
        setSelectedUserList(newSelectedUserList);
    }

    const onRoleSwitched = (user: PublicUser) => {
        const newRole = selectedRoleMap?.[user.id ?? ""]?.role === LocalRole.ResourceAdmin ? LocalRole.ResourceUser : LocalRole.ResourceAdmin
        const newRoleMap = { ...selectedRoleMap, [user.id ?? ""]: { role: newRole, isActive: selectedRoleMap[user.id ?? ""]?.isActive || false } };
        setSelectedRoleMap(newRoleMap)
    }

    return (
        <div className="bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            {/* Top bar with title */}
            <div className="flex fixed bg-purple w-screen h-12 justify-between z-10">
                <p className="text-yellow text-2xl m-auto">{t("EditResource")}</p>
                <div className="absolute top-1 right-0 h-16 w-16">
                    <AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form md:pt-20 md:pl-8 pt-16 pl-2 break-words">
                    {/* Name */}
                    <label
                        htmlFor="editresource-form-name"
                        className="text-blue-light text-3xl text-left ml-3 m-auto block"
                    >{`${t("NameForm")}*`}</label>
                    <input
                        className="block mt-3  bg-purple-light text-yellow ml-3 pl-3 w-4/5"
                        id="editresource-form-name"
                        autoComplete="off"
                        onKeyDown={(e) => checkKeyDown(e)}
                        {...(viewResource.name ? register("name", { required: true, maxLength: 200 }) : null)}
                        defaultValue={viewResource.name}
                    />
                    {errors?.name && (
                        <span className="text-yellow text-left mt-1 mr-3 mb-5 ml-5 m-auto block">
                            {t("FieldRequiredMaxLength200")}
                        </span>
                    )}

                    {/* Description */}
                    <label
                        htmlFor="editresource-form-description"
                        className="text-blue-light text-3xl text-left ml-3 m-auto block"
                    >
                        {t("DescriptionForm")}
                    </label>
                    <textarea
                        className="block mt-3 pt-1 mb-5 bg-purple-light text-yellow ml-3  pl-3 w-4/5 "
                        id="editresource-form-description"
                        {...(viewResource.description != null ? register("description", { maxLength: 1000 }) : null)}
                        defaultValue={viewResource.description ?? ""}
                    />
                    {errors?.description && (
                        <span className="text-yellow text-left mt-1 mr-3 mb-5 ml-5 m-auto block">
                            {t("TextTooLong")}
                        </span>
                    )}

                    {/* Max Active tickets */}
                    <label
                        htmlFor="editresource-form-maxActiveTickets"
                        className="text-blue-light text-3xl text-left ml-3 m-auto block"
                    >{`${t("MaxUsersForm")}*`}</label>
                    <input
                        className="block mt-3  bg-purple-light text-yellow ml-3 h-10 pl-3 w-1/4"
                        type="number"
                        onKeyDown={(e) => checkKeyDown(e)}
                        id="editresource-form-maxActiveTickets"
                        {...(viewResource.maxActiveTickets != null ? register("maxActiveTickets", {
                            min: 1,
                            max: 9999,
                            valueAsNumber: true,
                            required: true,
                        }) : null)}
                        defaultValue={viewResource.maxActiveTickets}
                    />
                    {errors?.maxActiveTickets && (
                        <span className="text-yellow text-left mb-5 mr-3 mt-1 ml-5 m-auto block">
                            {t("InvalidNumberPositive")}
                        </span>
                    )}
                    {!isNaN(watch("maxActiveTickets")) && (watch("maxActiveTickets") ?? viewResource.maxActiveTickets) !== viewResource.maxActiveTickets ? (
                        <span className="text-yellow text-left mb-5 mr-3 mt-1 ml-5 m-auto block">
                            {t("ActiveTicketLimitChangeWarning")}
                        </span>
                    ) : null}

                    {/* Search Users */}
                    <p className="text-blue-light text-3xl text-left ml-3 m-auto block">
                        {`${t("SearchUsersForm")}*`}
                    </p>
                    <div className="mt-3 ml-2">
                        <SearchUsersTable
                            selectedUserList={selectedUserList}
                            onSelectedUserListChanged={onSelectedUserListChanged}
                        />
                    </div>

                    {/* View added users */}
                    <p className="text-yellow text-3xl text-left ml-3 mt-2 m-auto block" >
                        {`${t("UsersForm")}`}
                    </p>
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
                                            fill={selectedRoleMap[user.id ?? ""]?.role === LocalRole.ResourceAdmin ? COLORS.yellow.DEFAULT : COLORS.blue.light}
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
                    {selectedUserList.filter(({ id }) => selectedRoleMap[id ?? ""]?.role === LocalRole.ResourceAdmin).length === 0 && (
                        <span className="text-yellow text-left mb-5 mr-3 mt-1 ml-5 m-auto block">
                            {t("AddAnAdminError")}
                        </span>
                    )}
                    {/* Bottom spacing */}
                    <div className="mb-20"></div>
                </div>

                {/* Action Buttons */}
                <div className="buttonBar  flex justify-around pb-6">
                    <div className=" flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                        <DiscardButton action={() => navigate(-1)} label="Cancel" />
                    </div>
                    <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                        <ActionButton
                            type="submit"
                            disabled={disabled}
                            action={() => handleSubmit(onSubmit)}
                            label="UpdateResourceButton"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditResource;
