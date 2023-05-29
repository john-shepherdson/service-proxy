import * as React from "../../../../common/keycloak/web_modules/react.js";
import { useState, useEffect, useRef } from "../../../../common/keycloak/web_modules/react.js";
import { DataList, DataListItem, DataListItemCells, DataListItemRow, DataListCell, Button, Tooltip, DataListAction, TextInput } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore
// @ts-ignore

import { ConfirmationModal } from "../Modal.js"; //import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '

export const GroupAttributes = props => {
  const attributeRef = useRef(null);
  const [attributeKeyInput, setAttributeKeyInput] = useState("");
  const [attributeValueInput, setAttributeValueInput] = useState("");
  const [attributes, setAttributes] = useState(props.groupConfiguration.attributes || {});
  const [modalInfo, setModalInfo] = useState({});
  useEffect(() => {
    setAttributes(props.groupConfiguration.attributes || {});
  }, [props.groupConfiguration]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConfirmationModal, {
    modalInfo: modalInfo
  }), /*#__PURE__*/React.createElement(DataList, {
    "aria-label": "Compact data list example",
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item1"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      width: 2,
      key: "key-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Key")), /*#__PURE__*/React.createElement(DataListCell, {
      width: 3,
      key: "value-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Value"))]
  }), /*#__PURE__*/React.createElement(DataListAction, {
    className: "gm_cell-center",
    "aria-labelledby": "check-action-item1 check-action-action2",
    id: "check-action-action1",
    "aria-label": "Actions",
    isPlainButtonAction: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm_cell-placeholder"
  })))), attributes && Object.keys(attributes).map(attribute => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      "aria-labelledby": attribute
    }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        width: 2,
        key: "primary content"
      }, /*#__PURE__*/React.createElement("strong", null, attribute)), /*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        key: "secondary content "
      }, /*#__PURE__*/React.createElement(TextInput, {
        value: attributes[attribute],
        onChange: e => {
          attributes[attribute] = [e];
          setAttributes({ ...attributes
          });
        }
      }))]
    }), /*#__PURE__*/React.createElement(DataListAction, {
      className: "gm_cell-center",
      "aria-labelledby": "check-action-item1 check-action-action1",
      id: "check-action-action1",
      "aria-label": "Actions",
      isPlainButtonAction: true
    }, /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement("div", null, "Remove Attribute")
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      className: "gm_x-button-small",
      onClick: () => {
        delete attributes[attribute];
        setAttributes({ ...attributes
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gm_x-button"
    }))))));
  }), /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "attribute-input"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      width: 2,
      key: "key-input"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item1"
    }, /*#__PURE__*/React.createElement(TextInput, {
      id: "textInput-basic-1",
      value: attributeKeyInput,
      placeholder: "Add Attribute Key",
      onKeyDown: e => {
        e.key === 'Enter' && attributeRef?.current?.click();
      },
      type: "text",
      "aria-label": "text input field",
      onChange: e => {
        setAttributeKeyInput(e);
      }
    }))), /*#__PURE__*/React.createElement(DataListCell, {
      width: 3,
      key: "value-input"
    }, /*#__PURE__*/React.createElement("span", {
      id: "item2"
    }, /*#__PURE__*/React.createElement(TextInput, {
      id: "textInput-basic-2",
      value: attributeValueInput,
      placeholder: "Add Attribute Value",
      onKeyDown: e => {
        e.key === 'Enter' && attributeRef?.current?.click();
      },
      type: "text",
      "aria-label": "text input field",
      onChange: e => {
        setAttributeValueInput(e);
      }
    })))]
  }), /*#__PURE__*/React.createElement(DataListAction, {
    className: "gm_cell-center",
    "aria-labelledby": "check-action-item1 check-action-action1",
    id: "check-action-action1",
    "aria-label": "Actions",
    isPlainButtonAction: true
  }, /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement("div", null, "Add Attribute")
  }, /*#__PURE__*/React.createElement(Button, {
    className: "gm_plus-button-small",
    ref: attributeRef,
    onClick: () => {
      if (attributeKeyInput) {
        attributes[attributeKeyInput] = [attributeValueInput];
        setAttributes({ ...attributes
        });
        setAttributeKeyInput("");
        setAttributeValueInput("");
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm_plus-button"
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "gm_attribute-controls"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "",
    onClick: () => {
      setModalInfo({
        title: "Confirmation",
        accept_message: "YES",
        cancel_message: "NO",
        message: "Save changes made to the service attributes?",
        accept: function () {
          props.groupConfiguration.attributes = attributes;
          props.updateAttributes(props.groupConfiguration);
          setModalInfo({});
        },
        cancel: function () {
          props.fetchGroupConfiguration();
          setModalInfo({});
        }
      });
    }
  }, "Save"), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    className: "",
    onClick: () => {
      props.fetchGroupConfiguration();
    }
  }, "Cancel")));
};
//# sourceMappingURL=GroupAttributes.js.map