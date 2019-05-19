import React, { HTMLProps, useState } from "react";
import styled from "styled-components";
const filters = ["бесплатные", "андерграунд", "музыка", "прогулки"];

interface FilterProps {
  name: string;
}

const FilterBase = styled.button<
  { active: boolean } & React.HTMLProps<HTMLButtonElement>
>`
  background: ${({ active }) => (active ? "#cecece" : "#fff")};
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  color: rgba(0, 0, 0, 0.7);
  border: 0;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  overflow-x: scroll;
`;

function Filter({ name }: FilterProps) {
  const [active, setActive] = useState(false);

  return (
    <FilterBase onClick={() => setActive(!active)} active={active}>
      {name}
    </FilterBase>
  );
}

export function QuickFilters() {
  return (
    <FiltersContainer>
      {filters.map(filter => (
        <Filter name={filter} />
      ))}
    </FiltersContainer>
  );
}
