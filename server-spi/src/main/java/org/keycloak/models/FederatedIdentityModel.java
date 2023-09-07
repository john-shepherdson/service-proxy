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

package org.keycloak.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.keycloak.representations.idm.FederatedIdentityAttributeRepresentation;

/**
 * @author <a href="mailto:mposolda@redhat.com">Marek Posolda</a>
 */
public class FederatedIdentityModel {

    private String token;
    private final String userId;
    private String identityProvider;
    private final String userName;
    private List<FederatedIdentityAttributeRepresentation> attributes;

    public FederatedIdentityModel(String identityProvider, String userId, String userName) {
        this(identityProvider, userId, userName, (String)null, (List) null);
    }

    public FederatedIdentityModel(String identityProvider, String userId, String userName, List<FederatedIdentityAttributeRepresentation> attributes) {
        this(identityProvider, userId, userName, (String)null, attributes);
    }

    public FederatedIdentityModel(String providerId, String userId, String userName, String token) {
        this(providerId, userId, userName, token, (List) null);
    }

    public FederatedIdentityModel(String providerId, String userId, String userName, String token, List<FederatedIdentityAttributeRepresentation> attributes) {
        this.identityProvider = providerId;
        this.userId = userId;
        this.userName = userName;
        this.token = token;
        this.attributes = attributes;
    }

    public FederatedIdentityModel(String providerId,  String userId, String userName, String token, Map<String, Object> contextData, String firstName, String lastName, String email) {
        List<FederatedIdentityAttributeRepresentation> attributesList = new ArrayList<>();
        contextData.entrySet().stream().forEach(x->attributesList.add(new FederatedIdentityAttributeRepresentation(x.getKey(), x.getValue().toString())));
        if (firstName != null)
            attributesList.add(new FederatedIdentityAttributeRepresentation("firstName",firstName));
        if (lastName != null)
            attributesList.add(new FederatedIdentityAttributeRepresentation("lastName",lastName));
        if (email != null)
            attributesList.add(new FederatedIdentityAttributeRepresentation("email",email));
        this.identityProvider = providerId;
        this.userId = userId;
        this.userName = userName;
        this.token = token;
        this.attributes = attributesList;
    }

    public FederatedIdentityModel(FederatedIdentityModel originalIdentity, String userId) {
        identityProvider = originalIdentity.getIdentityProvider();
        this.userId = userId;
        userName = originalIdentity.getUserName();
        token = originalIdentity.getToken();
    }

    public String getUserId() {
        return userId;
    }

    public void setIdentityProvider(String identityProvider) {
        this.identityProvider = identityProvider;
    }

    public String getIdentityProvider() {
        return identityProvider;
    }

    public String getUserName() {
        return userName;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<FederatedIdentityAttributeRepresentation> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<FederatedIdentityAttributeRepresentation> attributes) {
        this.attributes = attributes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FederatedIdentityModel that = (FederatedIdentityModel) o;

        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (!identityProvider.equals(that.identityProvider)) return false;
        return userName != null ? userName.equals(that.userName) : that.userName == null;

    }

    @Override
    public int hashCode() {
        int result = userId != null ? userId.hashCode() : 0;
        result = 31 * result + identityProvider.hashCode();
        result = 31 * result + (userName != null ? userName.hashCode() : 0);
        return result;
    }
}
