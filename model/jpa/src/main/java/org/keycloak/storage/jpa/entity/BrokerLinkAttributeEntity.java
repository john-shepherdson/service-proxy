package org.keycloak.storage.jpa.entity;

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

@Table(name="BROKER_LINK_ATTRIBUTE")
@Entity
public class BrokerLinkAttributeEntity {

    @Id
    @Column(name="ID", length = 36)
    @Access(AccessType.PROPERTY) // we do this because relationships often fetch id, but not entity.  This avoids an extra SQL
    private String id;

    @BatchSize(size = 50)
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="USER_ID", referencedColumnName="USER_ID")
    @JoinColumn(name="IDENTITY_PROVIDER", referencedColumnName="IDENTITY_PROVIDER")
    private BrokerLinkEntity brokerLink;

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

    public BrokerLinkEntity getBrokerLinkEntity() {
        return brokerLink;
    }

    public void setBrokerLinkEntity(BrokerLinkEntity brokerLink) {
        this.brokerLink = brokerLink;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        if (!(o instanceof BrokerLinkAttributeEntity)) return false;

        BrokerLinkAttributeEntity that = (BrokerLinkAttributeEntity) o;

        if (!id.equals(that.getId())) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
