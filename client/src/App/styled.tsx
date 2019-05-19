import styled from "styled-components";

export const Header = styled.h1`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
  font-family: "Arial Black", sans-serif;
  font-size: 20px;
  background: white;
  border-radius: 0 0 10px 10px;
  padding: 3px 15px 5px;
  color: rgba(0, 0, 0, 0.7);
  border: 0;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
`;
export const HeaderContainer = styled.header`
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
`;
