import { google } from 'googleapis';

export default async function handler(req, res) {
  // Allow cross-origin requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { date } = req.query; // Expected format: YYYY-MM-DD
    if (!date) return res.status(400).json({ error: 'Date is required' });

    // Initialize Google API Client if credentials exist
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
       // If no credentials, just return mock slots for UI testing purposes before they configure keys
       return returnMockSlots(date, res);
    }

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // handle multiline string from Vercel config
      scopes: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly']
    });

    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const calendar = google.calendar({ version: 'v3', auth });
    
    // Check availability between 11 AM and 8 PM IST (+05:30)
    const timeMin = new Date(`${date}T11:00:00+05:30`).toISOString();
    const timeMax = new Date(`${date}T20:00:00+05:30`).toISOString();

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: 'Asia/Kolkata',
        items: [{ id: calendarId }]
      }
    });

    const busySlots = response.data.calendars[calendarId]?.busy || [];

    // Calculate all 30-minute intervals and filter out the busy ones
    const allSlots = [];
    let current = new Date(`${date}T11:00:00+05:30`);
    const end = new Date(`${date}T20:00:00+05:30`);

    while (current < end) {
      const slotStart = new Date(current);
      const slotEnd = new Date(current.getTime() + 30 * 60000); // 30 mins
      
      const isBusy = busySlots.some(busy => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return (slotStart < busyEnd && slotEnd > busyStart);
      });

      if (!isBusy) {
        const timeString = slotStart.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
        allSlots.push({ time: timeString, start: slotStart.toISOString(), end: slotEnd.toISOString() });
      }

      current.setMinutes(current.getMinutes() + 30);
    }

    return res.status(200).json({ slots: allSlots });

  } catch (error) {
    console.error('API Error /slots:', error);
    // Fallback to mock slots if API fails (e.g. invalid calendar ID or sharing) so UI doesn't crash
    return returnMockSlots(req.query.date, res);
  }
}

// Fallback logic so the frontend can be actively tested even if the user hasn't configured Google Calendar keys yet.
function returnMockSlots(date, res) {
    const mockSlots = [];
    let current = new Date(`${date}T11:00:00+05:30`);
    const end = new Date(`${date}T20:00:00+05:30`);
    while (current < end) {
      const slotStart = new Date(current);
      const slotEnd = new Date(current.getTime() + 30 * 60000);
      // Randomly decide if busy (simulate 20% booking rate)
      if (Math.random() > 0.2) {
        mockSlots.push({
           time: slotStart.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }),
           start: slotStart.toISOString(),
           end: slotEnd.toISOString()
        });
      }
      current.setMinutes(current.getMinutes() + 30);
    }
    return res.status(200).json({ slots: mockSlots, isMock: true });
}
