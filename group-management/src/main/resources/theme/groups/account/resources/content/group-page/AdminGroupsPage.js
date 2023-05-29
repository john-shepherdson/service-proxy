import * as React from "../../../../common/keycloak/web_modules/react.js";
import { useState, useEffect } from "../../../../common/keycloak/web_modules/react.js";
import { DataListContent, DataList, DataListItem, DataListItemCells, DataListItemRow, DataListCell, Breadcrumb, BreadcrumbItem, Pagination } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js";
import { Link } from "../../../../common/keycloak/web_modules/react-router-dom.js"; //import { fa-search } from '@patternfly/react-icons';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore

import { ContentPage } from "../ContentPage.js";
import { GroupsServiceClient } from "../../groups-mngnt-service/groups.service.js"; // @ts-ignore

import { Msg } from "../../widgets/Msg.js";
import { SearchInput } from "../../group-widgets/GroupAdminPage/SearchInput.js";
export const AdminGroupsPage = props => {
  // export class AdminGroupsPage extends React.Component<AdminGroupsPageProps, AdminGroupsPageState> {
  let groupsService = new GroupsServiceClient();
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const onSetPage = (_event, newPage) => {
    setPage(newPage);
  };

  const onPerPageSelect = (_event, newPerPage, newPage) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  useEffect(() => {
    fetchAdminGroups();
  }, [perPage, page]);
  useEffect(() => {
    fetchAdminGroups();
  }, []);

  let fetchAdminGroups = (searchString = undefined) => {
    groupsService.doGet("/group-admin/groups?first=" + perPage * (page - 1) + "&max=" + perPage + (searchString ? "&search=" + searchString : ""), {
      params: {
        test: "test"
      }
    }).then(response => {
      let count = response?.data?.count || 0;
      setTotalItems(count);
      setGroups(response?.data?.results || []); //setExpandedIds([]);        
    });
  };

  const emptyGroup = () => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      key: "emptyItem",
      "aria-labelledby": "empty-item"
    }, /*#__PURE__*/React.createElement(DataListItemRow, {
      key: "emptyRow"
    }, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        key: "empty"
      }, /*#__PURE__*/React.createElement("strong", null, "No groups found"))]
    })));
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "gm_content"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    className: "gm_breadcumb"
  }, /*#__PURE__*/React.createElement(BreadcrumbItem, {
    to: "#"
  }, "Account Console"), /*#__PURE__*/React.createElement(BreadcrumbItem, {
    isActive: true
  }, Msg.localize('adminGroupLabel'))), /*#__PURE__*/React.createElement(ContentPage, {
    title: Msg.localize('adminGroupLabel')
  }, /*#__PURE__*/React.createElement(SearchInput, {
    searchText: "Search based on Group Name",
    cancelText: "View All Groups",
    search: searchString => {
      fetchAdminGroups(searchString);
      setPage(1);
    }
  }), /*#__PURE__*/React.createElement(DataList, {
    id: "groups-list",
    "aria-label": Msg.localize('groupLabel'),
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    id: "groups-list-header",
    "aria-labelledby": "Columns names"
  }, /*#__PURE__*/React.createElement(DataListItemRow, {
    className: "gm_datalist-header"
  }, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "group-name-header",
      width: 2
    }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Msg, {
      msgKey: "Name"
    }))), /*#__PURE__*/React.createElement(DataListCell, {
      key: "group-path-header",
      width: 2
    }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Msg, {
      msgKey: "Path"
    })))]
  }))), groups.length === 0 ? emptyGroup() : groups.map((group, appIndex) => {
    return /*#__PURE__*/React.createElement(GroupListItem, {
      group: group,
      appIndex: appIndex,
      depth: 0
    });
  })), /*#__PURE__*/React.createElement(Pagination, {
    itemCount: totalItems,
    perPage: perPage,
    page: page,
    onSetPage: onSetPage,
    widgetId: "top-example",
    onPerPageSelect: onPerPageSelect
  })));
};

const GroupListItem = ({
  group,
  appIndex,
  depth
}) => {
  useEffect(() => {
    setExpanded(false);
  }, [group]);
  const [expanded, setExpanded] = useState(false);
  return /*#__PURE__*/React.createElement(DataListItem, {
    id: `${appIndex}-group`,
    key: 'group-' + appIndex,
    className: "gm_expandable-list" + (group?.extraSubGroups.length > 0 ? " gm_expandable-list-item" : ""),
    "aria-labelledby": "groups-list",
    isExpanded: expanded
  }, /*#__PURE__*/React.createElement(DataListItemRow, {
    style: {
      "paddingLeft": (depth === 0 ? 2 : 3 + depth - 1) + (group?.extraSubGroups.length > 0 ? 0 : 0.4) + "rem"
    }
  }, group?.extraSubGroups.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "gm_epxand-toggle",
    onClick: () => {
      setExpanded(!expanded);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: expanded ? "gm_epxand-toggle-expanded" : "gm_epxand-toggle-hidden"
  })) : null, /*#__PURE__*/React.createElement(Link, {
    to: "/groups/admingroups/" + group.id
  }, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      id: `${appIndex}-group-name`,
      width: 2,
      key: 'name-' + appIndex
    }, group.name), /*#__PURE__*/React.createElement(DataListCell, {
      id: `${appIndex}-group-path`,
      width: 2,
      key: 'path-' + appIndex
    }, group.path)]
  }))), /*#__PURE__*/React.createElement(DataListContent, {
    "aria-label": "First expandable content details",
    id: "ex-expand1",
    isHidden: !expanded
  }, group?.extraSubGroups.length > 0 ? group?.extraSubGroups.map((subGroup, appSubIndex) => {
    return /*#__PURE__*/React.createElement(GroupListItem, {
      group: subGroup,
      appIndex: appSubIndex,
      depth: depth + 1
    });
  }) : null));
};
//# sourceMappingURL=AdminGroupsPage.js.map