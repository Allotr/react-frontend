import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllotrLogo from "../../assets/AllotrLogo";
import BurgerMenu from "./BurgerMenu";
import ResourceCard from "./ResourceCard";
import AddButton from "./AddButton";
import Credits from "./Credits";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MyResourcesQuery, MyResources } from "allotr-graphql-schema-types";

function Home() {
  const { data, error, loading } = useQuery<MyResourcesQuery>(MyResources);

  console.log({ data, error, loading })
  const { t } = useTranslation();
  const history = useHistory();
  const resourceList = data?.myResources
  useEffect(() => {
    // Add your init code


  }, [])

  return (
    <div className="login bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
      <BurgerMenu></BurgerMenu>
      <div className="flex fixed bg-purple w-screen h-12 justify-between z-10" >
        <p className="text-yellow text-2xl m-auto">{t('YourResources')}</p>
        <div className="absolute top-1 right-0 h-16 w-16">
          <AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
        </div>
      </div>
      <div>
        <AddButton action={() => history.push("/createResource")}></AddButton>
      </div>
      <div className="pt-20"></div>
      {!loading && resourceList != null ? resourceList.map((resource, index) =>
        <ResourceCard key={index} {...resource} />) : null}
      <div className="pb-52"></div>
      <Credits></Credits>
    </div>
  );
}

export default Home;