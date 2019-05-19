import styled from "styled-components";
import React from "react";

export const FilterBase = styled.button<
  { active: boolean } & React.HTMLProps<HTMLButtonElement>
>`
  background: ${({ active }) => (active ? "#cecece" : "#fff")};
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  color: rgba(0, 0, 0, 0.7);
  border: 0;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);

  &:focus {
    outline: 0;
  }
`;
export const FiltersContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;
  overflow-x: scroll;
`;
