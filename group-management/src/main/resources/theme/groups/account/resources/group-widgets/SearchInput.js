import * as React from "../../../common/keycloak/web_modules/react.js";
import { useState } from "../../../common/keycloak/web_modules/react.js";
import { Button, TextInput, InputGroup, Tooltip } from "../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore

export const SearchInput = props => {
  const [searchString, setSearchString] = useState("");
  return /*#__PURE__*/React.createElement("div", {
    className: "gm_search-input-container"
  }, /*#__PURE__*/React.createElement(InputGroup, {
    className: "gm_search-input"
  }, /*#__PURE__*/React.createElement(TextInput, {
    name: "searchInput",
    id: "searchInput1",
    type: "text",
    value: searchString,
    onChange: e => {
      setSearchString(e);
    },
    placeholder: "Search...",
    "aria-label": "Search Input",
    onKeyDown: e => {
      e.key === 'Enter' && props.search(searchString);
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement("div", null, props.searchText)
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "control",
    "aria-label": "popover for input",
    onClick: () => {
      props.search(searchString);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm_search-icon-container"
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement("div", null, props.cancelText)
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "control",
    "aria-label": "popover for input",
    onClick: () => {
      setSearchString('');
      props.cancel(searchString);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm_cancel-icon-container"
  })))));
};
//# sourceMappingURL=SearchInput.js.map