import {defineStore} from "pinia";

export const useLoadingStore = defineStore("loading", {
    state: () => ({
        isLoadingPrimary: false,
        isLoadingSecondary: false,
        isLoadingTerminal: false,
    }),
    actions: {
        async handlePrimaryLoading(func: () => Promise<void>){
            try {
                this.isLoadingPrimary = true;
                await func();
            } finally {
                this.isLoadingPrimary = false;
            }
        },
        async handleSecondaryLoading(func: () => Promise<void>){
            try {
                this.isLoadingSecondary = true;
                await func();
            } finally {
                this.isLoadingSecondary = false;
            }
        },
        async handleTerminalLoading(func: () => Promise<void>){
            try {
                this.isLoadingTerminal = true;
                await func();
            } finally {
                this.isLoadingTerminal = false;
            }
        }
    }
});
