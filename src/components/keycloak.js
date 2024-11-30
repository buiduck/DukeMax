import Keycloak from "keycloak-js";
import {APP_MODE} from "../constants/appMode";

const keycloak = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
});
const doLogin = keycloak.login;

const doLogout = keycloak.logout;


const getToken = () => keycloak.token;

const getTokenParsed = () => keycloak.tokenParsed;

const isLoggedIn = () => !!keycloak.token;

const updateToken = (successCallback) =>
    keycloak
        .updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => keycloak.tokenParsed?.preferred_username;


const hasResourceRole = (roles) => {
    const rolesArray = Array.isArray(roles) ? roles : [roles];

    if (process.env.REACT_APP_NODE_ENV === APP_MODE.DEVELOPMENT) {
        console.debug("Checking roles: ", rolesArray);

        const access = keycloak.resourceAccess[keycloak.clientId];
        console.debug("Role from user: " + access.roles);
    }
    return rolesArray.every((role) => keycloak.hasResourceRole(role));
};

const KeycloakService = {
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    getTokenParsed,
    updateToken,
    getUsername,
    hasResourceRole,
    keycloak,
};

export default KeycloakService;

