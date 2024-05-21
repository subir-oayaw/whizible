import useSettings from "app/hooks/useSettings";

export default function MatxLogo({ className }) {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return <></>;
}
