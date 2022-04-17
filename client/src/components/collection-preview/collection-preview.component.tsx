import React, { ReactComponentElement } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./collection-preview.styles.scss";
import {
  CollectionPreviewContainer,
  CollectionTitleContainer,
  PreviewContainer,
} from "./collection-preview.styles";

import CollectionItem from "../collection-item/collection-item.component";

import ItemProps from "../../interface/item.interface";
interface ICollectionPreviewProps extends RouteComponentProps<any> {
  _id: string;
  name: string;
  items: ItemProps[];
}

const CollectionPreview: React.FC<ICollectionPreviewProps> = ({
  _id,
  name,
  items,
  match,
  history,
}) => {
  return (
    <CollectionPreviewContainer>
      <CollectionTitleContainer
        onClick={() => history.push(`${match.path}/${_id}`)}
      >
        {name.toUpperCase()}
      </CollectionTitleContainer>
      <PreviewContainer>
        {items
          ?.filter((_: any, idx: number) => idx < 4)
          .map((item: ItemProps, idx: number) => (
            <CollectionItem key={idx} item={item} />
          ))}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
};

export default withRouter(CollectionPreview);
