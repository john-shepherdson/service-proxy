import * as React from "../../../common/keycloak/web_modules/react.js";
import { Modal, ModalVariant, Spinner } from "../../../common/keycloak/web_modules/@patternfly/react-core.js";
import { useEffect, useState } from "../../../common/keycloak/web_modules/react.js";
export const Loading = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(props.active);
  }, [props.active]);
  return /*#__PURE__*/React.createElement(Modal, {
    variant: ModalVariant.large,
    width: "19rem",
    isOpen: isModalOpen,
    header: "",
    showClose: false,
    onEscapePress: () => {},
    "aria-labelledby": "modal-custom-header-label",
    "aria-describedby": "modal-custom-header-description",
    footer: ""
  }, /*#__PURE__*/React.createElement("div", {
    tabIndex: 0,
    id: "modal-no-header-description",
    className: "gm_loader-modal-container"
  }, /*#__PURE__*/React.createElement(Spinner, {
    isSVG: true,
    diameter: "100px",
    "aria-label": "Contents of the custom size example"
  })));
};
//# sourceMappingURL=LoadingModal.js.map