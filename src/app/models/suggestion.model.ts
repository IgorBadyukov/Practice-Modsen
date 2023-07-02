export interface ISuggestion {
  _embedded: {
    "city:search-results": { matching_full_name: string }[];
  };
}
