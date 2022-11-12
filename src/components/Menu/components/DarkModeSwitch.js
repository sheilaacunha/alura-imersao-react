import React from "react";
import styled from "styled-components";
import { ColorModeContext } from "./ColorMode";

const StyledSwitch = styled.div`
  background-color: #333333;
  border: 0;
  padding: 3px;
  font-size: 12px;
  width: 50px;
  height: 25px;
  display: flex;
  justify-content: space-around;
  border-radius: 10000px;
  position: relative;
  label {
    width: 50px;
  }
  span { display: inline-flex; width: 20px; height: 20px; align-items: center; justify-content: center; }
  
  label:before {
    content: "";
    background-color: #fafafa;
    border: 1px solid #333333;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: .3s;
    cursor: pointer;
  }
  input[type="checkbox"] { display: none; }
  input[type="checkbox"]:checked + label:before { transform: translateX(100%); }
`;

export default function DarkModeSwitch() {
    const contexto = React.useContext(ColorModeContext);

    return (
        <StyledSwitch>
            <input id="darkmode" type="checkbox" onChange={() => {
                console.log("mudou o state");
                contexto.toggleMode();
            }} />
            <label
                htmlFor="darkmode"
                className="darkmode-switch"
            >
                <span>😢</span>
                <span>😍</span>
            </label>
        </StyledSwitch>
    )
}

/* .switch {
      font-size: 17px;
      position: relative;
      display: inline-block;
      width: 3.5em;
      height: 2em;
    }
     .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
     .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: red;
      transition: 0.5s;
      border-radius: 30px;
    }
      .slider:before {
      position: absolute;
      content: '';
      height: 1.4em;
      width: 1.4em;
      border-radius: 50%;
      left: 10%;
      bottom: 15%;
      box-shadow: inset 15px -4px 0px 15px #fff;
      background: #363636;
      transition: 0.5s;
    }
     input:checked + .slider {
      background-color: #363636;
    }
     input:checked + .slider:before {
      transform: translateX(100%);
      box-shadow: inset 8px -4px 0px 0px #fff;
    } */

{/* <div>
          <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
       </div> */}