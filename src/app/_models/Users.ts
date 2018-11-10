import { Photo } from './Photo';

export interface User{
    id: number;
    UserName: String;
    knownAs: string;
    age: number;
    created: Date;  
    lastActive: Date;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photoUrl: string;
    photos?: Photo[];

}

