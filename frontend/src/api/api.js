import axios from "axios";


// Все семинары
export async function fetchEvents() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/seminars`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении семинаров:", error);
        throw new Error("Не удалось загрузить семинары");
    }
}

// Обновить семинар
export async function updateEvent(eventId, params) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/seminars/${eventId}`, params);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при обновлении семинара (ID: ${eventId}):`, error);
        throw new Error("Не удалось обновить семинар");
    }
}

// Удалить семинар
export async function deleteEvent(eventId) {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/seminars/${eventId}`);
        return true;
    } catch (error) {
        console.error(`Ошибка при удалении семинара (ID: ${eventId}):`, error);
        throw new Error("Не удалось удалить семинар");
    }
}