import useLogout from "../hooks/useLogout";

export default function LogoutButton({ collapsed, className }) {
  const doLogout = useLogout();

  return (
    <button
      type="button"
      onClick={doLogout}
      className={className}
      aria-label="Logout"
    >
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-gray-500" />
        {!collapsed && <span>Logout</span>}
      </div>
    </button>
  );
}
