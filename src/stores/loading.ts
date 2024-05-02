import {defineStore} from "pinia";

export const useLoadingStore = defineStore("loading", {
    state: () => ({
        isLoadingPrimary: false,
        isLoadingSecondary: false,
        isLoadingTerminal: false,
    }),
    getters: {
        getIsLoadingPrimary() {
            return this.isLoadingPrimary;
        },
        getIsLoadingSecondary() {
            return this.isLoadingSecondary;
        },
        getIsLoadingTerminal() {
            return this.isLoadingTerminal;
        }
    },
    actions: {
        setIsLoadingPrimary(isLoadingPrimary: boolean) {
            this.isLoadingPrimary = isLoadingPrimary;
        },
        setIsLoadingSecondary(isLoadingSecondary: boolean) {
            this.isLoadingSecondary = isLoadingSecondary;
        },
        setIsLoadingTerminal(isLoadingTerminal: boolean) {
            this.isLoadingTerminal = isLoadingTerminal;
        },
        async handlePrimaryLoading(func: () => Promise<void>){
            this.setIsLoadingPrimary(true);
            await func();
            this.setIsLoadingPrimary(false);
        },
        async handleSecondaryLoading(func: () => Promise<void>){
            this.setIsLoadingSecondary(true);
            await func();
            this.setIsLoadingSecondary(false);
        },
        async handleTerminalLoading(func: () => Promise<void>){
            this.setIsLoadingTerminal(true);
            await func();
            this.setIsLoadingTerminal(false);
        }
    }
});
