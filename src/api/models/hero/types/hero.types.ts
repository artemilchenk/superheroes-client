

export interface IHero {
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
    images?: string[];
    _id?: any
}

export interface IUpdateHeroDto {
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
    images?: string[];
}

export interface  IHeroesResponse{
    count: number,
    heroes: IHero[]
}

