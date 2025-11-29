import React, { useState, useRef, useEffect } from 'react';
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from './custom/CustomToolbar';
import AppointmentDetailModal from '../modals/AppointmentDetailModal';
import CreateAppointmentModal from '../modals/CreateAppointmentModal';
import NotificationModal from '../modals/NotificationModal';
import api from '../scripts/axiosConfig';

const localizer = dayjsLocalizer(dayjs);

export default function Calendario() {
  const calendarRef = useRef(null);

  const [pacientes, setPacientes] = useState([]); 
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [slotInfo, setSlotInfo] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar Pacientes
        const patientsResponse = await api.get('/patients');
        const loadedPatients = patientsResponse.data.map(p => ({
          id: p.id,
          nombre: `${p.name} ${p.lastName}` 
        }));
        setPacientes(loadedPatients);

        // Cargar Citas
        const appointmentsResponse = await api.get('/appointments');
        
        const loadedEvents = appointmentsResponse.data.map(app => ({
          id: app.id,
          title: app.patient ? `${app.patient.name} ${app.patient.lastName}` : 'Paciente',
          // 🔧 AHORA ES SIMPLE: El backend manda "2025-10-20 08:00:00" (sin Z)
          // El navegador lo entiende como hora local automáticamente.
          start: new Date(app.start),
          end: new Date(app.end),
          description: app.description,
        }));
        setEvents(loadedEvents);

      } catch (error) {
        console.error("Error cargando datos:", error);
        showNotification('error', 'Error al conectar con el servidor');
      }
    };

    fetchData();
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message, id: Date.now() });
  };

  const handleSelectEvent = event => setSelectedEvent(event);
  const closeDetailModal = () => setSelectedEvent(null);
  const closeCreateModal = () => setSlotInfo(null);
  const handleSelectSlot = info => setSlotInfo(info);

  const handleSaveEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
    setSlotInfo(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(ev => ev.id !== eventId));
    setSelectedEvent(null);
  };

  return (
    <div ref={calendarRef} className="h-full p-4 relative">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        defaultView={Views.WEEK}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        selectable
        className="h-full"
        components={{
          toolbar: CustomToolbar,
          event: ({ event }) => (
            <div data-id={event.id} className="cursor-pointer truncate px-1">{event.title}</div>
          )
        }}
        min={new Date(2025, 0, 1, 7, 0)}
        max={new Date(2025, 0, 1, 19, 0)}
      />

      {selectedEvent && (
        <AppointmentDetailModal
          event={selectedEvent}
          onClose={closeDetailModal}
          onDelete={handleDeleteEvent}
          calendarRef={calendarRef}
          showNotification={showNotification}
        />
      )}

      {slotInfo && (
        <CreateAppointmentModal
          slotInfo={slotInfo}
          pacientes={pacientes}
          onClose={closeCreateModal}
          onSave={handleSaveEvent}
        />
      )}

      {notification && (
        <NotificationModal
          key={notification.id} 
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}