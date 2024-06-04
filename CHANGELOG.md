# Changelog
All notable eosc-kc changes of Keycloak will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For Keycloak upstream changelog please see https://www.keycloak.org/docs/latest/release_notes/index.html.
[Keycloak announcement for version 16.1.0](https://www.keycloak.org/2021/12/keycloak-1610-released)
Full Keycloak upstream jira issue can be shown if filtered by Fix version.

Our Keycloak version is working well with PostgreSQL database. For using other SQL databases, text field in database need to be evaluated.

## [Unreleased]
### Changed
- No permission check for token exchange with audience

## [18.0.1-2.17] - 2023-10-10
### Fixed
- Fix refresh flow with scope parameter problem[Feedback from CESNET about EOSC Keycloak federation support](https://trello.com/c/VTJNB9Gu/2116-feedback-from-cesnet-about-eosc-keycloak-federation-support)
- Client Signature Required true requires also AuthnRequestsSigned be true[Keycloak requires signed authN requests when WantAuthNSigned=false](https://trello.com/c/XpLOXiz2/2177-keycloak-requires-signed-authn-requests-when-wantauthnsignedfalse)

### Changed
- Add regex support in 'Condition - User attribute' execution[Add regex support in Keycloak attribute condition](https://trello.com/c/P8Dvw6ir/2121-add-regex-support-in-keycloak-attribute-condition)

## [18.0.1-2.16] - 2023-07-09
### Fixed
- Fix refresh flow with scope parameter problem[EGI dev oidc client refresh flow not allowed](https://trello.com/c/rwDjqUF0/2076-egi-dev-oidc-client-refresh-flow-not-allowed)

## [18.0.1-2.15] - 2023-23-08

### Fixed
- Fix autoupdate schedule task stuck [trello card](https://trello.com/c/m2WM3bSQ/1974-saml-client-metadata-update-problem-fe-https-aai-devegieu-auth-admin-master-console-realms-egi-clients-1fa52476-73dd-4ab9-b6fd-7)
- Execution config not duplicated when duplicating flows [GITHUB-12012](https://github.com/keycloak/keycloak/issues/12012)

### Added
- Login events type for add, remove, suspend user from a group [RCIAM-1292](https://jira.argo.grnet.gr/browse/RCIAM-1292)

## [18.0.1-2.14] - 2023-07-05

### Fixed
- Dynamic scope filtering based on multiple user attribute [RCIAM-1267](https://jira.argo.grnet.gr/browse/RCIAM-1267)
- Fix AssertionConsumerServiceURL value or the redirect_uri vulnerability
- Fix CVEs

### Changed
- Change SAML 2.0 Identity Provider Metadata [RCIAM-1288](https://jira.argo.grnet.gr/browse/RCIAM-1288)

## [18.0.1-2.13] - 2023-06-07

### Added
- Add authnAuthority and voPersonID user attribute to event details
- OIDC RP-Initiated Logout POST method support [GITHUB-11958](https://github.com/keycloak/keycloak/issues/11958)

### Changed
- Protocol mapper that can combine multiple user attributes [RCIAM-1267](https://jira.argo.grnet.gr/browse/RCIAM-1267)

### Fixed
- Update changes related to service account with Client registration 


## [18.0.1-2.12] - 2023-05-08

### Added
- Sort Identity Providers by guiOrder and displayname

### Fixed
- Correct scope policy ui problem

### Changed
- Search in User Attribute with like

## [18.0.1-2.11] - 2023-04-11

### Added
- Client scope policy [RCIAM-1241](https://jira.argo.grnet.gr/browse/RCIAM-1241)

### Fixed
- Correction in ui of autoupdated SAML client creation 

### Changed
- Filter dynamic scopes from access token scope

## [18.0.1-2.10] - 2023-01-31

### Fixed
- Service Accounts Client create the Client ID mapper with Token Claim Name as client_id  [GITHUB-16329](https://github.com/keycloak/keycloak/issues/16329)
- Correct Keycloak Quarkus vulnerabilities [RCIAM-1196](https://jira.argo.grnet.gr/browse/RCIAM-1196)
- Bug corrections related to SAML Autoupdated client [RCIAM-1205](https://jira.argo.grnet.gr/browse/RCIAM-1205)
- Correction in StartAutoUpdatedScheduledTasks

### Changed
- debug log for failed to add/update/remove mappers from SAML federation to SAML IdPs

## [18.0.1-2.9] - 2023-01-09

### Added
- Configurable Claims for dynamic scopes [RCIAM-1190](https://jira.argo.grnet.gr/browse/RCIAM-1190)
- Short verification_uri for Device Authorization Request [RCIAM-1151](https://jira.argo.grnet.gr/browse/RCIAM-1151)

### Fixed
-  Correct UserInfo after refresh token with scope containing dynamic scope filtering  [RCIAM-1191](https://jira.argo.grnet.gr/browse/RCIAM-1191)


## [18.0.1-2.8] - 2022-12-12

### Added
- Autoupdated SAML Client [RCIAM-1181](https://jira.argo.grnet.gr/browse/RCIAM-1181)
- Dynamic scopes for refresh flow and token exchange

### Changed
- SAML SP Descriptor keys for use both for encrypt and signing
- Startup autoupdated tasks with delay

### Fixed
- Client registration service do not check client protocol for Bearer token  [RCIAM-1186](https://jira.argo.grnet.gr/browse/RCIAM-1186)

## [18.0.1-2.7] - 2022-11-18

### Fixed
- Update client session based on client revocation policy [RCIAM-1178](https://jira.argo.grnet.gr/browse/RCIAM-1178)

## [18.0.1-2.6] - 2022-11-07

### Fixed
- Correct SAML implementation for emailVerified attribute mapper [EOSC-KC-70](https://github.com/eosc-kc/keycloak/issues/70)

## [18.0.1-2.5] - 2022-11-03

### Fixed
- Hightlight SAML federation menu when choosen

### Changed
-Support for client_id parameter in OIDC RP-Initiated logout endpoint [KEYCLOAK-12002](https://github.com/keycloak/keycloak/issues/12002)

## [18.0.1-2.4] - 2022-10-21

### Fixed
- Refresh token scope same as old refresh token scope in refresh token flow [RCIAM-1158](https://jira.argo.grnet.gr/browse/RCIAM-1158)

### Changed
-Offline refresh token calculation: (user session started + Client Offline Session Idle) instead of (current time + Client Offline Session Idle)  [RCIAM-1159](https://jira.argo.grnet.gr/browse/RCIAM-1159)

## [18.0.1-2.3] - 2022-10-19

### Fixed
- A user could be assigned to a parent group if he is already assigned to a subgroup. [KEYCLOAK-9482](https://github.com/keycloak/keycloak/issues/9482)
- Correct SAML federation login for Quarkus [RCIAM-1141](https://jira.argo.grnet.gr/browse/RCIAM-1141)

## [18.0.1-2.2] - 2022-10-11

### Fixed
- Avoid duplicate entries for UseConsent with same userId - clientId [RCIAM-1141](https://jira.argo.grnet.gr/browse/RCIAM-1141)

## [18.0.1-2.1] - 2022-09-28

### Fixed
- Correct problems related with autoupdated IdP
- Extra space between contacts in consent screen [RCIAM-1124](https://jira.argo.grnet.gr/browse/RCIAM-1124)

### Changed
- Want Assertions Encrypted add optional for SAML Federation [RCIAM-1117](https://jira.argo.grnet.gr/browse/RCIAM-1117)

## [18.0.1-2.0] - 2022-09-01

### Added
- Extra logs for failed introspection
- Resource request parameter and audience in access token [RCIAM-1061](https://jira.argo.grnet.gr/browse/RCIAM-1061)

### Fixed
- Correct including claim in token introspection response only [RCIAM-1054](https://jira.argo.grnet.gr/browse/RCIAM-1054)
- Fix for a case of offline introspection [RCIAM-1054](https://jira.argo.grnet.gr/browse/RCIAM-1054)
- Continue client browser flow after User login from Identity Provider [RCIAM-1038](https://jira.argo.grnet.gr/browse/RCIAM-1038)
- Dynamic scopes( default enabled): bug corrections, filtering and consent [RCIAM-848](https://jira.argo.grnet.gr/browse/RCIAM-848)
- Fixed a ftl templating bug in Error pages [RCIAM-1049](https://jira.argo.grnet.gr/browse/RCIAM-1049)

### Changed
- Showing consent screen text instead of scope name in consent part of Application page in Account console [RCIAM-1057](https://jira.argo.grnet.gr/browse/RCIAM-1057)
- Make optional the use of PKCE for Clients configured with PKCE only for Device Code Flow [RCIAM-1069](https://jira.argo.grnet.gr/browse/RCIAM-1069)
- No extra checks for confidential clients in token exchange [RCIAM-988](https://jira.argo.grnet.gr/browse/RCIAM-988)
- Changes related to [View groups from account console PR](https://github.com/keycloak/keycloak/pull/7933)

## [18.0.1-1.0] - 2022-07-04

### Added
- Eosc-kc version model with MigrationModel changes [RCIAM-945](https://jira.argo.grnet.gr/browse/RCIAM-945)
- Support for SAML IdP Federation
- Identity Providers pager in Linked Accounts of Account Console. [EOSC-KC-50](https://github.com/eosc-kc/keycloak/issues/50)
- User reaccepting Terms and Conditions. [EOSC-KC-48](https://github.com/eosc-kc/keycloak/issues/48)
- Terms and Conditions - periodic reset for all realm users. [EOSC-KC-49](https://github.com/eosc-kc/keycloak/issues/49)
- Identity Providers pager in Admin Console. [EOSC-KC-73](https://github.com/eosc-kc/keycloak/issues/73)
- Email notification for add/remove group. [EOSC-KC-75](https://github.com/eosc-kc/keycloak/issues/75)
- View groups from Account Console. [EOSC-KC-61](https://github.com/eosc-kc/keycloak/issues/61)
- Javascript SAML identity provider mapper. [KEYCLOAK-17685](https://issues.redhat.com/browse/KEYCLOAK-17685)
- SAML/ OIDC Identity Provider AutoUpdate. [EOSC-KC-119](https://github.com/eosc-kc/keycloak/issues/119)
- Include claim in token introspection response only [RCIAM-742](https://jira.argo.grnet.gr/browse/RCIAM-742)
- External introspection endpoint [EOSC-KC-140](https://github.com/eosc-kc/keycloak/issues/140)
- New release created on tag
- The idpLoginFullUrl common attribute passed to the ftl templates for any theme except from the default
- Add scope parameter to token exchange [RCIAM-834](https://jira.argo.grnet.gr/browse/RCIAM-834)
- Hide scopes from scopes_supported in discovery endpoint [RCIAM-859](https://jira.argo.grnet.gr/browse/RCIAM-859)
- Refresh token for offline_access [RCIAM-849](https://jira.argo.grnet.gr/browse/RCIAM-849)
- Id token lifespan [RCIAM-930](https://jira.argo.grnet.gr/browse/RCIAM-930)
- Add indexes to related to Federation and Identity Provider tables

### Changed
- FreeMarkerLoginFormsProvider now has an additional common attribute passed to the ftl templates, the "uriInfo"
- Change emailVerified User field with UserAttributeMappers (conditional trust email). [EOSC-KC-70](https://github.com/eosc-kc/keycloak/issues/70)
- Consent extension [RCIAM-791](https://jira.argo.grnet.gr/browse/RCIAM-791)
- Offline_access scope return always refresh_token [RCIAM-744](https://jira.argo.grnet.gr/browse/RCIAM-744)
- Signing of SAML IdP logout requests separately [RCIAM-881](https://jira.argo.grnet.gr/browse/RCIAM-881)
- Allow omitting NameIDFormat [RCIAM-882](https://jira.argo.grnet.gr/browse/RCIAM-882)
- EntityId in configuration of SAML IdP[EOSC-KC-133](https://github.com/eosc-kc/keycloak/issues/133)
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

### Fixed
- Correct ApplicationsPage in Account Console [RCIAM-984](https://jira.argo.grnet.gr/browse/RCIAM-984)
- Changes in account console and account rest service [RCIAM-860](https://jira.argo.grnet.gr/browse/RCIAM-860)
- Include 'urn:ietf:params:oauth:grant-type:token-exchange' in grant_types_supported field of Keycloak OP metadata, if token-exchange is enabled [RCIAM-915](https://jira.argo.grnet.gr/browse/RCIAM-915)
- Device code flow json error responses [RCIAM-959](https://jira.argo.grnet.gr/browse/RCIAM-959)
- Use encryption keys rather than sig for crypto in SAML [KEYCLOAK-18909](https://issues.redhat.com/browse/KEYCLOAK-18909)
- Scope parameter in refresh flow [RCIAM-990](https://jira.argo.grnet.gr/browse/RCIAM-990)
- Instant.now().toEpochMilli instead of System.currentTimeMillis [RCIAM-1002](https://jira.argo.grnet.gr/browse/RCIAM-1002)
- AutoUpdated IdPs on realm removal, import realm [RCIAM-1012](https://jira.argo.grnet.gr/browse/RCIAM-1012)
- SAML element EncryptionMethod can consist any element [RCIAM-1014](https://jira.argo.grnet.gr/browse/RCIAM-1014)
