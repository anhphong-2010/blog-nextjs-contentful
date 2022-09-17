import gstyles from "../../gstyles/index";
import { useTheme } from "next-themes";
import React from "react";
import Link from "next/link";

const Header = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme("light");

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <div className="cursor-pointer" onClick={() => setTheme("light")}>
          {gstyles.icons({
            name: "star",
            size: 24,
            fill: "#ffffff",
          })}
        </div>
      );
    } else {
      return (
        <div className="cursor-pointer" onClick={() => setTheme("dark")}>
          {gstyles.icons({
            name: "star",
            size: 24,
            fill: "#000000",
          })}
        </div>
      );
    }
  };

  return (
    <header className="h-15 dark:border-gray-700">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="cursor-pointer">
            <Link href={"https://github.com/anhphong-2010"}>
              {gstyles.icons({
                name: "github",
                size: 20,
                fill: theme !== "light" ? "#ffffff" : "#000000",
              })}
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link href={"/"}>
            <div className="cursor-pointer text-base font-bold">Home</div>
          </Link>
          {theme !== "light" ? (
            <img
              style={{ filter: "invert(1)" }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAEyUlEQVRYhc3YSYxVVRAG4K8VozI0iAunREVocEQElcBCNBghRo2gCQsWzgs3akhMcFg5z2GhxoWaGFGjLIySOIEEHFFJlAacN6K2Iw44gGgaF1U3777re93vPd+CP7npflX3VP3nnjpVdQ57OHq6YGMcJuNwjE7Z79iKT/FLF3y0jRm4D5sxiN1NnkFswj2Y3omjdr5gD87H9Tg5CWzCuiT6BX7Nd8fiSByH03F8jn8Xt+L5TsgOhclYk6R+xE04qo3xE3EztqWNVZjULXKL8Rt2JrHRQ78+JEbjlrS1HYv+L7kbRBxtEcvVLZyAD9P20k6N3CiWYw16u8OrDqPxUvpom+RiMbtV2LckP0zEU6eYmDYK7ItX01fLyz1ZxNwW9fHWh6/zmdIBuSml8eVJ9uIjkQGGnXyPWNKd6mNuH/Tjn9S1S7IgtzNtbEybBU7AX3hlOEMLREzcVJFfnvKrMB870uFcLMEKkeM+y+fdlC3Jd77OMfNxddq6rOLj1pSfMxTB90SeG1WRr8aA2qwLkkXF+F18lXX59Kes0BfkpI0B//1aY0SeXN+M3AyNv540+ExFdhaW5bi9G4zZO3XL8t0yVoivWsUtyeGkRgTvE7upUYUYwPJGgzrEk/iqgbwvOdzdaNAmsUyN8MYQuk7Qj9eb6DaXfe2Vf8eJXbuuyaA3MVV36ucksWvfaqJfm/reMsEpIsVsbjBgBBbiS7HUBcaKHXdO/l9FM/2AWN4FGsfu5uRSl8YuEMFZDWZJbrdIDwVmpqNilw7g1Db016R8QQN/81O3sCy8OIWzGgx4WaSMMfm7B5/jm5zYhfhWdM89LeilrT9ELa5iVnK5qBHB2ZWXR4ns/2xJNsF/C/x1KZvQgr7Ac2l7ZMXn7DLBIgZ/y7/VrmWOKOgrS7Kf00BfSVakh59a0BdYmbbnVHwW8bqd2ADEBiDa9Ops4LWS7BeREy8VB6UeUc4eU2v5h9OXbc7GiyV5weHLksy4nOH9FYJP40+1L11gpEjsRXdyL/ZvQ0/s4J14qiJ/ILn0Un9o6s9B5S5mjWiBjjA8pqrV6r/T3nAojqZnlmQfYhemUf9lVuFY9T3Z/mImrSToSXg7n1be70vboyqyYzRpu6aL4L69JJsrluE7zGvB6UKV/NUE8/B92p5bkt+RHKY1G/iOaLfKmX9OygbxIA5qgUAzHJw2BvEDTivpxqWfZiUQnCdmcFtFfqhIC0Xv90gaH2F4jBCTfFStR1yJQyrv3Zm6s8vCRjcLq9LgTLxf0T2svhP+AxtE/dymlufG40BR9Geoj7OHcGXF7gwRu6urBBthkkiSH+GAkvwKtTPyGbgEj4srj2b3M1vxhMiJp+fYQfVlbDw+Efm1XGmGxKI0tEbs5D5xqOlXq8ll7JfGp+YzIWVVjBG93g6RLUaK9mpQ1O22sFR8hbUiZv7S2XGziikizz0v+s/duLZTY0vVlq+bLf9yteu5jskVWCRicpe452vUnLaKsaLs7RIx1/ayNsNEkd2L67d7tH9wvzfH7sYLWtwQ7V4BnytuvGbm74/FeWWDaEq3pfxAkZRPEd3K0SlfL+4JX2jTb9s4SRwNNxr+CvgD3IUTO3HUjUv0XrGE1Uv0L0Snsr0LPvZc/Atz61znej4TOQAAAABJRU5ErkJggg=="
            ></img>
          ) : (
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAEEElEQVRYhd3Yz4+dUxgH8E9LOxLTmcHClPrV6kw6WkVZtKRFGz9Col1ZdEEkGiwQK8GCaiWCJooV/4BFBfGjaakOFkKiYdpKsNAJRVV/mcaUSWvxnNe8973vvXPvnTuJ+CYn973POed5vu85z49zXv7jmNYGHT3ow4XoTLIRDONbHGmDjaaxBJuwGydxqkY7iSE8j6taMdTMCk7DajyGqxOBIQwmovtwNI3txsW4DNdjYZr/OTbi7VbI1kMfdiRSB7Eec5uYPw9P4/ekYzsubRe5tfgDo4lYZ/3hddGJDUnXMdw5WXKPCz/aI7arXViEvUn3o60qeUJsxw50tYdXBTqxNdlomuRa8Xbb0ZGTn6853ytibtKRoQMfJlsNb3ef8Lk9Kv1tnshtw+m5WeTn51+yC9+IDDCh3mliS0dV+twZwmey/NYsyYxcNn+Pyp1ZhBPYNpGiNUnB+oL8ftVJeFjkuHV4BVvwcWpbkuxerCiQy9q6go2NSX57PYJfiDx3ZkE+WGJgsu2jgo1ZIk9+VovcEuWrB4emgODBEjsbUt+VZQQ3iWgqi9KRKSB4rMTO/MThuTKCQ/iqrEPU2nYTHKpj618e09Nvj4jawRqTPqkhnww+rSHfKaK6i3GC/SLF7C6ZMBO3tJsdbsaMEvnuxKU/T3BO+v2hZMJqcXQqYj+exFP4uYX+S5LuIjIOF+SFdwu/WFoyIauX+XZIZcmag8NN9Gft/RJ7S1PfXYyv4Fj6LR5gO3FjiZIP8FPu/49J1mh/hpWqc27GYSxPMMtJswqDr1XuJ+eWyHqb6M8wI9nIozvPqUiw6GvLSpTCctyX+/8Armuiv56NiwqcEFv5N14qDH5N/Vy2XwRAq/2n8GrB5sv4S9r605NwBLtE8c+jbFvymJ17/jq9JLF1lxf6a6Fo4wZ8ieOMbzGRIBeK8M9wdgMGMnwvInBpem4U5+Se52EgcanCgFjyDTnZSnE2bLR8bUmt0fF/qswSz4havKDW2+zEAZXRvAK/NWG00XZABFOGrmRnRy1ycGuaXDxyzcZbbST3pmrfyw6sN9UjKE0eFU5exHJRWcZaIDWG95SnmyvEkf+NicgRufCoKNr56+YyceohythDeF35cT5r+9KYB3FemtujMvd1i/vOEeM5cELcJt54q7jc9IuwP4bNIvvnM8BMsWUDqfUmWYbpYuU2Jx3Hxe2xQ1xtx4R7VaHex6NH8EJScEL1ZeZX8TFoF74TK3A49Z0lVmq++Kp1jery9464La7Cw3ixDpeauEck33ZHcN4v8yWxJawxNZemQ7hjsuQy9IoIaxe5d1WeF9uGVeL23yqxbaI6TTkW41nxCWOiT8B709jFrRhq10f0BSLP9eA0UbJ+SeSO1p76P8A/HI38CtcFEd4AAAAASUVORK5CYII=" />
          )}
          <Link href={"/blog"}>
            <div className="cursor-pointer text-base font-bold">Blog</div>
          </Link>
        </div>
        {renderThemeChanger()}
      </div>
    </header>
  );
};

export default Header;
