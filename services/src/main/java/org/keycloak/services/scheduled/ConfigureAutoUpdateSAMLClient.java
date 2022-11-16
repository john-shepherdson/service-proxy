package org.keycloak.services.scheduled;

import org.keycloak.models.ClientModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.protocol.saml.SamlConfigAttributes;
import org.keycloak.timer.TimerProvider;

import java.time.Instant;

public class ConfigureAutoUpdateSAMLClient {

    public static void configure(ClientModel clientModel, RealmModel realm, KeycloakSession session){
        AutoUpdateSAMLClient autoUpdateProvider = new AutoUpdateSAMLClient(clientModel.getId(), realm.getId());
        Long intervalClient = Long.parseLong(clientModel.getAttributes().get(SamlConfigAttributes.SAML_REFRESH_PERIOD)) * 1000;
        Long delay = clientModel.getAttributes().get(SamlConfigAttributes.SAML_LAST_REFRESH_TIME) == null ? 1000 : Long.parseLong(clientModel.getAttributes().get(SamlConfigAttributes.SAML_LAST_REFRESH_TIME) )+ Long.parseLong(clientModel.getAttributes().get(SamlConfigAttributes.SAML_REFRESH_PERIOD)) * 1000 - Instant.now().toEpochMilli();
        ClusterAwareScheduledTaskRunner taskRunner = new ClusterAwareScheduledTaskRunner(session.getKeycloakSessionFactory(), autoUpdateProvider, intervalClient);
        session.getProvider(TimerProvider.class).schedule(taskRunner, delay > 1000 ? delay : 1000, intervalClient, "AutoUpdateSAMLClient_" + clientModel.getId());
    }
}
