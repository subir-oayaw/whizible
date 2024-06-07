import useSettings from "app/hooks/useSettings";
import logo from "../../assets/Images/winitiative-logo.svg";
export default function WhizLogo({ className }) {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <>
      <img
        src={logo}
        alt="Winsights Logo"
        className="mb-2 img-fluid"
        style={{ maxWidth: "150px", paddingRight: "10px" }}
      />
    </>
  );
}
