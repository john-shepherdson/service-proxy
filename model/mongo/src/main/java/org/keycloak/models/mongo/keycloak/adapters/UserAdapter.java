package org.keycloak.models.mongo.keycloak.adapters;

import org.keycloak.models.ApplicationModel;
import org.keycloak.models.AuthenticationLinkModel;
import org.keycloak.models.ClientModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.RoleModel;
import org.keycloak.models.UserCredentialModel;
import org.keycloak.models.UserCredentialValueModel;
import org.keycloak.models.UserModel;
import org.keycloak.models.entities.AuthenticationLinkEntity;
import org.keycloak.models.entities.CredentialEntity;
import org.keycloak.models.mongo.api.context.MongoStoreInvocationContext;
import org.keycloak.models.mongo.keycloak.entities.MongoRoleEntity;
import org.keycloak.models.mongo.keycloak.entities.MongoUserEntity;
import org.keycloak.models.mongo.utils.MongoModelUtils;
import org.keycloak.models.utils.Pbkdf2PasswordEncoder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Wrapper around UserData object, which will persist wrapped object after each set operation (compatibility with picketlink based idm)
 *
 * @author <a href="mailto:mposolda@redhat.com">Marek Posolda</a>
 */
public class UserAdapter extends AbstractMongoAdapter<MongoUserEntity> implements UserModel {

    private final MongoUserEntity user;
    private final RealmModel realm;
    private final KeycloakSession session;

    public UserAdapter(KeycloakSession session, RealmModel realm, MongoUserEntity userEntity, MongoStoreInvocationContext invContext) {
        super(invContext);
        this.user = userEntity;
        this.realm = realm;
        this.session = session;
    }

