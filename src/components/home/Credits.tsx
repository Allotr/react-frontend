import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function Credits() {
  const { t } = useTranslation();

  useEffect(() => {
    // Add your init code
  }, [])

  return (

    <div className="creditsflex-cols items-center pb-3">
        <p className="text-blue-light text-center text-sm">{t("Credits")}-{new Date().getFullYear()}</p>
    </div>
  );
}

export default Credits;