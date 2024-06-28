interface IDB_CONFIG{
    URI: string,
    USERNAME: string,
    PASSWORD: string
}

class AuthRepo{


    constructor(db_config: IDB_CONFIG){
        
    }
    create_user(username: string, password: string): Promise<void> {

    }

    get_user(username: string, password: string): Proise<void> {

    }
}



export const auth_repo = new AuthRepo()