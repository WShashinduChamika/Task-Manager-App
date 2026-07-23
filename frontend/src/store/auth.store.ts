import { signal, computed } from "@preact/signals-react";
import type { AuthUser } from "@modules/auth/types";

export const globalAuthUserStore = signal<AuthUser | null>(null);

export const isLoggedInStore = computed(
  () => globalAuthUserStore.value !== null,
);
export const currentUserIdStore = computed(
  () => globalAuthUserStore.value?.id ?? null,
);
