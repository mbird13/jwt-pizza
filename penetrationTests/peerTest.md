### Attack Record for Hudson Stohl and Mark Bird

## Self Attack Report - Hudson Stohl

| Item           | Result                                                  |
| -------------- | ------------------------------------------------------- |
| Date           | April 11, 2025                                          |
| Target         | pizza-service.hudson-stohl.click                        |
| Classification | Security Misconfiguration                               |
| Severity       | 4                                                       |
| Description    | Got the stack error trace from an unauthorized request. |
| Images         | ![Stack Trace](stackTrace.png) <br/> Stack trace.       |
| Corrections    |                                                         | s   |

| Item           | Result                                                                               |
| -------------- | ------------------------------------------------------------------------------------ |
| Date           | April 11, 2025                                                                       |
| Target         | pizza-service.hudson-stohl.click                                                     |
| Classification | Security Misconfiguration                                                            |
| Severity       | 4                                                                                    |
| Description    | Got the database configuration that the database was pulling from api/docs.          |
| Images         | ![DB Config Shown](dbConfigShowing.png) <br/> DB config given with no authorization. |
| Corrections    |                                                                                      |

| Item           | Result                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| Date           | April 11, 2025                                                         |
| Target         | pizza.hudson-stohl.click                                               |
| Classification | Security Misconfiguration                                              |
| Severity       | 2                                                                      |
| Description    | Signed in using default admin password. Could have destroyed database. |
| Images         | ![Signed in as Admin](adminSuccess.png) <br/> Logged in as admin.      |
| Corrections    | Changed admin password.                                                |

## Hudson Stohl -> Mark Bird

| Item           | Result                                                               |
| -------------- | -------------------------------------------------------------------- |
| Date           | April 11, 2025                                                       |
| Target         | pizza-service.mbird.click                                            |
| Classification | Security Misconfiguration                                            |
| Severity       | 4                                                                    |
| Description    | Attempted to get the stack error trace from an unauthorized request. |
| Images         | ![No Error Trace](noErrorStack.png) <br/> No error.                  |
| Corrections    | Already corrected.                                                   | s   |

| Item           | Result                                                                              |
| -------------- | ----------------------------------------------------------------------------------- |
| Date           | April 11, 2025                                                                      |
| Target         | pizza-service.mbird.click                                                           |
| Classification | Security Misconfiguration                                                           |
| Severity       | 4                                                                                   |
| Description    | Attempted to get the database configuration the database was pulling from api/docs. |
| Images         | ![No DB Config](removedDbConfig.png) <br/> DB config has been removed.              |
| Corrections    | Already corrected.                                                                  |

| Item           | Result                                                              |
| -------------- | ------------------------------------------------------------------- |
| Date           | April 11, 2025                                                      |
| Target         | pizza.mbird.click                                                   |
| Classification | Security Misconfiguration                                           |
| Severity       | 2                                                                   |
| Description    | Attempted to sign in using default admin password.                  |
| Images         | ![Admin Login Fail](unknownAdmin.png) <br/> Admin password changed. |
| Corrections    | Admin password already changed from default.                        |

| Item           | Result                                                                                |
| -------------- | ------------------------------------------------------------------------------------- |
| Date           | April 10, 2025                                                                        |
| Target         | pizza.mbird.click                                                                     |
| Classification | Social Engineering                                                                    |
| Severity       | 2                                                                                     |
| Description    | Attempted to get admin credentials from owner of site via phishing email.             |
| Images         | ![Fraudulent Email](fraudEmail.png) <br/> Fraudulent email asking for admin password. |
| Corrections    | Didn't respond.                                                                       |

### Self Attack Report - Mark Bird

| Item           | Result                                                                        |
| -------------- | ----------------------------------------------------------------------------- |
| Date           | April 10, 2025                                                                |
| Target         | pizza-service.mbird.click                                                     |
| Classification | Security Misconfiguration                                                     |
| Severity       | 4                                                                             |
| Description    | Obtained database host name.                                                  |
| Images         | ![Database Hostname](dbHostname.png) <br/> /docs endpoint return db hostname. |
| Corrections    | Delete database hostname from /docs endpoint.                                 |

| Item           | Result                                                               |
| -------------- | -------------------------------------------------------------------- |
| Date           | April 10, 2025                                                       |
| Target         | pizza-service.mbird.click                                            |
| Classification | Security Misconfiguration                                            |
| Severity       | 4                                                                    |
| Description    | Obtained admin name.                                                 |
| Images         | ![Admin name](AdminName.png) Updating user info returned admin name. |
| Corrections    | Change default credentials                                           |

| Item           | Result                                      |
| -------------- | ------------------------------------------- |
| Date           | April 11, 2025                              |
| Target         | pizza-service.mbird.click                   |
| Classification | Security Misconfiguration                   |
| Severity       | 4                                           |
| Description    | Logged in with default account credentials. |
| Info           | Default Credentials worked.                 |
| Corrections    | Changed Default Credentials                 |

## Mark Bird -> Hudson Stohl

| Item           | Result                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| Date           | April 11, 2025                                                                                                  |
| Target         | pizza-service.hudson-stohl.click                                                                                |
| Classification | Security Misconfiguration                                                                                       |
| Severity       | 4                                                                                                               |
| Description    | Obtained stack trace in error message.                                                                          |
| Images         | ![StackTrace](StackTraceMessage.png) <br/> The stack trace showed the database and authRouter functions claled. |
| Corrections    | Delete stack trace from error message.                                                                          |

| Item           | Result                                                                                  |
| -------------- | --------------------------------------------------------------------------------------- |
| Date           | April 11, 2025                                                                          |
| Target         | pizza-service.hudson-stohl.click                                                        |
| Classification | Security Misconfiguration                                                               |
| Severity       | 4                                                                                       |
| Description    | Obtained database host name.                                                            |
| Images         | ![Database Hostname](dbHostnamePeerAttack.png) <br/> /docs endpoint return db hostname. |
| Corrections    | Delete database hostname from /docs endpoint.                                           |

| Item           | Result                                                                               |
| -------------- | ------------------------------------------------------------------------------------ |
| Date           | April 11, 2025                                                                       |
| Target         | pizza-service.hudson-stohl.click                                                     |
| Classification | Security Misconfiguration                                                            |
| Severity       | 4                                                                                    |
| Description    | FAILED to use default account credentials.                                           |
| Images         | ![Default Credentials](triedDefaultCreds.png) <br/> Default Credentials didn't work. |
| Corrections    | Default credentials were not used.                                                   |

### Summary of Learnings

Important attack prevention techniques

- Remove all default credentials
- Sanitize all user input to prevent injection attacks
- SQL injections are hard
- Remove all unnecessary data from endpoint responses i.e. database credentials, stack traces
- Hackers are smart
