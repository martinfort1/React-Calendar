
export const events = [
    {
       id: '1',
       start: new Date('2025-3-20 10:00:00'),
       end:  new Date('2025-3-20 12:00:00'),
       title: 'Cumpleaños de Juan',
       notes: 'Test notes'
    },
    {
        id: '2',
        start: new Date('2025-3-21 10:00:00'),
        end:  new Date('2025-3-21 12:00:00'),
        title: 'Cumpleaños de Maria',
        notes: 'Test notes Maria'
     }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}
export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}
export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}