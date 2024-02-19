import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

import { testData } from '@/testing/test-data';

import { WebformBuilderItem } from '../types/webform-builder';

const webformBuilderItems = testData.compliance.assessment
  .form as WebformBuilderItem[];

export interface AaWebformStore {
  selectedWebformBuilder: WebformBuilderItem | null;
  webformBuilderItems: WebformBuilderItem[];
  reset: () => void;
  onSelectedWebformCustomizingItem: (
    item: WebformBuilderItem
  ) => void;
  onAddWebformCustomizingItem: (
    item: WebformBuilderItem,
    parentId?: string
  ) => void;
  onUpdatedWebformCustomizingItem: (
    item: WebformBuilderItem,
    parentId?: string
  ) => void;
}

export const aaWebformStore = createStore<AaWebformStore>(
  (set) => ({
    webformBuilderItems: webformBuilderItems,
    selectedWebformBuilder: null,
    reset: () => {
      set(() => ({
        selectedWebformBuilder: null,
        webformBuilderItems: webformBuilderItems,
      }));
    },
    onSelectedWebformCustomizingItem: (item) => {
      set(() => ({
        selectedWebformBuilder: item,
      }));
    },
    onAddWebformCustomizingItem: (item, parentId) => {
      set((state) => {
        const selectedKey =
          state.selectedWebformBuilder?.key;
        const newItems = [...state.webformBuilderItems];
        if (parentId) {
          const parentItem = newItems.find(
            (i) => i.key === parentId
          );
          const activeIndex =
            parentItem?.children?.findIndex(
              (i) => i.key === selectedKey
            );
          if (activeIndex && activeIndex > -1) {
            parentItem?.children?.splice(
              activeIndex + 1,
              0,
              item
            );
          } else {
            parentItem?.children?.push(item);
          }
        } else {
          const activeIndex = newItems.findIndex(
            (i) => i.key === selectedKey
          );
          if (activeIndex > -1) {
            newItems.splice(activeIndex + 1, 0, item);
          } else {
            newItems.push(item);
          }
        }
        return {
          selectedWebformBuilder: item,
          webformBuilderItems: newItems,
        };
      });
    },
    onUpdatedWebformCustomizingItem: (
      webformBuilderItem: WebformBuilderItem,
      parentId: string | undefined
    ) => {
      set((state) => {
        const newItems = [...state.webformBuilderItems];
        if (parentId) {
          const parentItem = newItems.find(
            (i) => i.key === parentId
          );
          const activeIndex =
            parentItem?.children?.findIndex(
              (i) => i.key === webformBuilderItem.key
            );

          if (
            activeIndex === undefined ||
            activeIndex < 0
          )
            throw new Error('activeIndex is undefined');

          if (activeIndex >= 0) {
            parentItem?.children?.splice(
              activeIndex,
              1,
              webformBuilderItem
            );
          }
        } else {
          const activeIndex = newItems.findIndex(
            (i) => i.key === webformBuilderItem.key
          );
          if (activeIndex > -1) {
            newItems.splice(
              activeIndex,
              1,
              webformBuilderItem
            );
          } else {
            newItems.push(webformBuilderItem);
          }
        }
        return {
          selectedWebformBuilder: webformBuilderItem,
          webformBuilderItems: newItems,
        };
      });
    },
  })
);

export const useAaWebformStore = () =>
  useStore(aaWebformStore);
