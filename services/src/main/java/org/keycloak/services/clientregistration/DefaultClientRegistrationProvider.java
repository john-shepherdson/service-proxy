/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.keycloak.services.clientregistration;

import org.keycloak.connections.httpclient.HttpClientProvider;
import org.keycloak.models.ClientModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.protocol.saml.EntityDescriptorDescriptionConverter;
import org.keycloak.protocol.saml.SamlConfigAttributes;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.services.scheduled.AutoUpdateSAMLClient;
import org.keycloak.services.scheduled.ClusterAwareScheduledTaskRunner;
import org.keycloak.timer.TimerProvider;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.io.IOException;
import java.net.URI;
import java.time.Instant;

/**
 * @author <a href="mailto:sthorger@redhat.com">Stian Thorgersen</a>
 */
public class DefaultClientRegistrationProvider extends AbstractClientRegistrationProvider {

    public DefaultClientRegistrationProvider(KeycloakSession session) {
        super(session);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createDefault(ClientRepresentation client) {
        DefaultClientRegistrationContext context = new DefaultClientRegistrationContext(session, client, this);
        //check for saml autoupdated client
        if ("saml".equals(client.getProtocol()) && client.getAttributes() != null && Boolean.valueOf(client.getAttributes().get(SamlConfigAttributes.SAML_AUTO_UPDATED))){
            try {
                EntityDescriptorDescriptionConverter.loadEntityDescriptors(session.getProvider(HttpClientProvider.class).get(client.getAttributes().get(SamlConfigAttributes.SAML_METADATA_URL)), client);
                client.getAttributes().put(SamlConfigAttributes.SAML_LAST_REFRESH_TIME, String.valueOf(Instant.now().toEpochMilli()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        client = create(context);
        validateClient(client, true);
        URI uri = session.getContext().getUri().getAbsolutePathBuilder().path(client.getClientId()).build();
        return Response.created(uri).entity(client).build();
    }

    @GET
    @Path("{clientId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDefault(@PathParam("clientId") String clientId) {
        ClientModel client = session.getContext().getRealm().getClientByClientId(clientId);
        ClientRepresentation clientRepresentation = get(client);
        return Response.ok(clientRepresentation).build();
    }

    @PUT
    @Path("{clientId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateDefault(@PathParam("clientId") String clientId, ClientRepresentation client) {
        DefaultClientRegistrationContext context = new DefaultClientRegistrationContext(session, client, this);
        client = update(clientId, context);
        validateClient(client, false);
        return Response.ok(client).build();
    }

    @DELETE
    @Path("{clientId}")
    public void deleteDefault(@PathParam("clientId") String clientId) {
        delete(clientId);
    }
}
