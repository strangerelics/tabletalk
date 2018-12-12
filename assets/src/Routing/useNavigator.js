import { useMemo } from "react";
import { useRouting } from "store";

const useNavigator = depth => {
  const [{ fullPath }] = useRouting();

  const path = fullPath.slice(0, depth);
  const here = fullPath.slice(depth);
  const next = fullPath[depth] || null;

  return useMemo(
    () => ({
      fullPath,
      path,
      here,
      next,
      goTo: (p, d = 0) => {
        if (!Array.isArray(p)) p = [p];
        const newPath = [...fullPath.slice(0, depth + d), ...p];
        window.tabletalkHistory.push("/" + newPath.join("/"));
      },
      goBack: () => {
        window.tabletalkHistory.goBack();
      },
      replace: (p, d = 0) => {
        if (!Array.isArray(p)) p = [p];
        const newPath = [...fullPath.slice(0, depth + d), ...p];
        window.tabletalkHistory.replace("/" + newPath.join("/"));
      }
    }),
    [fullPath, depth]
  );
};

export default useNavigator;
