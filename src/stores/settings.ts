import {defineStore} from "pinia";

export const useSettingsStore = defineStore("settings", {
    state: () => ({
        latencyEnabled: true,
        latencyAmountMillis: 1500
    }),
    getters: {
        getLatencyEnabled() {
            return this.latencyEnabled;
        },
        getLatencyAmountMillis() {
            return this.latencyAmountMillis;
        }
    },
    actions: {
        setLatencyEnabled(latencyEnabled: boolean) {
            this.latencyEnabled = latencyEnabled;
        },
        setLatencyAmountMillis(latencyAmountMillis: number) {
            this.latencyAmountMillis = latencyAmountMillis;
        }
    }
});
