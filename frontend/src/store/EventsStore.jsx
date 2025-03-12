import { makeAutoObservable, runInAction } from "mobx";
import { fetchEvents } from "../api/api";

class EventsStore {
    data = [];
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

    setLoading(state) {
        this.isLoading = state;
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

}

const eventsStore = new EventsStore();
export default eventsStore;
