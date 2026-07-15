export interface ResourceSummary {
  index: string;
  name: string;
  url: string;
}

export interface ApiListResponse {
  count: number;
  results: ResourceSummary[];
}

export interface MagicItemDetail {
  index: string;
  name: string;
  desc: string[];
  equipment_category: {
    index: string;
    name: string;
  };
  rarity: {
    name: string;
  };
  image?: string;
}
