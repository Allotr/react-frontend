import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import GoogleButton from 'react-google-button'
import AllotrLogo from "../../assets/AllotrLogo";

function Login(props: { value: string }) {
  const { t } = useTranslation();
  useEffect(() => {
    // Add your init code
  }, [])

  return (
    <div className="login bg-blue-dark w-screen h-screen flex-cols items-center">
      <div className="flex justify-center md:pt-40 pt-20">
        <AllotrLogo width="200" height="200" ></AllotrLogo>
      </div>
      <p className="text-yellow text-center text-7xl">{t('Allotr')}</p>
      <p className="text-yellow text-center text-4xl pt-5">{t('AllotrLemma')}</p>

      <div className="flex justify-center pt-10 md:pt-15 ">
        <GoogleButton
          className="flex items-center"
          label={t('LoginWithGoogle')}
          onClick={() => { console.log('Google button clicked') }}
        />
      </div>
    </div>
  );
}

export default Login;