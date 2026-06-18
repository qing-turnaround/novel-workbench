import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "仪表板" },
  { to: "/chapters", label: "章节阅读" },
  { to: "/characters", label: "角色图谱" },
  { to: "/foreshadowing", label: "伏笔追踪" },
  { to: "/worldbuilding", label: "世界观" },
  { to: "/quality", label: "质量审计" },
  { to: "/stats", label: "写作统计" },
];

export default function Sidebar() {
  return (
    <nav className="w-52 shrink-0 border-r border-gray-800 bg-gray-900 p-4">
      <h1 className="mb-6 text-lg font-bold text-white">Novel Workbench</h1>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
