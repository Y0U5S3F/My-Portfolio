import { Link } from "react-router-dom";
import {
    Box,
    List,
    ListItem,
    ListItemText,
} from "@mui/material"
import ListItemButton from "@mui/material/ListItemButton";

type NavbarElementProps = {
    links: { name: string; path: string }[];
    isActive: (path: string) => boolean;
    mode?: "desktop" | "mobile";
    onLinkClick?: () => void;
};

export const NavbarElement: React.FC<NavbarElementProps> = ({ links, isActive, mode = "desktop", onLinkClick }) => {
    if (mode === "mobile") {
        return (
            <List>
                {links.map((link) => (
                    <ListItem key={link.name} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={link.path}
                            onClick={() => onLinkClick && onLinkClick()}
                            selected={isActive(link.path)}
                        >
                            <ListItemText primary={link.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        );
    }

    return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {links.map((link) => (
                <Link
                    key={link.name}
                    to={link.path}
                    className="navbar-button"
                    style={{
                        fontWeight: isActive(link.path) ? "bold" : "normal",
                        borderBottom: isActive(link.path) ? "2px solid var(--main-default)" : "2px solid transparent",
                        whiteSpace: "nowrap", // prevent wrapping
                    }}
                >
                    {link.name}
                </Link>
            ))}
        </Box>
    );
};
