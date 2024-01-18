package org.keycloak.protocol.oidc.utils;

import java.io.Serializable;

public class Key implements Serializable {

    private String tokenStr;
    private String realmName;

    public Key(String tokenStr, String realmName) {
        this.tokenStr = tokenStr;
        this.realmName = realmName;
    }

    public String getTokenStr() {
        return tokenStr;
    }

    public String getRealmName() {
        return realmName;
    }

    @Override
    public boolean equals(Object obj) {
        if(obj != null && obj instanceof Key) {
            Key s = (Key)obj;
            return tokenStr.equals(s.tokenStr) && realmName.equals(s.realmName);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return (tokenStr + realmName).hashCode();
    }


    @Override
    public String toString() {
        return tokenStr + realmName;
    }

}