package org.keycloak.models.jpa.entities;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Nationalized;

@Table(name="FEDERATED_IDENTITY_ATTRIBUTE")
@Entity
public class FederatedIdentityAttributeEntity {

    @Id
    @Column(name="ID", length = 36)
    @Access(AccessType.PROPERTY) // we do this because relationships often fetch id, but not entity.  This avoids an extra SQL
    private String id;

    @BatchSize(size = 50)
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="USER_ID", referencedColumnName="USER_ID")
    @JoinColumn(name="IDENTITY_PROVIDER", referencedColumnName="IDENTITY_PROVIDER")
    private FederatedIdentityEntity federatedIdentity;

    @Column(name = "NAME")
    private String name;
    @Nationalized
    @Column(name = "VALUE")
    private String value;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public FederatedIdentityEntity getFederatedIdentity() {
        return federatedIdentity;
    }

    public void setFederatedIdentity(FederatedIdentityEntity federatedIdentity) {
        this.federatedIdentity = federatedIdentity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
