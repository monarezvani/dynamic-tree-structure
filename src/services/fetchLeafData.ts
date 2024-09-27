import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeafData = createAsyncThunk("fetchLeafData", async function (id: string) {
    try {
        const result = await fetch(`https://ubique.img.ly/frontend-tha/entries/${id}.json`);
        return result.json();
    } catch (error) {
        throw new Error("Error fetching repository");
    }
});
