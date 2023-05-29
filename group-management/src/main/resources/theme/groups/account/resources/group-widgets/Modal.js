import * as React from "../../../common/keycloak/web_modules/react.js";
import { Modal, ModalVariant, Button } from "../../../common/keycloak/web_modules/@patternfly/react-core.js";
import { useEffect } from "../../../common/keycloak/web_modules/react.js"; // import parse from '../../node_modules/react-html-parser';

;
export const ConfirmationModal = props => {
  useEffect(() => {
    setIsModalOpen(Object.keys(props.modalInfo).length > 0);
  }, [props.modalInfo]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = () => {
    props?.modalInfo?.cancel();
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Modal, {
    variant: ModalVariant.small,
    title: props?.modalInfo?.title,
    isOpen: isModalOpen,
    onClose: handleModalToggle,
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "confirm",
      variant: "primary",
      onClick: () => {
        props?.modalInfo?.accept();
      }
    }, props?.modalInfo?.accept_message), props?.modalInfo?.cancel_message && /*#__PURE__*/React.createElement(Button, {
      key: "cancel",
      variant: "link",
      onClick: () => {
        props?.modalInfo?.cancel();
      }
    }, props?.modalInfo?.cancel_message)]
  }, props?.modalInfo?.message && props?.modalInfo?.message));
};
//# sourceMappingURL=Modal.js.map