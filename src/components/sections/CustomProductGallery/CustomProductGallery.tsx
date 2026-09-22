import { ProductGallerySection, getOverriddenSection } from "@faststore/core";
import type { SearchState } from "@faststore/sdk";
import { registerCustomSortKeys, useSearch } from "@faststore/sdk";
import { SelectField, Skeleton } from "@faststore/ui";
import type { ComponentProps, PropsWithChildren } from "react";

// EXPERIMENT (branch test/sort-by-specification): sort value added via
// `extend enum StoreSort` in src/graphql/vtex/typeDefs/sortByPropertyTest.graphql
// and mapped to an Intelligent Search sort string by `api.customSortMap` in
// discovery.config.js.
const CLOTHES_SIZE_SORT_KEY = "clothesSize_desc";

// Must run before the first `parseSearchState`, which happens while `_app`
// renders. This module is only reached through the section registry, so it
// depends on the registry being evaluated before that first render.
registerCustomSortKeys([CLOTHES_SIZE_SORT_KEY]);

// EXPERIMENT (branch test/sort-by-specification): core's Sort component keeps
// its own hardcoded option list and drops any key outside it, including keys
// passed through the CMS `sortBySelector.options` prop, so the only way to
// offer a custom sort in the UI is to render our own select.
const SORT_OPTIONS = {
  price_desc: "Price, descending",
  price_asc: "Price, ascending",
  orders_desc: "Top sales",
  name_asc: "Name, A-Z",
  name_desc: "Name, Z-A",
  release_desc: "Release date",
  discount_desc: "Discount",
  score_desc: "Relevance",
  [CLOTHES_SIZE_SORT_KEY]: "Clothes size, descending",
};

const SORT_KEYS = Object.keys(SORT_OPTIONS);

function SortWithClothesSize() {
  const { state, setState } = useSearch();

  return (
    <SelectField
      id="sort-select"
      className="sort / text__title-mini-alt"
      label="Sort by"
      options={SORT_OPTIONS}
      value={state.sort}
      testId="search-sort"
      onChange={(e) =>
        setState({
          ...state,
          sort: SORT_KEYS[e.target.selectedIndex] as SearchState["sort"],
          page: 0,
        })
      }
    />
  );
}

// `Sort` is not an overridable slot: the gallery renders it as the children of
// `SortSkeleton`, so replacing the skeleton and discarding its children is the
// only way in.
function SortSkeletonWithClothesSize({
  children: _nativeSort,
  ...otherProps
}: PropsWithChildren<ComponentProps<typeof Skeleton>>) {
  return (
    <Skeleton {...otherProps}>
      <SortWithClothesSize />
    </Skeleton>
  );
}

const CustomProductGallery = getOverriddenSection({
  Section: ProductGallerySection,
  components: {
    SortSkeleton: { Component: SortSkeletonWithClothesSize },
  },
});

export default CustomProductGallery;
