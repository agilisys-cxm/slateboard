import { Injectable } from '@angular/core';

import { DirectoryModel } from "../../models/directory-model";
import { VenueModel } from "../../models/venue-model";
import { DataProvider } from "../";



@Injectable()
export class DirectoryProvider {

    directoryURL: any = 'venue-list';

    directory: DirectoryModel;
    directoryStorageName: string;
    activeVenueStorageName: string;


    constructor(public data: DataProvider) {

        this.directory = new DirectoryModel();
        this.directoryStorageName = 'directory';
        this.activeVenueStorageName = 'active-venue';

    }

    update(): Promise<string> {
        console.log('update()');
        return this.data.get(this.directoryURL).then(
            result => {

                console.log('result: ', result);
                this.directory.update(result);
                this.save();
                return 'Results updated';

            },
            reason => {

                console.log('reason: ', reason);
                return 'No result found';

            }
        );
    }

    attach() {
        return this.directory.venues;
    }

    load() {
//        console.log('load()');
        this.loadDirectory();
        this.loadActiveVenue();
    }

    loadDirectory(){

        this.data.load(this.directoryStorageName).then(
            data => {
                if (data) {
                    let items = JSON.parse(data);
                    for (const item of items) {
                        let venue = new VenueModel(item[0]);
                        this.directory.addVenue(venue);
                    }
                }
                return this.directory.venues;
            }
        );
    }

    loadActiveVenue(): Promise<string>{
        return this.data.load(this.activeVenueStorageName).then(
            data => {
                if (data) {
                    let items = JSON.parse(data);
                    for (const item of items) {
                        let venue = new VenueModel(item[0]);
                        this.directory.setActiveVenue(venue);
                    }
                    return 'success';
                } else {
                    return 'empty';
                }
            }, reason => {
                console.log('error', reason);
                return 'empty';
            }
        );

    }

    save() {
        console.log('save()');
        this.saveDirectory();
        this.saveActiveVenue();
    }

    saveDirectory(): Promise<boolean> {
        console.log('saveDirectory()');
        let saveData = [];

        for (const venue of this.directory.venues) {
            saveData.push(venue.serialize());
        }

        let newData = JSON.stringify(saveData);

        return this.data.save(this.directoryStorageName, newData);
    }

    saveActiveVenue() {
        if (this.directory.activeVenue) {
            let saveData = [];

            saveData.push(this.directory.activeVenue.serialize());

            let newData = JSON.stringify(saveData);

            this.data.save(this.activeVenueStorageName, newData);
        }
    }

    reset() {
        this.directory = new DirectoryModel();
    }

    dump() {
        this.data.dump(this.directoryStorageName);
    }

    setActiveVenue(venue: VenueModel) {
        this.directory.setActiveVenue(venue);
        this.saveActiveVenue();
    }

    attachActiveVenue() {
        return this.directory.activeVenue;
    }

}
