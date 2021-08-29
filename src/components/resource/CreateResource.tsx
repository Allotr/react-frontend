import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllotrLogo from "../../assets/AllotrLogo";
import ActionButton from "../generic/ActionButton";
import DiscardButton from "../generic/DiscardButton";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { LocalRole } from "allotr-graphql-schema-types"
import UsersTable from "./UsersTable";

type Inputs = {
    name: string,
    description?: string,
    maxActiveTickets: number,
    userList: Array<{ id: string, role: LocalRole }>
};

function CreateResource() {
    const { t } = useTranslation();
    const history = useHistory();

    // const name = ""

    useEffect(() => {
        // Add your init code
    }, [])

    const action = () => { }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log("HEY ON SUBMIT!", data);

    console.log(watch("name")) // watch input value by passing the name of it
    console.log("errors", errors)

    return (

        <div className="login bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            <div className="flex fixed bg-purple w-screen h-12 justify-between" >
                <p className="text-yellow text-2xl m-auto">{t('CreateResource')}</p>
                <div className="absolute top-1 right-0 h-16 w-16"><AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form md:pt-20 md:pl-8 pt-16 pl-2">

                    {/* {errors?.name?.type === "maxLength" && <span className="text-yellow">This field is too long</span>} */}

                    <label className="text-blue-light text-3xl text-left ml-3 m-auto block">{`${t("NameForm")}*`}</label>
                    <input className="block mt-3 mb-5 bg-purple-light text-blue-light ml-3 w-4/5" {...register("name", { required: true, maxLength: 200 })} />
                    <label className="text-blue-light text-3xl text-left ml-3 m-auto block">{t("DescriptionForm")}</label>
                    <textarea className="block mt-3 mb-5 bg-purple-light text-blue-light ml-3 w-4/5"{...register("description")} />
                    <label className="text-blue-light text-3xl text-left ml-3 m-auto block">{`${t("MaxUsersForm")}*`}</label>
                    <input className="block mt-3 mb-5 bg-purple-light text-blue-light ml-3 h-10 w-1/4" type="number" {...register("maxActiveTickets", { min: 1, max: 9999 })} />
                    <label className="text-blue-light text-3xl text-left ml-3 m-auto block">{`${t("UsersForm")}*`}</label>
                    <UsersTable></UsersTable>
                </div>
                <div className="buttonBar  flex justify-around pb-6">
                    <div className=" flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                        <DiscardButton action={() => history.push("/")} label="Cancel" ></DiscardButton>
                    </div>
                    <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                        <ActionButton action={action} label="CreateResourceButton"  ></ActionButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateResource;