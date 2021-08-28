import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllotrLogo from "../../assets/AllotrLogo";
import BurgerMenu from "./BurgerMenu";
import ResourceCard from "./ResourceCard";
import { TicketStatusCode } from "allotr-graphql-schema-types"

function Home() {
  const { t } = useTranslation();
  const resourceList: { status: TicketStatusCode, name: string, description: string, lastUpdateDate: Date, currentUsers: number, maxUsers: number }[] = [
    { currentUsers: 12, maxUsers: 69, status: TicketStatusCode.Active, name: "Netflix", description: "Una cuenta con los amigos", lastUpdateDate: new Date() },
    { currentUsers: 55, maxUsers: 69, status: TicketStatusCode.AwaitingConfirmation, name: "HBO", description: "Con otros colegas", lastUpdateDate: new Date() },
    { currentUsers: 12, maxUsers: 13, status: TicketStatusCode.Inactive, name: "Sala 132", description: "Sala compartida", lastUpdateDate: new Date() },
    { currentUsers: 1, maxUsers: 2, status: TicketStatusCode.Initialized, name: "Steam", description: "Pa los videojogos", lastUpdateDate: new Date() },
    { currentUsers: 33, maxUsers: 33, status: TicketStatusCode.Queued, name: "Título con nombre muy largo aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", description: "Super largo también la descripción. Te voy a meter un ladrillaco de Lorem Ipsum que flipas en colores. Lorem fistrum benemeritaar jarl ese hombree se calle ustée. Mamaar mamaar torpedo está la cosa muy malar la caidita no puedor está la cosa muy malar jarl. Apetecan pecador condemor mamaar sexuarl no te digo trigo por no llamarte Rodrigor pecador. Al ataquerl ese hombree sexuarl a peich no puedor benemeritaar sexuarl ahorarr a gramenawer pupita apetecan. Va usté muy cargadoo qué dise usteer va usté muy cargadoo está la cosa muy malar se calle ustée no puedor a wan mamaar caballo blanco caballo negroorl. Te va a hasé pupitaa me cago en tus muelas me cago en tus muelas te va a hasé pupitaa va usté muy cargadoo por la gloria de mi madre está la cosa muy malar la caidita papaar papaar ahorarr. Benemeritaar amatomaa no puedor al ataquerl papaar papaar. Por la gloria de mi madre diodeno ese pedazo de torpedo qué dise usteer. Qué dise usteer por la gloria de mi madre amatomaa caballo blanco caballo negroorl apetecan se calle ustée papaar papaar diodenoo no te digo trigo por no llamarte Rodrigor.", lastUpdateDate: new Date() },
    { currentUsers: 5, maxUsers: 999, status: TicketStatusCode.Requesting, name: "Ventilador", description: "Ventiladoristo para el calorsito del veranito", lastUpdateDate: new Date() },
    { currentUsers: 9000, maxUsers: 99999, status: TicketStatusCode.Revoked, name: "Algo más, no sé", description: "Pues compartimos algo", lastUpdateDate: new Date() }
  ]
  useEffect(() => {
    // Add your init code
  }, [])

  return (
    <div className="login bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
      <BurgerMenu></BurgerMenu>
      <div className="flex fixed bg-purple w-screen h-12 justify-between" >
        <p className="text-yellow text-2xl m-auto">{t('YourResources')}</p>
        <div className="absolute top-1 right-0 h-16 w-16"><AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
        </div>
      </div>
      <div className="pt-20"></div>
      {resourceList.map(({ currentUsers, maxUsers, status, name, description, lastUpdateDate }, index) =>
        <ResourceCard
          key={index}
          status={status}
          name={name}
          description={description}
          lastUpdateDate={lastUpdateDate}
          currentUsers={currentUsers}
          maxUsers={maxUsers} />)}
    </div>
  );
}

export default Home;