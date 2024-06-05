package org.keycloak.sessions;

import org.keycloak.Config;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.provider.EnvironmentDependentProviderFactory;
import org.keycloak.provider.ProviderConfigProperty;

import java.util.List;

public class DisabledStickySessionEncoderProvider implements StickySessionEncoderProviderFactory, StickySessionEncoderProvider,
        EnvironmentDependentProviderFactory {

    @Override
    public StickySessionEncoderProvider create(KeycloakSession session) {
        return this;
    }

    @Override
    public String encodeSessionId(String sessionId) {
        return sessionId;
    }

    @Override
    public String decodeSessionId(String encodedSessionId) {
        return encodedSessionId;
    }

    @Override
    public boolean shouldAttachRoute() {
        return false;
    }

    @Override
    public void init(Config.Scope config) {

    }

    @Override
    public void postInit(KeycloakSessionFactory factory) {

    }

    @Override
    public void close() {

    }

    @Override
    public String getId() {
        return "disabled";
    }

    @Override
    public int order() {
        return StickySessionEncoderProviderFactory.super.order();
    }

    @Override
    public List<ProviderConfigProperty> getConfigMetadata() {
        return StickySessionEncoderProviderFactory.super.getConfigMetadata();
    }

    @Override
    public boolean isSupported() {
        return false;
    }

    @Override
    public boolean isSupported(Config.Scope config) {
        return false;
    }
}

