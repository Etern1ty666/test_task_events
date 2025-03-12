import { makeAutoObservable, runInAction } from "mobx";
import { addTestEvents, deleteAllEvents, fetchEvents } from "../api/api";

class EventsStore {
    data = [];
    selectedSubscription = {};
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    add(object) {
        this.data.push(object);
    }

    delete(id) {
        this.data.replace(this.data.filter(item => item.id !== id));
    }

    update(object) {
        this.data.replace(this.data.map(item => 
            object.id === item.id ? object : item
        ));
    }

    getEvents = async () => {
        try{
            runInAction(() => {
                this.isLoading = true;
            });            
            const result = await fetchEvents()
            runInAction(() => {
                this.data = result;
                this.isLoading = false;
            })
        }catch{
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    deleteAllEvents = async () => {
        try{
            runInAction(() => {
                this.isLoading = true;
            });            
            const result = await deleteAllEvents()
            runInAction(() => {
                this.data = [];
                this.isLoading = false;
            })
            return result
        }catch{
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    addTest = async () => {
        try{
            runInAction(() => {
                this.isLoading = true;
            });            
            const result = await addTestEvents()
            runInAction(() => {
                this.data = result;
                this.isLoading = false;
            })
            return result
        }catch{
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}

const eventsStore = new EventsStore();
export default eventsStore;
