import { CollectionData } from '@/utils/collectionData';

export const Insert_Item = 'insert_item';

export const insert_item = (item: CollectionData) => {
  return { type: Insert_Item };
};
