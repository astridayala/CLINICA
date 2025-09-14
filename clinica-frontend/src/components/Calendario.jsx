import React, { useState, useRef } from 'react';
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import { Temporal } from "@js-temporal/polyfill";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from './custom/CustomToolbar';
import AppointmentDetailModal from '../modals/AppointmentDetailModal';
import CreateAppointmentModal from '../modals/CreateAppointmentModal';
import NotificationModal from '../modals/NotificationModal';

const localizer = dayjsLocalizer(dayjs);

function parseEventDate(dateStr, zone = 'America/El_Salvador') {
  const [datePart, timePart] = dateStr.split(' ');
  const timeWithSeconds = timePart && timePart.includes(':') ? `${timePart}:00` : '00:00:00';
  const zdt = Temporal.ZonedDateTime.from(`${datePart}T${timeWithSeconds}[${zone}]`);
  return new Date(zdt.epochMilliseconds);
}

export default function Calendario() {
  const calendarRef = useRef(null);

  const pacientes = [
    { id: 1, nombre: 'Astrid Ayala' },
    { id: 2, nombre: 'Juan Pérez' },
    { id: 3, nombre: 'Marta López' },
  ];

  const [events, setEvents] = useState([
    { id: 1, title: 'Astrid Ayala', start: parseEventDate('2025-09-10 09:00'), end: parseEventDate('2025-09-10 10:00'), description: 'Cambio de hules' },
    { id: 2, title: 'Astrid Ayala', start: parseEventDate('2025-09-10 16:30'), end: parseEventDate('2025-09-10 17:45'), description: 'Cambio de hules' },
    { id: 3, title: 'Astrid Ayala', start: parseEventDate('2025-09-07 09:00'), end: parseEventDate('2025-09-07 10:00'), description: 'Cambio de hules' },
    { id: 7, title: 'Astrid Ayala', start: parseEventDate('2025-09-07 16:30'), end: parseEventDate('2025-09-07 17:45'), description: 'Cambio de hules' },
    { id: 4, title: 'Astrid Ayala', start: parseEventDate('2025-09-13 09:00'), end: parseEventDate('2025-09-13 10:00'), description: 'Cambio de hules' },
    { id: 5, title: 'Astrid Ayala', start: parseEventDate('2025-09-13 16:30'), end: parseEventDate('2025-09-13 17:45'), description: 'Cambio de hules' },
    { id: 6, title: 'Astrid Ayala', start: parseEventDate('2025-09-10 12:30'), end: parseEventDate('2025-09-10 13:45'), description: 'Cambio de hules' },

  ]);

  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [slotInfo, setSlotInfo] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notification, setNotification] = useState(null);

  // Función universal para mostrar notificaciones
  const showNotification = (type, message) => {
    setNotification({ type, message, id: Date.now() }); // id único para forzar re-render
  };

    const handleSelectEvent = event => setSelectedEvent(event);
  const closeDetailModal = () => setSelectedEvent(null);
  const closeCreateModal = () => setSlotInfo(null);

  const handleSelectSlot = info => setSlotInfo(info);

  const handleSaveEvent = (newEvent) => {
    try {
      setEvents(prev => [...prev, newEvent]);
      setSlotInfo(null);
      showNotification('success', 'Cita guardada correctamente');
    } catch (error) {
      showNotification('error', 'No se pudo guardar la cita');
    }
  };

  const handleDeleteEvent = (eventId) => {
    try {
      setEvents(prev => prev.filter(ev => ev.id !== eventId));
      setSelectedEvent(null);
      showNotification('success', 'Cita eliminada correctamente');
    } catch (error) {
      showNotification('error', 'No se pudo eliminar la cita');
    }
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

      {/* Modal de detalle */}
      {selectedEvent && (
        <AppointmentDetailModal
          event={selectedEvent}
          onClose={closeDetailModal}
          onDelete={handleDeleteEvent}
          calendarRef={calendarRef}
        />
      )}

      {/* Modal de crear cita */}
      {slotInfo && (
        <CreateAppointmentModal
          slotInfo={slotInfo}
          pacientes={pacientes}
          onClose={closeCreateModal}
          onSave={handleSaveEvent}
        />
      )}

      {/* Modal de notificaciones universal */}
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
