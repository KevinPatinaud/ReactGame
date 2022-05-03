import React, { Component, FunctionComponent, useState } from "react";

function Header(props: any) {
  return (
    <>
      <button onClick={props.switchLangueEN}>English</button>
      <button onClick={props.switchLangueFR}>French</button>
    </>
  );
}

export default Header;
