import styled from "styled-components";
import React from "react";

export const Wrapper = styled.div`
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-height: 100vh;
  min-height: 400px;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 30px;
  color: #474747;
  overflow-y: scroll;
`;
export const Header = styled.div`
  font-size: 1.5em;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
export const Preview = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 20px;
  margin-right: 10px;
  object-fit: cover;
`;
export const Titles = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
`;
export const Name = styled.h1`
  margin: 0;
  font-size: 1.2rem;
  flex: 1;
`;
export const Geo = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
`;
export const DescriptionSection = styled.div<
  { icon: string } & React.HTMLProps<HTMLDivElement>
>`
  margin: 15px 0;
  width: 100%;
  font-size: 1rem;
  padding-left: 40px;
  background: url(${(props: any) => props.icon}) no-repeat top left / 20px 20px;
`;
