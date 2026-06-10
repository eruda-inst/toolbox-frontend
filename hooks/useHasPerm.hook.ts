import { usePermStore } from "@/stores/perm.store";
import { useMemo } from "react";

function useHasPerm(permCode: string): boolean {
  const perms = usePermStore((state) => state.perms);
  return useMemo(
    () => perms.some((p) => p.codigo === permCode),
    [perms, permCode],
  );
}

export { useHasPerm };
