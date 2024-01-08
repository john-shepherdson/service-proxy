package org.keycloak.services.scheduled;

import org.jboss.logging.Logger;
import org.keycloak.models.FederationModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.timer.ScheduledTask;

import java.util.List;

public class RemoveFederation implements ScheduledTask {

    protected static final Logger logger = Logger.getLogger(UpdateFederation.class);

    protected final String federationId;
    protected final String realmId;

    public RemoveFederation(String federationId, String realmId) {
        this.federationId = federationId;
        this.realmId = realmId;
    }

    @Override
    public void run(KeycloakSession session) {
        logger.info(" Task Removing federation with id " + federationId + " and realm id " + realmId);
        RealmModel realm = session.realms().getRealm(realmId);
        if ( realm != null) {
            FederationModel model = realm.getSAMLFederationById(federationId);

            List<String> existingIdps = realm.getIdentityProvidersByFederation(model.getInternalId());
            existingIdps.stream().forEach(idpAlias -> realm.removeFederationIdp(model, idpAlias));

            realm.removeSAMLFederation(model.getInternalId());
            logger.info(" Finishing federation removal with id " + federationId + " and realm id " + realmId);
        }
    }



}

