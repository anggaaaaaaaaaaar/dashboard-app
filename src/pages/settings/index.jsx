/* eslint-disable no-unused-vars */
import { Select, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setDark } from "../../store/settings";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Index = () => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useLocalStorage("darkMode");

  const dispatch = useDispatch();

  const onChangeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  const onChangeDarkMode = (value) => {
    setDarkMode(value);
    dispatch(setDark(value));
  };
  return (
    <div className="bg-white dark:bg-dark h-full border rounded p-5 space-y-5">
      <div className="flex justify-between lg:max-w-[50%]">
        <Typography.Paragraph>{t("settings.language")}</Typography.Paragraph>
        <Select
          className="w-40"
          defaultValue={i18n.language}
          onChange={onChangeLanguage}
          options={[
            { value: "en", label: "English" },
            { value: "id", label: "Indonesia" },
          ]}
        />
      </div>
      <div className="flex justify-between lg:max-w-[50%]">
        <Typography.Paragraph>{t("settings.darkMode")}</Typography.Paragraph>
        <Select
          className="w-40"
          defaultValue={darkMode}
          onChange={onChangeDarkMode}
          options={[
            { value: true, label: t("general.on") },
            { value: false, label: t("general.off") },
          ]}
        />
      </div>
    </div>
  );
};

export default Index;
