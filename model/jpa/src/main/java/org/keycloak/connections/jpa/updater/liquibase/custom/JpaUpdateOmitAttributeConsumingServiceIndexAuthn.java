package org.keycloak.connections.jpa.updater.liquibase.custom;

import liquibase.exception.CustomChangeException;

public class JpaUpdateOmitAttributeConsumingServiceIndexAuthn extends CustomKeycloakTask {

    @Override
    protected void generateStatementsImpl() throws CustomChangeException {

    }

    @Override
    protected String getTaskId() {
        return "Add omitAttributeConsumingServiceIndexAuthn true when attributeConsumingServiceIndex is null for SAML IdP";
    }
}
