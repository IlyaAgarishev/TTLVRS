import React, { useEffect, useState } from "react";
import { api } from "../config";
import { Filter } from "../types";
import { FilterBase, FiltersContainer } from "./styled";

interface FilterProps {
  filter: Filter;
  onSelect: () => void;
  selected: boolean;
}

function FilterEntry({ filter, onSelect, selected }: FilterProps) {
  return (
    <FilterBase onClick={onSelect} active={selected}>
      {filter.name}
    </FilterBase>
  );
}

interface QuickFiltersProps {
  changeSelectedTags: (selected: Filter[]) => void;
  selectedTags: Filter[];
}

export function QuickFilters({
  selectedTags,
  changeSelectedTags
}: QuickFiltersProps) {
  const [availableTags, setAvailableTags] = useState<Filter[]>([]);

  useEffect(() => {
    fetch(api("/api/categories"))
      .then(resp => resp.json())
      .then((tags: { [arg: string]: string }) => {
        const parsedTags = Object.entries(tags).map(
          ([nameEng, name]: [string, string]) => ({ nameEng, name })
        );
        setAvailableTags(parsedTags);
      });
  }, []);

  return (
    <FiltersContainer>
      {availableTags.map(filter => {
        const selected = selectedTags.includes(filter);
        return (
          <FilterEntry
            key={filter.nameEng}
            filter={filter}
            selected={selected}
            onSelect={() => {
              if (selected) {
                changeSelectedTags(selectedTags.filter(tag => tag !== filter));
              } else {
                changeSelectedTags([...selectedTags, filter]);
              }
            }}
          />
        );
      })}
    </FiltersContainer>
  );
}
