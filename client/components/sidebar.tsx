import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen bg-[#fdfaf6] text-[#4a3f35] overflow-hidden">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#5D688A] p-6 shadow-lg overflow-hidden">
        <h1 className="text-2xl font-bold mb-8 text-center text-[#DDF4E7]">
          TODO LIST
        </h1>

        <nav className="space-y-4 text-white">
          {siteConfig.sideBarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white hover:text-[#26667F]"
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
