import { VenueModel } from './venue-model';


export class DirectoryModel {

    data: any;
    activeVenue: VenueModel;
    venues: VenueModel[] = [];

    constructor(){
        this.activeVenue = null;

    }


    resetDirectory(): void {

    }

    addVenue(venue: VenueModel): void {
        let found = this.find(venue);

        if (found == 0) {
            if (venue.nid > 0) {
                this.venues.push(venue);
            } else {
                console.log('Venue ID missing');
            }
        } else {
            console.log('Venue already listed');

        }
    }

    removeVenue(venue: VenueModel): void {

        let index = this.venues.indexOf(venue);

        if(index > -1){
            this.venues.splice(index, 1);
        }

    }

    update(data: any) {
        for (const item of data) {
            let venue = new VenueModel(item);
            //console.log('updating venue: ', venue);
            this.addVenue(venue);
        }
    }

    find(newVenue: VenueModel): number {

        for (const currentVenue of this.venues) {
            if (currentVenue.nid == newVenue.nid) {
                return 1;
            }
        }

        return 0;

    }

    setActiveVenue(venue: VenueModel) {
        console.log('setActiveVenue', venue);
        this.activeVenue = venue;
    }

}
