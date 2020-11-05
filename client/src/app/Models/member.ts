import { photo } from './photo';

export interface member {
    id: number;
    userName: number;
    photoUrl?: any;
    name: string;
    age: number;
    dateOfBirth: string;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingfor?: any;
    city: string;
    country?: any;
    photos: photo[];
  }
