import Item from "./item.interface";

interface CollectionProps {
  _id: number;
  name: string;
  imageUrl?: string;
  items?: Item[];
}

export default CollectionProps;
