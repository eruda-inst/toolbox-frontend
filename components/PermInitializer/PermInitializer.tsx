"use client";

import { useEffect } from "react";
import { usePermStore } from "@/stores/perm.store";
import { useAuthenticationStore } from "@/stores/authentication.store";
import { tokenStorage } from "@/libs/tokenStorage.lib";

function PermInitializer() {
  const loadPerms = usePermStore((state) => state.loadPerms);
  const user = useAuthenticationStore((state) => state.user);

  useEffect(() => {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
      loadPerms().catch(console.error);
    }
  }, [loadPerms]);

  useEffect(() => {
    if (user) {
      loadPerms().catch(console.error);
    }
  }, [user, loadPerms]);

  return null;
}

export { PermInitializer };
