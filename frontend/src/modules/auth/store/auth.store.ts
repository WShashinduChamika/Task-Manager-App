import { signal } from "@preact/signals-react";

export const authLoadingStore = signal<boolean>(false);
export const authErrorStore = signal<string | null>(null);
export const authSuccessMessageStore = signal<string | null>(null);
