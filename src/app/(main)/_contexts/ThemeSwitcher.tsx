import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeSwitcher({
  showLabel = false,
}: {
  showLabel?: boolean;
}) {
  const { SetNewTheme, Theme, ThemeList } = useContext(ThemeContext);
  return (
    <div>
      <div className="dropdown dropdown-left">
        {showLabel && <label htmlFor="theme-dropdown">Select the theme</label>}
        <div tabIndex={0} role="button" className="btn m-1">
          {Theme.charAt(0).toUpperCase() + Theme.slice(1)}
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl overflow-y-auto h-[80dvh]"
        >
          {ThemeList?.map((item: any) => (
            <li>
              <input
                type="radio"
                onClick={() => {
                  SetNewTheme(item);
                }}
                id="theme-dropdown"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={item.charAt(0).toUpperCase() + item.slice(1)}
                value={item}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
