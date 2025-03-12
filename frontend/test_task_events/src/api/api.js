import axios from "axios";

export async function fetchEvents (){
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `getEvents/`);
        return response.data;
    } catch (error) {
        console.error('Error getting events', error);
        return [];
    }
}

export async function updateEvent (eventId, params){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + `updateEvent/`, {event_id: eventId, params: params});
        return response.data;
    } catch (error) {
        console.error('Error update event', error);
        return 'Update error';
    }
}

export async function deleteEvent (eventId){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + `deleteEvent/`, {event_id: eventId});
        return response.data;
    } catch (error) {
        console.error('Error deleting event', error);
        return 'Delete error';
    }
}


export async function addTestEvents (){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + 'addTestEvents/');
        return response.data;
    } catch (error) {
        console.error('Error adding test events', error);
        return 'Error';
    }
}

export async function deleteAllEvents (){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + 'deleteAllEvents/');
        return response.data;
    } catch (error) {
        console.error('Error deletind all events', error);
        return 'Error';
    }
}