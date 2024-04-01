export interface GlobalInfo {
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
    Asset: Asset[];
  };
}

type Sys = {
  type: string;
  linkType: string;
  id: string;
};

type Fields = {
  siteTitle: string;
  siteDescription: string;
  siteLogo: {
    sys: Sys;
  };
  contactEmail: string;
};

type Asset = {
  metadata: {
    tags: any[];
  };
  sys: {
    space: {
      sys: Sys;
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: Sys;
    };
    revision: number;
    locale: string;
  };
  fields: {
    title: string;
    description: string;
    file: File;
  };
};

export interface File {
  url: string;
  details: {
    size: number;
    image: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
}
