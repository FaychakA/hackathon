import React, { useEffect, useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

const ChangeLangDropDown = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState('EN');
  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  return (
    <DropdownButton id="dropdown-item-button" align="end" title={currentLang?.toUpperCase()}>
      {currentLang !== 'ru' && <Dropdown.Item onClick={() => handleLanguage('ru')} as="button">RU</Dropdown.Item>}
      {currentLang !== 'en' && <Dropdown.Item onClick={() => handleLanguage('en')} as="button">EN</Dropdown.Item>}
    </DropdownButton>
  );
};

export default ChangeLangDropDown;
