import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BuildingOfficeIcon,
  Squares2X2Icon,
  BookOpenIcon,
  CheckCircleIcon,
  WalletIcon,
  UserGroupIcon,
  TableCellsIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo-boaz.svg";

// ------------------------------------------------------------
// Navigation item type definition
// ------------------------------------------------------------
interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
  separator?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Accueil",
    icon: <HomeIcon className="size-icon" strokeWidth={2.5} />,
    path: "/",
  },
  { separator: true, label: "", icon: null },
  {
    label: "Mon agence",
    icon: <BuildingOfficeIcon className="size-icon" strokeWidth={2.5}/>,
    children: [
      { label: "Informations", path: "/agence/informations" },
      { label: "Équipe", path: "/agence/equipe" },
    ],
  },
  { separator: true, label: "", icon: null },
  {
    label: "Services",
    icon: <Squares2X2Icon className="size-icon" strokeWidth={2.5}/>,
    path: "/services",
  },
  { separator: true, label: "", icon: null },
  {
    label: "Mes souscriptions",
    icon: <BookOpenIcon className="size-icon" strokeWidth={2.5}/>,
    children: [
      { label: "Services", path: "/souscriptions/services" },
      { label: "Financement", path: "/souscriptions/financement" },
      { label: "Remboursements", path: "/souscriptions/remboursements" },
    ],
  },
  { separator: true, label: "", icon: null },
  {
    label: "Preuves de versement",
    icon: <CheckCircleIcon className="size-icon" strokeWidth={2.5}/>,
    path: "/preuves",
  },
  { separator: true, label: "", icon: null },
  {
    label: "Mon Wallet Boaz",
    icon: <WalletIcon className="size-icon" strokeWidth={2.5}/>,
    children: [{ label: "Mes historiques", path: "/wallet/historiques" }],
  },
  { separator: true, label: "", icon: null },
  {
    label: "Programme d'affiliation",
    icon: <UserGroupIcon className="size-icon" strokeWidth={2.5}/>,
    path: "/affiliation",
  },
];

const GENERAL_ITEMS: NavItem[] = [
  {
    label: "Tickets",
    icon: <DocumentTextIcon className="size-icon" strokeWidth={2.5}/>,
    path: "/tickets",
  },
  {
    label: "Documents",
    icon: <BookOpenIcon className="size-icon" strokeWidth={2.5}/>,
    path: "/documents",
  },
  {
    label: "Notifications",
    icon: <BellIcon className="size-icon" strokeWidth={2.5}/>,
    path: "/notifications",
  },
  {
    label: "Tableau de bord",
    icon: <TableCellsIcon className="size-icon" strokeWidth={2.5}/>,
    path: "/dashboard",
  },
];
// ------------------------------------------------------------
// Sidebar component
// ------------------------------------------------------------
export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Track which dropdown menus are open
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  function toggleMenu(label: string) {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  function isActive(path?: string) {
    if (!path) return false;
    return location.pathname === path;
  }

  return (
    <aside className="w-70 min-h-screen bg-surface border border-border rounded-3xl  flex flex-col py-6 px-3 shrink-0">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center px-3 mb-16">
        <img src={logo} alt="BOAZ-STUDY" className="h-10" />
      </div>

      {/* Main navigation */}
      <nav className="flex-1 space-y-0.5">
        {NAV_ITEMS.map((item, index) => {
          // Separator line
          if (item.separator) {
            return (
              <hr
                key={index}
                className="border-[1.3px] border-border my-3 mx-2"
              />
            );
          }

          if (item.children) {
            const isOpen = openMenus[item.label] ?? false;
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="nav-item w-full justify-between"
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  {isOpen ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>

                {/* Dropdown children */}
                {isOpen && (
                  <div className="ml-7 mt-0.5 space-y-0.5">
                    {item.children.map((child) => (
                      <button
                        key={child.path}
                        onClick={() => navigate(child.path)}
                        className={`
                          w-full text-left px-3 py-2 text-[16px] rounded-lg
                          transition-colors duration-200
                          ${
                            isActive(child.path)
                              ? "text-primary font-semibold"
                              : "text-foreground hover:text-primary"
                          }
                        `}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Simple item
          return (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`
                nav-item w-full
                ${isActive(item.path) ? "nav-item-active" : ""}
              `}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}

        {/* GENERAL section */}
        <div className="pt-4">
          <div className="flex items-center gap-2 px-3 mb-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              General
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {GENERAL_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`
                nav-item w-full
                ${isActive(item.path) ? "nav-item-active" : ""}
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Settings — fixed at bottom, centered, primary color */}
      <div className="mt-6 pt-4 border-t border-border flex justify-center">
        <button
          onClick={() => navigate("/settings")}
          className={`
      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
      transition-colors duration-200
      ${
        isActive("/settings")
          ? "text-primary bg-primary/10"
          : "text-primary hover:bg-primary/10"
      }
    `}
        >
          <Cog6ToothIcon className="size-icon" strokeWidth={2.5}/>
          Paramètres
        </button>
      </div>
    </aside>
  );
}
