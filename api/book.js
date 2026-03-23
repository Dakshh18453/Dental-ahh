import { google } from 'googleapis';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { name, phone, service, timeStart, timeEnd, message } = req.body;
    
    if (!name || !phone || !timeStart || !timeEnd) {
      return res.status(400).json({ error: 'Missing required appointment fields' });
    }

    // Skip actual calendar insertion if credentials aren't configured yet (allows mock testing)
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
       console.log('Mocking booking successful. Environment variables missing.');
       return res.status(200).json({ success: true, eventLink: null, isMock: true });
    }

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.events']
    });

    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
      summary: `Appointment: ${name} (${service})`,
      description: `Patient Phone: ${phone}\nTreatment: ${service}\nMessage: ${message || 'None'}\n\nAutomatically booked via Clinic Website.`,
      start: {
        dateTime: timeStart,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: timeEnd,
        timeZone: 'Asia/Kolkata',
      },
      colorId: '2', // Green event block
    };

    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    });

    return res.status(200).json({ success: true, eventLink: response.data.htmlLink });
  } catch (error) {
    console.error('API Error /book:', error);
    return res.status(500).json({ error: 'Failed to create calendar event' });
  }
}
