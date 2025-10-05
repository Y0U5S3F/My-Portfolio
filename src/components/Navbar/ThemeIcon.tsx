import {
  IconButton,
} from "@mui/material";

import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";

type ThemeIconProps = {
  isDark: boolean;
  toggleTheme: () => void;
  size?: "small" | "medium" | "large";
  sx?: any;
};

export const ThemeIcon: React.FC<ThemeIconProps> = ({ isDark, toggleTheme, size = "large", sx }) => {
  const iconColor = isDark ? "var(--nav-icon-dark, #fff)" : "var(--nav-icon-light, #111)";

  return (
    <IconButton
      onClick={toggleTheme}
      aria-label="toggle theme"
      size={size}
      // remove ripple and focus ripple, and prevent hover background
      disableRipple
      disableFocusRipple
      sx={{
        color: iconColor,
        // prevent the default hover background circle
        "&:hover": { backgroundColor: "transparent" },
        ...sx,
      }}
    >
      {isDark ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
};