    @Override
    public String getId() {
        return user.getId();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public void setUsername(String username) {
        user.setUsername(username);
        updateUser();
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }

    @Override
    public void setEnabled(boolean enabled) {
        user.setEnabled(enabled);
        updateUser();
    }

    @Override
    public int getNotBefore() {
        return user.getNotBefore();
    }

    @Override
    public void setNotBefore(int notBefore) {
        user.setNotBefore(notBefore);
    }

    @Override
    public String getFirstName() {
        return user.getFirstName();
    }

    @Override
    public void setFirstName(String firstName) {
        user.setFirstName(firstName);
        updateUser();
    }

    @Override
    public String getLastName() {
        return user.getLastName();
    }

    @Override
    public void setLastName(String lastName) {
        user.setLastName(lastName);
        updateUser();
    }

    @Override
    public String getEmail() {
        return user.getEmail();
    }

    @Override
    public void setEmail(String email) {
        user.setEmail(email);
        updateUser();
    }

    @Override
    public boolean isEmailVerified() {
        return user.isEmailVerified();
    }

    @Override
    public void setEmailVerified(boolean verified) {
        user.setEmailVerified(verified);
        updateUser();
    }

    @Override
    public void setAttribute(String name, String value) {
        if (user.getAttributes() == null) {
            user.setAttributes(new HashMap<String, String>());
        }

        user.getAttributes().put(name, value);
        updateUser();
    }

    @Override
    public void removeAttribute(String name) {
        if (user.getAttributes() == null) return;

        user.getAttributes().remove(name);
        updateUser();
    }

    @Override
    public String getAttribute(String name) {
        return user.getAttributes()==null ? null : user.getAttributes().get(name);
    }

    @Override
    public Map<String, String> getAttributes() {
        return user.getAttributes()==null ? Collections.EMPTY_MAP : Collections.unmodifiableMap(user.getAttributes());
    }

    public MongoUserEntity getUser() {
        return user;
    }


    @Override
    public Set<RequiredAction> getRequiredActions() {
        Set<RequiredAction> result = new HashSet<RequiredAction>();
        if (user.getRequiredActions() != null) {
            result.addAll(user.getRequiredActions());
        }
        return result;
    }

    @Override
    public void addRequiredAction(RequiredAction action) {
        getMongoStore().pushItemToList(user, "requiredActions", action, true, invocationContext);
    }

    @Override
    public void removeRequiredAction(RequiredAction action) {
        getMongoStore().pullItemFromList(user, "requiredActions", action, invocationContext);
    }

    @Override
    public boolean isTotp() {
        return user.isTotp();
    }

    @Override
    public void setTotp(boolean totp) {
        user.setTotp(totp);
        updateUser();
    }

    @Override
    public void updateCredential(UserCredentialModel cred) {
        CredentialEntity credentialEntity = getCredentialEntity(user, cred.getType());

        if (credentialEntity == null) {
            credentialEntity = new CredentialEntity();
            credentialEntity.setType(cred.getType());
            credentialEntity.setDevice(cred.getDevice());
            user.getCredentials().add(credentialEntity);
        }
        if (cred.getType().equals(UserCredentialModel.PASSWORD)) {
            byte[] salt = Pbkdf2PasswordEncoder.getSalt();
            credentialEntity.setValue(new Pbkdf2PasswordEncoder(salt).encode(cred.getValue()));
            credentialEntity.setSalt(salt);
        } else {
            credentialEntity.setValue(cred.getValue());
        }
        credentialEntity.setDevice(cred.getDevice());

        getMongoStore().updateEntity(user, invocationContext);
    }

    private CredentialEntity getCredentialEntity(MongoUserEntity userEntity, String credType) {
        for (CredentialEntity entity : userEntity.getCredentials()) {
            if (entity.getType().equals(credType)) {
                return entity;
            }
        }

        return null;
    }

    @Override
    public List<UserCredentialValueModel> getCredentialsDirectly() {
        List<CredentialEntity> credentials = user.getCredentials();
        List<UserCredentialValueModel> result = new ArrayList<UserCredentialValueModel>();
        for (CredentialEntity credEntity : credentials) {
            UserCredentialValueModel credModel = new UserCredentialValueModel();
            credModel.setType(credEntity.getType());
            credModel.setDevice(credEntity.getDevice());
            credModel.setValue(credEntity.getValue());
            credModel.setSalt(credEntity.getSalt());

            result.add(credModel);
        }

        return result;
    }

    @Override
    public void updateCredentialDirectly(UserCredentialValueModel credModel) {
        CredentialEntity credentialEntity = getCredentialEntity(user, credModel.getType());

        if (credentialEntity == null) {
            credentialEntity = new CredentialEntity();
            credentialEntity.setType(credModel.getType());
            user.getCredentials().add(credentialEntity);
        }

        credentialEntity.setValue(credModel.getValue());
        credentialEntity.setSalt(credModel.getSalt());
        credentialEntity.setDevice(credModel.getDevice());

        getMongoStore().updateEntity(user, invocationContext);
    }

    protected void updateUser() {
        super.updateMongoEntity();
    }

    @Override
    public MongoUserEntity getMongoEntity() {
        return user;
    }

    @Override
    public boolean hasRole(RoleModel role) {
        Set<RoleModel> roles = getRoleMappings();
        if (roles.contains(role)) return true;

        for (RoleModel mapping : roles) {
            if (mapping.hasRole(role)) return true;
        }
        return false;
    }

    @Override
    public void grantRole(RoleModel role) {
        getMongoStore().pushItemToList(getUser(), "roleIds", role.getId(), true, invocationContext);
    }

    @Override
    public Set<RoleModel> getRoleMappings() {
        Set<RoleModel> result = new HashSet<RoleModel>();
        List<MongoRoleEntity> roles = MongoModelUtils.getAllRolesOfUser(this, invocationContext);

        for (MongoRoleEntity role : roles) {
            if (realm.getId().equals(role.getRealmId())) {
                result.add(new RoleAdapter(session, realm, role, realm, invocationContext));
            } else {
                // Likely applicationRole, but we don't have this application yet
                result.add(new RoleAdapter(session, realm, role, invocationContext));
            }
        }
        return result;
    }

    @Override
    public Set<RoleModel> getRealmRoleMappings() {
        Set<RoleModel> allRoles = getRoleMappings();

        // Filter to retrieve just realm roles TODO: Maybe improve to avoid filter programmatically... Maybe have separate fields for realmRoles and appRoles on user?
        Set<RoleModel> realmRoles = new HashSet<RoleModel>();
        for (RoleModel role : allRoles) {
            MongoRoleEntity roleEntity = ((RoleAdapter) role).getRole();

            if (realm.getId().equals(roleEntity.getRealmId())) {
                realmRoles.add(role);
            }
        }
        return realmRoles;
    }

    @Override
    public void deleteRoleMapping(RoleModel role) {
        if (user == null || role == null) return;

        getMongoStore().pullItemFromList(getUser(), "roleIds", role.getId(), invocationContext);
    }

    @Override
    public Set<RoleModel> getApplicationRoleMappings(ApplicationModel app) {
        Set<RoleModel> result = new HashSet<RoleModel>();
        List<MongoRoleEntity> roles = MongoModelUtils.getAllRolesOfUser(this, invocationContext);

        for (MongoRoleEntity role : roles) {
            if (app.getId().equals(role.getApplicationId())) {
                result.add(new RoleAdapter(session, realm, role, app, invocationContext));
            }
        }
        return result;
    }

    @Override
    public AuthenticationLinkModel getAuthenticationLink() {
        AuthenticationLinkEntity authLinkEntity = user.getAuthenticationLink();

        if (authLinkEntity == null) {
            return null;
        } else {
            return new AuthenticationLinkModel(authLinkEntity.getAuthProvider(), authLinkEntity.getAuthUserId());
        }
    }

    @Override
    public void setAuthenticationLink(AuthenticationLinkModel authenticationLink) {
        AuthenticationLinkEntity authLinkEntity = new AuthenticationLinkEntity();
        authLinkEntity.setAuthProvider(authenticationLink.getAuthProvider());
        authLinkEntity.setAuthUserId(authenticationLink.getAuthUserId());
        user.setAuthenticationLink(authLinkEntity);

        getMongoStore().updateEntity(user, invocationContext);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || !(o instanceof UserModel)) return false;

        UserModel that = (UserModel) o;
        return that.getId().equals(getId());
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
