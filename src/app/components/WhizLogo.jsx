import useSettings from "app/hooks/useSettings";
import logo from "../../assets/img/whiz_logo.png";
import compactLogo from "../../assets/img/winitiativelogo-white.png";

export default function WhizLogo({ mode }) {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  // const logoSrc = mode === "compact" ? compactLogo : logo;
  const logoSrc = logo;
  return (
    <>
      <img
        src={logoSrc}
        alt="Winsights Logo"
        className="mb-2 img-fluid"
        style={{ maxWidth: "60px", paddingRight: "10px" }}
      />
    </>
  );
}
