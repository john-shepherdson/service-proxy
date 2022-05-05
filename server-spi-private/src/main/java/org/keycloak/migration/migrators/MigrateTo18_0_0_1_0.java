package org.keycloak.migration.migrators;

import org.keycloak.migration.ModelVersion;
import org.keycloak.models.AccountRoles;
import org.keycloak.models.ClientModel;
import org.keycloak.models.Constants;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.RoleModel;
import org.keycloak.representations.idm.RealmRepresentation;

public class MigrateTo18_0_0_1_0 implements Migration {

    public static final ModelVersion VERSION = new ModelVersion("18.0.0-1.0");

    @Override
    public void migrate(KeycloakSession session) {

        session.realms().getRealmsStream().forEach(this::addViewGroupsRole);
    }

    @Override
    public void migrateImport(KeycloakSession session, RealmModel realm, RealmRepresentation rep, boolean skipUserDependent) {
        addViewGroupsRole(realm);
    }

    private void addViewGroupsRole(RealmModel realm) {
        ClientModel accountClient = realm.getClientByClientId(Constants.ACCOUNT_MANAGEMENT_CLIENT_ID);
        if (accountClient != null && accountClient.getRole(AccountRoles.VIEW_GROUPS) == null) {
            RoleModel viewAppRole = accountClient.addRole(AccountRoles.VIEW_GROUPS);
            viewAppRole.setDescription("${role_" + AccountRoles.VIEW_GROUPS + "}");
        }
    }

    @Override
    public ModelVersion getVersion() {
        return VERSION;
    }
}
