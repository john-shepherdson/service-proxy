package org.keycloak.broker.federation;

import java.io.InputStream;
import java.util.Set;

import jakarta.ws.rs.core.Response;
import org.keycloak.models.FederationModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakUriInfo;
import org.keycloak.models.RealmModel;
import org.keycloak.provider.Provider;

public interface FederationProvider<C extends FederationModel> extends Provider {

	Set<String> parseIdps(KeycloakSession session, InputStream inputStream);

	String updateFederation();

	void updateSamlEntities();

	void removeFederation();

	void enableUpdateTask();

	Response export(KeycloakUriInfo uriInfo, RealmModel realm);
	
}
