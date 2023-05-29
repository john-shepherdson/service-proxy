/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "../../../../common/keycloak/web_modules/react.js"; // @ts-ignore

import { KeycloakService } from "../../keycloak-service/keycloak.service.js"; // @ts-ignore

import { Card, CardBody, EmptyState, EmptyStateBody, EmptyStateVariant, Title, Banner } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js";
const keycloakService = new KeycloakService(keycloak);
export class GroupsManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      s: null
    };
  }

  componentDidMount() {
    isReactLoading = false;
    console.log("componentDidMount");
    this.testServices();
  }

  testServices() {
    //get token
    keycloakService.getToken().then(token => {
      console.log("AccessToken: ", token);
      this.setState({
        accessToken: token
      });
    }).catch(err => {
      console.log("Error: ", err);
    });
  }

  render() {
    console.log("rendering GroupsManagementPage");
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Banner, {
      variant: "info"
    }, "There are pending"), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(EmptyState, {
      variant: EmptyStateVariant.small
    }, /*#__PURE__*/React.createElement(Title, {
      headingLevel: "h4",
      size: "lg"
    }, "Keycloak Man Loves JSX, React, and PatternFly ETC ----aaaa"), /*#__PURE__*/React.createElement(EmptyStateBody, null, "Token is: ", this.state.accessToken), /*#__PURE__*/React.createElement(Title, {
      headingLevel: "h4",
      size: "lg"
    }, "But you can use whatever you want as long as you wrap it in a React Component.")))));
  }

}
;
//# sourceMappingURL=GroupManagementPage.js.map