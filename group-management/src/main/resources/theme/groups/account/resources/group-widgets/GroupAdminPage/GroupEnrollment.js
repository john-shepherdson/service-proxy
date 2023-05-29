import * as React from "../../../../common/keycloak/web_modules/react.js";
import { useState, useEffect } from "../../../../common/keycloak/web_modules/react.js";
import { DataList, DataListItem, DataListItemCells, DataListItemRow, DataListCell } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore

import { GroupsServiceClient } from "../../groups-mngnt-service/groups.service.js"; // @ts-ignore

import { ConfirmationModal } from "../Modal.js";
import { ExternalLinkAltIcon } from "../../../../common/keycloak/web_modules/@patternfly/react-icons.js"; //import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '

export const GroupEnrollment = props => {
  const [modalInfo, setModalInfo] = useState({});
  const [groupEnrollments, setGroupEnrollments] = useState([]);
  let groupsService = new GroupsServiceClient();
  useEffect(() => {
    fetchGroupEnrollments();
  }, []);

  let fetchGroupEnrollments = () => {
    groupsService.doGet("/group-admin/group/" + props.groupId + "/configuration/all").then(response => {
      if (response.status === 200 && response.data) {
        setGroupEnrollments(response.data);
      }
    });
  };

  const noGroupEnrollments = () => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      key: "emptyItem",
      "aria-labelledby": "empty-item"
    }, /*#__PURE__*/React.createElement(DataListItemRow, {
      key: "emptyRow"
    }, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        key: "empty"
      }, /*#__PURE__*/React.createElement("strong", null, "No group enrollments found"))]
    })));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConfirmationModal, {
    modalInfo: modalInfo
  }), /*#__PURE__*/React.createElement(DataList, {
    "aria-label": "Group Member Datalist",
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item1"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 3,
      key: "id-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Name")), /*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 3,
      key: "username-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Status")), /*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 3,
      key: "email-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Aup"))]
  }))), groupEnrollments.length > 0 ? groupEnrollments.map((enrollment, index) => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      "aria-labelledby": "enrollment-" + index
    }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        key: "primary content"
      }, enrollment.name || "Not Available"), /*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        className: enrollment.active ? "gm_group-enrollment-active" : "gm_group-enrollment-inactive",
        key: "secondary content "
      }, /*#__PURE__*/React.createElement("strong", null, enrollment.active ? "Active" : "Inactive")), /*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        key: "secondary content "
      }, enrollment?.aup?.url ? /*#__PURE__*/React.createElement("a", {
        href: enrollment?.aup?.url,
        target: "_blank",
        rel: "noreferrer"
      }, "link ", /*#__PURE__*/React.createElement(ExternalLinkAltIcon, null), " ") : "Not Available")]
    })));
  }) : noGroupEnrollments()));
};
//# sourceMappingURL=GroupEnrollment.js.map