# Changelog
All notable eosc-kc changes of Keycloak will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For Keycloak upstream changelog please see https://www.keycloak.org/docs/latest/release_notes/index.html.
[Keycloak release note 22](https://www.keycloak.org/docs/latest/release_notes/index.html#keycloak-22-0-3)
Full Keycloak upstream jira issue can be shown if filtered by Fix version.

Our Keycloak version is working well with PostgreSQL database. For using other SQL databases, text field in database need to be evaluated.

## [Unreleased]

### Added
- Eosc-kc version model with MigrationModel changes [RCIAM-945](https://jira.argo.grnet.gr/browse/RCIAM-945)
- Support for SAML Federation
- Identity Providers pager in Linked Accounts of Account Console. [EOSC-KC-50](https://github.com/eosc-kc/keycloak/issues/50)
- User reaccepting Terms and Conditions. [EOSC-KC-48](https://github.com/eosc-kc/keycloak/issues/48)
- Terms and Conditions - periodic reset for all realm users. [EOSC-KC-49](https://github.com/eosc-kc/keycloak/issues/49)
- Email notification for add/remove group. [EOSC-KC-75](https://github.com/eosc-kc/keycloak/issues/75)
- SAML/ OIDC Identity Provider AutoUpdate. [EOSC-KC-119](https://github.com/eosc-kc/keycloak/issues/119)
- External introspection endpoint [EOSC-KC-140](https://github.com/eosc-kc/keycloak/issues/140)
- New release created on tag
- The idpLoginFullUrl common attribute passed to the ftl templates for any theme except from the default
- Add scope parameter to token exchange [RCIAM-834](https://jira.argo.grnet.gr/browse/RCIAM-834)
- Hide scopes from scopes_supported in discovery endpoint [RCIAM-859](https://jira.argo.grnet.gr/browse/RCIAM-859)
- Id token lifespan [RCIAM-930](https://jira.argo.grnet.gr/browse/RCIAM-930)
- Add indexes to related to Federation and Identity Provider tables
- Resource request parameter and audience in access token [RCIAM-1061](https://jira.argo.grnet.gr/browse/RCIAM-1061)
- Autoupdated SAML Client [RCIAM-1181](https://jira.argo.grnet.gr/browse/RCIAM-1181)
- Client scope policy [RCIAM-1241](https://jira.argo.grnet.gr/browse/RCIAM-1241)
- Sort Identity Providers by guiOrder and displayname
- Add authnAuthority and voPersonID user attribute to event details
- Login events type for add, remove, suspend user from a group [RCIAM-1292](https://jira.argo.grnet.gr/browse/RCIAM-1292)
- Include claim in token introspection response only [RCIAM-742](https://jira.argo.grnet.gr/browse/RCIAM-742)
- Enhanced TokenIntrospection and UserInfo events and logs
- Configurable Claims for dynamic scopes, Filter dynamic scopes from access token scope [RCIAM-1190](https://jira.argo.grnet.gr/browse/RCIAM-1190)
- Database script for migration from version 18.0.1-2.17 to 22.0.5-1.1
- Mapper for generating SAML attribute values or Claim values using IdP alias or User Attribute values [Mapper for generating SAML attribute values or Claim values using other SAML attribute/Claim values as input](https://trello.com/c/8K46f2mo/1642-mapper-for-generating-saml-attribute-values-or-claim-values-using-other-saml-attribute-claim-values-as-input)

### Changed
- Increase User Attribute Value length to 4000 [EOSC-KC-132](https://github.com/eosc-kc/keycloak/issues/132)
- FreeMarkerLoginFormsProvider now has an additional common attribute passed to the ftl templates, the "uriInfo"
- Change emailVerified User field with UserAttributeMappers (conditional trust email). [EOSC-KC-70](https://github.com/eosc-kc/keycloak/issues/70)
- Offline_access scope return always refresh_token [RCIAM-744](https://jira.argo.grnet.gr/browse/RCIAM-744)
- Signing of SAML IdP logout requests separately [RCIAM-881](https://jira.argo.grnet.gr/browse/RCIAM-881)
- Allow omitting NameIDFormat [RCIAM-882](https://jira.argo.grnet.gr/browse/RCIAM-882)
- Record SAML login events based on SAML IdP entityID [EOSC-KC-134](https://github.com/eosc-kc/keycloak/issues/134)
- Add ePTID principal option [RCIAM-916](https://jira.argo.grnet.gr/browse/RCIAM-916)
- Add is required configuration option for UserAttributeMapper and AttributeToRoleMapper [RCIAM-861](https://jira.argo.grnet.gr/browse/RCIAM-861)
- Support for configuring claims supported in Keycloak OP metadata [RCIAM-899](https://jira.argo.grnet.gr/browse/RCIAM-899)
- Specific error page for no principals [RCIAM-766](https://jira.argo.grnet.gr/browse/RCIAM-766)
- Refresh token revoke per client and correct refresh flow [RCIAM-920](https://jira.argo.grnet.gr/browse/RCIAM-920)
- SAML entityID/OIDC issuer showing in user if IdP display name does not exist [RCIAM-887](https://jira.argo.grnet.gr/browse/RCIAM-887)
- User attribute value as text in database [RCIAM-1032](https://jira.argo.grnet.gr/browse/RCIAM-1032)
- Client description as text in database
- Client attribute value as text in database [RCIAM-1026)](https://jira.argo.grnet.gr/browse/RCIAM-1026)
- SAML IdP InResponseTo missing, warning instead of error
- Remove consent required from Token Exchange [RCIAM-1048](https://jira.argo.grnet.gr/browse/RCIAM-1048)
- Make optional the use of PKCE for Clients configured with PKCE only for Device Code Flow [RCIAM-1069](https://jira.argo.grnet.gr/browse/RCIAM-1069)
- No extra checks for confidential clients in token exchange [RCIAM-988](https://jira.argo.grnet.gr/browse/RCIAM-988)
- Consent extension [RCIAM-791](https://jira.argo.grnet.gr/browse/RCIAM-791)
- Search in User Attribute with like
- Protocol mapper that can combine multiple user attributes [RCIAM-1267](https://jira.argo.grnet.gr/browse/RCIAM-1267)
- Change SAML 2.0 Identity Provider Metadata [RCIAM-1288](https://jira.argo.grnet.gr/browse/RCIAM-1288)
- SAML federation alias use URL encoded of base64 entityId[Refactor SAML federation to use base64 instead of SHA256 for IdP aliases](https://trello.com/c/pDtqcm3L/2324-refactor-saml-federation-to-use-base64-instead-of-sha256-for-idp-aliases)

### Fixed
- Changes in account console and account rest service [RCIAM-860](https://jira.argo.grnet.gr/browse/RCIAM-860)
- Scope parameter in refresh flow [RCIAM-990](https://jira.argo.grnet.gr/browse/RCIAM-990)
- UserInfoEndpoint taking into account access token
- SAML element EncryptionMethod can consist any element [RCIAM-1014](https://jira.argo.grnet.gr/browse/RCIAM-1014)
- Continue client browser flow after User login from Identity Provider [RCIAM-1038](https://jira.argo.grnet.gr/browse/RCIAM-1038)
- Avoid duplicate entries for UseConsent with same userId - clientId [RCIAM-1141](https://jira.argo.grnet.gr/browse/RCIAM-1141)
- Client Signature Required true requires also AuthnRequestsSigned be true[Keycloak requires signed authN requests when WantAuthNSigned=false](https://trello.com/c/XpLOXiz2/2177-keycloak-requires-signed-authn-requests-when-wantauthnsignedfalse)
- Update client session based on client revocation policy [RCIAM-1178](https://jira.argo.grnet.gr/browse/RCIAM-1178)
- Refresh token scope same as old refresh token scope in refresh token flow [RCIAM-1158](https://jira.argo.grnet.gr/browse/RCIAM-1158)
- Update changes related to service account with Client registration 
- Dynamic scopes( default enabled): bug corrections, filtering and consent [RCIAM-848](https://jira.argo.grnet.gr/browse/RCIAM-848)
- redirect_uri must be exact much[Keycloak redirect_uri has problem with uppercase](https://trello.com/c/GvamXLYM/2322-keycloak-redirecturi-has-problem-with-uppercase)
- Fix Token Exchange without scope parameter bug in scope 
- OIDC Protocol Mappers add value to existing claims instead of overwriting it[Mapper for generating SAML attribute values or Claim values using other SAML attribute/Claim values as input](https://trello.com/c/8K46f2mo/1642-mapper-for-generating-saml-attribute-values-or-claim-values-using-other-saml-attribute-claim-values-as-input)
- Support federation metadata with nested EntitiesDescription[Support federation metadata with nested EntitiesDescription](https://trello.com/c/wRbquYl4/2395-support-federation-metadata-with-nested-entitiesdescription)

# Migration from eosc-kc version 18

In eosc-kc Keycloak version(version 22.0.5-x.x), SAML Federated Identity Providers Alias has been changed.
If you were in eosc version 18 (version 18.0.1-2.x) and you use SAML federation, after upgrating to this version you need to do the following steps :
1. run model\jpa\src\main\resources\sql/upgradeKeycloak22.sql
2. Restart Keycloak(for cache reloading)