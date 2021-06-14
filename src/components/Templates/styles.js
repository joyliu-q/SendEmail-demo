import styled from "styled-components";
import { Colors } from "@/styles";

export const Button = styled.div`
  display: inline-block;
  background-color: ${Colors.HACKOR_TURQOUISE};
  color: white;
  padding: 12.5px 25px 12.5px 25px;
  align-items: center;
  text-align: center;
  width: 100%;
  border-radius: 10px;
  transition: 0.15s;
  margin-bottom: 2rem;

  & p {
    margin: 0px;
    font-size: 1.2em;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
