import * as React from "../../../../common/keycloak/web_modules/react.js";
import { useState, useEffect } from "../../../../common/keycloak/web_modules/react.js";
import { Tabs, Tab, TabTitleText, Breadcrumb, BreadcrumbItem, TextArea, Button } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore

import { ContentPage } from "../ContentPage.js";
import { GroupsServiceClient } from "../../groups-mngnt-service/groups.service.js";
import { GroupMembers } from "../../group-widgets/GroupAdminPage/GroupMembers.js"; //import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

import { GroupAttributes } from "../../group-widgets/GroupAdminPage/GroupAttributes.js";
import { GroupDetails } from "../../group-widgets/GroupAdminPage/GroupDetails.js";
import { GroupAdmins } from "../../group-widgets/GroupAdminPage/GroupAdmins.js";
import { ConfirmationModal } from "../../group-widgets/Modal.js";
import { GroupEnrollment } from "../../group-widgets/GroupAdminPage/GroupEnrollment.js";
// export class GroupPage extends React.Component<GroupsPageProps, GroupsPageState> {
export const AdminGroupPage = props => {
  const [groupConfiguration, setGroupConfiguration] = useState({});
  const [groupId] = useState(props.match.params.id);
  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const [user, setUser] = useState({});
  const [modalInfo, setModalInfo] = useState({});
  let groupsService = new GroupsServiceClient();
  useEffect(() => {
    fetchUser();
    fetchGroupConfiguration();
  }, []);
  useEffect(() => {}, [groupConfiguration]);

  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  let fetchGroupConfiguration = () => {
    groupsService.doGet("/group-admin/group/" + groupId + "/all").then(response => {
      if (response.status === 200 && response.data) {
        if (response.data?.attributes?.description?.[0] !== descriptionInput) {
          setDescriptionInput(response.data?.attributes?.description?.[0]);
        }

        setGroupConfiguration(response.data);
      }
    });
  };

  let updateAttributes = groupConfiguration => {
    groupsService.doPost("/group-admin/group/" + groupId + "/attributes", groupConfiguration?.attributes ? { ...groupConfiguration.attributes
    } : {}).then(response => {
      if (response.status === 200 || response.status === 204) {
        setGroupConfiguration({ ...groupConfiguration
        });
      } else {
        fetchGroupConfiguration();
      }
    });
  };

  let fetchUser = () => {
    groupsService.doGet("/whoami", {
      target: "base"
    }).then(response => {
      if (response.status === 200 && response.data) {
        setUser(response.data);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gm_content"
  }, /*#__PURE__*/React.createElement(ConfirmationModal, {
    modalInfo: modalInfo
  }), /*#__PURE__*/React.createElement(Breadcrumb, {
    className: "gm_breadcumb"
  }, /*#__PURE__*/React.createElement(BreadcrumbItem, {
    to: "#"
  }, "Account Console"), /*#__PURE__*/React.createElement(BreadcrumbItem, {
    to: "#/groups/admingroups"
  }, "Manage Groups"), /*#__PURE__*/React.createElement(BreadcrumbItem, {
    isActive: true
  }, groupConfiguration?.name)), /*#__PURE__*/React.createElement(ContentPage, {
    title: groupConfiguration?.name || ""
  }, editDescription ? /*#__PURE__*/React.createElement("div", {
    className: "gm_description-input-container"
  }, /*#__PURE__*/React.createElement(TextArea, {
    value: descriptionInput,
    onChange: value => setDescriptionInput(value),
    "aria-label": "text area example"
  }), /*#__PURE__*/React.createElement(Button, {
    className: "gm_button-small",
    onClick: () => {
      setModalInfo({
        title: "Confirmation",
        accept_message: "Yes",
        cancel_message: "No",
        message: "Are you sure you want to update group's description?",
        accept: function () {
          if (groupConfiguration.attributes) {
            groupConfiguration.attributes.description = [descriptionInput];
            updateAttributes(groupConfiguration);
            setEditDescription(false);
            setModalInfo({});
          }
        },
        cancel: function () {
          setEditDescription(false);
          setModalInfo({});
        }
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm_check-button"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    className: "gm_button-small",
    onClick: () => {
      setEditDescription(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm_cancel-button"
  }))) : /*#__PURE__*/React.createElement("p", {
    className: "gm_group_desc"
  }, groupConfiguration?.attributes?.description && groupConfiguration?.attributes?.description[0] || "No descritption available.", /*#__PURE__*/React.createElement("div", {
    className: "gm_edit-icon",
    onClick: () => {
      setEditDescription(true);
    }
  })), /*#__PURE__*/React.createElement(Tabs, {
    className: "gm_tabs",
    activeKey: activeTabKey,
    onSelect: handleTabClick,
    isBox: false,
    "aria-label": "Tabs in the default example",
    role: "region"
  }, /*#__PURE__*/React.createElement(Tab, {
    eventKey: 0,
    title: /*#__PURE__*/React.createElement(TabTitleText, null, "Group Details"),
    "aria-label": "Default content - users"
  }, /*#__PURE__*/React.createElement(GroupDetails, {
    groupConfiguration: groupConfiguration,
    groupId: groupId,
    setGroupConfiguration: setGroupConfiguration
  })), /*#__PURE__*/React.createElement(Tab, {
    eventKey: 1,
    title: /*#__PURE__*/React.createElement(TabTitleText, null, "Group Members"),
    "aria-label": "Default content - members"
  }, /*#__PURE__*/React.createElement(GroupMembers, {
    groupConfiguration: groupConfiguration,
    groupId: groupId,
    user: user
  })), /*#__PURE__*/React.createElement(Tab, {
    eventKey: 2,
    title: /*#__PURE__*/React.createElement(TabTitleText, null, "Group Admins"),
    "aria-label": "Default content - admins"
  }, /*#__PURE__*/React.createElement(GroupAdmins, {
    groupId: groupId,
    user: user,
    groupConfiguration: groupConfiguration,
    setGroupConfiguration: setGroupConfiguration,
    fetchGroupConfiguration: fetchGroupConfiguration
  })), /*#__PURE__*/React.createElement(Tab, {
    eventKey: 3,
    title: /*#__PURE__*/React.createElement(TabTitleText, null, "Group Enrollment Configuration"),
    "aria-label": "Default content - attributes"
  }, /*#__PURE__*/React.createElement(GroupEnrollment, {
    groupConfiguration: groupConfiguration,
    groupId: groupId,
    setGroupConfiguration: setGroupConfiguration,
    fetchGroupConfiguration: fetchGroupConfiguration,
    updateAttributes: updateAttributes
  })), /*#__PURE__*/React.createElement(Tab, {
    eventKey: 4,
    title: /*#__PURE__*/React.createElement(TabTitleText, null, "Group Attributes"),
    "aria-label": "Default content - attributes"
  }, /*#__PURE__*/React.createElement(GroupAttributes, {
    groupConfiguration: groupConfiguration,
    setGroupConfiguration: setGroupConfiguration,
    fetchGroupConfiguration: fetchGroupConfiguration,
    updateAttributes: updateAttributes
  }))))));
};
//# sourceMappingURL=AdminGroupPage.js.map