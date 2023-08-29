import React, { useEffect, useState, useRef } from "react";
import { AcquireResource, AcquireResourceMutation, AcquireResourceMutationVariables, CancelResourceAcquire, CancelResourceAcquireMutation, CancelResourceAcquireMutationVariables, OperationResult, ResourceNotification } from "allotr-graphql-schema-types";
import { useTranslation } from "react-i18next";
import Popup from 'reactjs-popup';
import './NotificationDialog.css';
import ActionButton from "../generic/ActionButton/ActionButton";
import DiscardButton from "../generic/DiscardButton";
import { useMutation } from "@apollo/client";
import ClosedLock from "../../assets/ClosedLock";
import { COLORS } from "../../consts/colors";

function NotificationDialog({ data: props }: { data: ResourceNotification[] }) {
  const listReference = useRef(props);
  const [listState, setListState] = useState(props ?? [])
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const closeModal = () => {
    setOpen(false);
    listReference.current = listReference.current.slice(0, -1);
    setListState(listReference.current ?? []);
    if (listReference?.current.length > 0) {
      setTimeout(() => setOpen(true), 100);
    }

  }


  const [callAqquireResource] = useMutation<AcquireResourceMutation, AcquireResourceMutationVariables>(AcquireResource)
  const [callCancelAcquireResource] = useMutation<CancelResourceAcquireMutation, CancelResourceAcquireMutationVariables>(CancelResourceAcquire)

  useEffect(() => {
    setListState(props ?? []);
    const myNewList: ResourceNotification[] = listReference.current;
    props?.forEach(prop => addNewValue(prop))
    function addNewValue(localValue: ResourceNotification) {
      if (localValue == null || listReference.current.findIndex(({ id }) => localValue.id === id) !== -1) {
        return;
      }
      myNewList.push(localValue);
      setOpen(true)
      listReference.current = myNewList;
    }
  }, [props])


  const acquireResource = async (resourceId: string) => {
    const { data, errors } = await callAqquireResource({ variables: { resourceId } });
    if (
      data?.acquireResource?.status === OperationResult.Ok &&
      !errors
    ) {
      // add your happy path management
      closeModal()
    }

  }

  const cancelAcquireResource = async (resourceId: string) => {
    const { data, errors } = await callCancelAcquireResource({ variables: { resourceId } });
    if (
      data?.cancelResourceAcquire?.status === OperationResult.Ok &&
      !errors
    ) {
      // add your happy path management
      closeModal()
    }
  }

  return (
    <div>
      <ul>
        {listState.map((item) => (
          <Popup open={open} onClose={() => { }} closeOnDocumentClick={false} closeOnEscape={false} position="right center">
            {/* Title */}
            <p className="text-yellow text-4xl font-bold m-auto text-center">{t("ItsYourTurnTitle")}</p>
            <div className="pt-10"></div>
            <p className="text-yellow text-2xl font-bold m-auto italic text-center">"{item.resource?.name}" {<p className="text-blue-light text-1xl font-bold not-italic">{t("From")} {item.resource?.createdBy?.username}</p>}
              <p className="text-blue-light text-2xl font-bold m-auto text-center not-italic">{t("ItsYourTurnSubtitle")}</p>
            </p>
            <div className="pt-10"></div>
            <p className="text-blue text-3xl font-bold m-auto text-center">{t("DoYouWantToUseResourceQuestion")}</p>
            <div className="pt-3"></div>
            <p className="text-blue text-xl font-bold m-auto text-center">{t("CancelResourceAquireWarning")}</p>

            <div className="flex justify-around pb-4 pt-4">
              <div className=" flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                <DiscardButton action={() => cancelAcquireResource(item?.resource?.id ?? "")} label="No" />
              </div>
              <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                <ActionButton action={() => acquireResource(item?.resource?.id ?? "")} logo={ClosedLock} fill={COLORS.blue.light} label="Sí"></ActionButton>
              </div>
            </div>
          </Popup>
        ))}
      </ul>
    </div>
  );
}

export default NotificationDialog;