export type BlockType = 'popular_destinations' | 'top_attractions' | 'picked_up_tours';

export interface Block {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: {
    fields: Fields;
  }[];
  includes: {
    Entry: Entry[];
  };
}

type ItemSys = {
  type: string;
  linkType: string;
  id: string;
};

interface Fields {
  title: string;
  type: string;
  items: {
    sys: ItemSys;
  }[];
}

interface Entry {
  metadata: {
    tags: any[];
  };
  sys: {
    space: {
      sys: ItemSys;
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: ItemSys;
    };
    revision: number;
    contentType: {
      sys: ItemSys;
    };
    locale: string;
  };
  fields: DestinationTile;
}

export interface Image {
  url: string;
  tags: any[];
  type: string;
  bytes: number;
  width: number;
  format: string;
  height: number;
  version: number;
  duration: any;
  metadata: any[];
  public_id: string;
  created_at: string;
  secure_url: string;
  resource_type: string;
  original_url: string;
  original_secure_url: string;
  raw_transformation: string;
}

export type DestinationTile = {
  id: number;
  name: string;
  image: Image[];
};
