import { Skeleton, Typography } from "antd";
import React from "react";
import Blockies from "react-blockies";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useLookupAddress } from "../hooks";

// changed value={address} to address={address}

/*
  ~ What it does? ~

  Displays an address with a blockie image and option to copy address

  ~ How can I use? ~

  <Address
    address={address}
    ensProvider={mainnetProvider}
    blockExplorer={blockExplorer}
    fontSize={fontSize}
  />

  ~ Features ~

  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
*/


export default function Content(props) {
  const address = props.address;

  const ens = useLookupAddress(props.ensProvider, address);

  const { currentTheme } = useThemeSwitcher();

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }
  

  let text;
  if (props.onChange) {
    text = (
      <Text editable={{ onChange: props.onChange }} copyable={{ text: address }}>
        <a
          style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer"
        >
            RSN
        </a>
      </Text>
    );
  } else {
    text = (
      <Text copyable={{ text: address }}>
        <a
          style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          {displayAddress}
        </a>
      </Text>
    );
  }

  return (
    <span>
      <span style={{ verticalAlign: "middle" }}>
        <Blockies seed={address.toLowerCase()} size={8} scale={props.fontSize ? props.fontSize / 7 : 4} />
      </span>
      <span style={{ verticalAlign: "middle", paddingLeft: 5, fontSize: props.fontSize ? props.fontSize : 28 }}>
        {text}
      </span>
    </span>
  );
}
