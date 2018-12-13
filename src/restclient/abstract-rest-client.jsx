import host from './../../HOST.json';
//LOCAL
// export const HOST = 'http://localhost:8080/api/';
// export const HOST_USER_SERVICE = 'http://localhost:8080/';
// export const HOST_MODEL_REPO_SERVICE = 'http://localhost:8080/';

//PROD
// export const HOST = 'http://131.130.37.20:9595/api/';
// export const HOST_USER_SERVICE = 'http://131.130.37.24:9091/';
// export const HOST_MODEL_REPO_SERVICE = 'http://131.130.37.24:9092/';

//UBsUNTU
export const HOST = host.openstack;
export const HOST_USER_SERVICE = host.user_service;
export const HOST_MODEL_REPO_SERVICE = host.model_repo;


export const MONITORING_API = HOST + 'monitoring';
export const ALERTING_API = HOST + 'alerts';
export const USER_API = HOST + 'user';

