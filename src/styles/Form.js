import styled from "styled-components";
import * as Colors from "./Colors";

export const Button = styled.div`
  background-color: ${({ enabled }) =>
    enabled === undefined || enabled ? Colors.HACKOR_LIME : Colors.GRAY};
  border-radius: 15px;
  padding: 4px 20px;
  cursor: ${({ enabled }) =>
    enabled === undefined || enabled ? "pointer" : "default"};
  margin-top: 40px;
  margin-left: 4px;
  transition: all 0.1s ease;
  &:hover {
    background-color: ${({ enabled }) =>
      enabled === undefined || enabled ? Colors.HACKOR_TURQOUISE : Colors.GRAY};
  }
  pointer-events: ${({ enabled }) =>
    enabled === undefined || enabled ? "auto" : "none"};
`;

export const Submit = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${Colors.HACKOR_TURQOUISE};
  outline: none;
  font-size: 20px;
  font-family: "Muli", sans-serif;
  padding: 2px 10px;
  margin-bottom: 20px;
  color: ${Colors.HACKOR_CREAM};
  &:hover {
    background-color: ${Colors.HACKOR_DARK_GREEN};
  }
  &:active {
    background-color: ${Colors.HACKOR_DARK_GREEN};
  }
  &:disabled {
    background-color: ${Colors.HACKOR_LIME};
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: calc(100% - 20px);
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${Colors.HACKOR_LIME};
  outline: none;
  font-size: 20px;
  font-family: "Muli", sans-serif;
  padding: 2px 10px;
  margin-bottom: 20px;
  color: ${Colors.HACKOR_DARK};
  &:focus {
    border: 2px solid ${Colors.HACKOR_TURQOUISE};
    background-color: rgb(230, 230, 230);
  }
`;

export const BigInput = styled.textarea`
  width: calc(100% - 20px);
  height: 120px;
  border-radius: 10px;
  border: 2px solid ${Colors.HACKOR_LIME};
  outline: none;
  font-size: 20px;
  font-family: "Muli", sans-serif;
  padding: 2px 10px;
  margin-bottom: 20px;
  color: ${Colors.HACKOR_DARK};
  &:focus {
    border: 2px solid ${Colors.HACKOR_TURQOUISE};
    background-color: rgb(230, 230, 230);
  }
`;

export const RadioInputBackground = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin: 20px;
`;

export const RadioInputButton = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: ${({ many }) => (many ? "10px" : "25px")};
  border: 5px solid ${Colors.HACKOR_LIME};
  background-color: ${({ selected }) =>
    selected ? Colors.HACKOR_LIME : "rgba(0,0,0,0)"};
  transition: all 0.2s ease;
`;

export const Dropdown = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${Colors.HACKOR_LIME};
  outline: none;
  font-size: 20px;
  font-family: "Muli", sans-serif;
  padding: 2px 10px;
  margin-bottom: 20px;
`;

export const HeaderDropdown = styled.select`
  width: auto;
  margin-left: 10px;
  margin-right: 10px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${Colors.HACKOR_DARK};
  outline: none;
  font-size: 20px;
  font-family: "Muli", sans-serif;
  padding: 2px 10px;
  margin-bottom: 20px;
`;
