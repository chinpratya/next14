import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type AaWebformLogicStore = {
  selectedLogicKey?: string;
  onSelectedLogicKey: (key: string) => void;
};

const aaWebformLogicStore =
  createStore<AaWebformLogicStore>((set) => ({
    onSelectedLogicKey: (selectedLogicKey) =>
      set({
        selectedLogicKey,
      }),
  }));

export const useAaWebformLogicStore = () =>
  useStore(aaWebformLogicStore);
