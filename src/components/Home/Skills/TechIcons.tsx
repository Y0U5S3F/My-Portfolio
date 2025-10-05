// src/components/TechIcons.tsx
import {
  FaReact,
  FaAngular,
  FaGitAlt,
  FaLinux,
  FaDocker,
  FaPhp,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiTensorflow,
} from "react-icons/si";

export const TECH_ICONS = [
  { label: "React", Icon: FaReact },
  { label: "Angular", Icon: FaAngular },
  { label: "Django", Icon: SiDjango },
  { label: "Spring Boot", Icon: SiSpringboot },
  { label: "PHP", Icon: FaPhp },
  { label: "PostgreSQL", Icon: SiPostgresql },
  { label: "MySQL", Icon: SiMysql },
  { label: "Linux", Icon: FaLinux },
  { label: "Git", Icon: FaGitAlt },
  { label: "Docker", Icon: FaDocker },
  { label: "TensorFlow", Icon: SiTensorflow },
];
