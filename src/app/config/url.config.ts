const BASE='http://localhost';
const PORT = '8080';

export const API_URLS ={
    PERSONNELS_URL: BASE + ':' + PORT +'/admin/personnes',
    UPLOAD_AVATAR_IMG: BASE + ':' + PORT +'/admin/personnes/upload',
    PROFS_URL: BASE + ':' + PORT +'/admin/personnes/personnes',
    USERS_URL: BASE + ':' + PORT +'/admin/utilisateurs',
    ROLES_URL: BASE + ':' + PORT +'/admin/roles',
    MATIERES_URL: BASE + ':' + PORT +'/api/matieres',
    MODULES_URL : BASE + ':' + PORT +'/api/modules',
    SEANCES_URL : BASE + ':' + PORT +'/api/seances',
    FILIERES_URL : BASE + ':' + PORT +'/api/filieres',
    CLASSES_URL : BASE + ':' + PORT +'/api/classes',
    LOGIN_URL: BASE + ':' + PORT + "/api/user",
    GENERATE_USER_URL : BASE + ':' + PORT + "/admin/utilisateurs/generateUser",
    COURRIER_URL : BASE + ':' + PORT + "/api/courriers",
    NOTIFICATION_URL : BASE + ':' + PORT + "/api/notifications",

    
}