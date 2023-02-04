//pages/util/index.ts
import about from "../about";
export namespace Constants {
  export const ADDRESS = process.env.NEXT_PUBLIC_MENU_ADDRESS;
  export const ADDRESS_STATUS = process.env.NEXT_PUBLIC_MENU_ADDRESS_STATUS;
  export const ADDRESS_MENU = process.env.NEXT_PUBLIC_MENU_ADDRESS_MENU;
  export const ADDRESS_BTN_SUBMIT =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_BTN_SUBMIT;
  export const ADDRESS_BTN_VERIFY =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_BTN_VERIFY;
  export const ADDRESS_INFO_SUBMITTED =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_INFO_SUBMITTED;
  export const ADDRESS_INFO_ADDRESS_DUPLICATED =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_INFO_ADDRESS_DUPLICATED;
  export const ADDRESS_INFO_NO_DESCRIPTION =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_INFO_NO_DESCRIPTION;
  export const ADDRESS_INFO_NO_ADDRESS =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_INFO_NO_ADDRESS;
  export const ADDRESS_BTN_APPROVE =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_BTN_APPROVE;
  export const ADDRESS_BTN_REJECT =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_BTN_REJECT;
  export const ADDRESS_BTN_CANCEL =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_BTN_CANCEL;
  export const ADDRESS_BTN_SAVE_TO_DATABASE =
    process.env.NEXT_PUBLIC_MENU_ADDRESS_BTN_SAVE_TO_DATABASE;
  export const SIGNIN_BTN_LDAP = process.env.NEXT_PUBLIC_SIGNIN_BTN_LDAP;
}

import React from "react";

export default function index() {
  return (
    <>
      <p>hello</p>
    </>
  );
}
