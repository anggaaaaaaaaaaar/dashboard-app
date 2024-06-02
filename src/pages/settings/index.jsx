import { Select, Typography } from "antd";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t, i18n } = useTranslation();

  const onChangeLanguage = (value) => {
    i18n.changeLanguage(value);
  };
  return (
    <div className="bg-white h-full border rounded p-5 grid grid-cols-2">
      <div className="flex justify-between">
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
    </div>
  );
};

export default Index;
