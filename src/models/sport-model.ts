
export interface SportData {
    name: string;
    image: string;
    id: number;
}

export class SportModel {

    id: number;
    name: string;
    image: string;

    sports: SportData[] = [
        { name: 'Pool', image: '../../assets/img/sport-icons/blue/33.png', id: 33 },
        { name: 'Darts', image: '../../assets/img/sport-icons/blue/34.png' , id: 34 },
        { name: 'Dominos', image: '../../assets/img/sport-icons/blue/35.png', id: 35 },
        { name: 'Draughts', image: '../../assets/img/sport-icons/blue/680.png', id: 680 },
    ];


    constructor(id: number) {
        this.id = id;
        for (const sport of this.sports) {
            if (sport.id == this.id) {
                this.name = sport.name;
                this.image = sport.image;
            }
        }

    }
}