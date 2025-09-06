import React, { useEffect, useState } from 'react'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { 
    createViewWeek, 
    createViewMonthGrid, 
    createViewMonthAgenda, 
    createViewDay 
} from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { translations, mergeLocales } from '@schedule-x/translations'
import { Temporal } from "@js-temporal/polyfill"
import '@schedule-x/theme-default/dist/calendar.css'

// Variable de entorno para la API
const API_URL = import.meta.env.VITE_API_URL

// Convierte "YYYY-MM-DD HH:mm" a ZonedDateTime
function parseEventDate(dateStr, zone = 'America/El_Salvador') {
    const [datePart, timePart] = dateStr.split(' ')
    const timeWithSeconds = timePart.includes(':') ? `${timePart}:00` : '00:00:00'
    return Temporal.ZonedDateTime.from(`${datePart}T${timeWithSeconds}[${zone}]`)
}

// Llamadas a la API
async function fetchPatients() {
    const res = await fetch(`${API_URL}/patients`)
    if (!res.ok) throw new Error('Error al obtener pacientes')
    return await res.json()
}

async function createAppointmentAPI(event, patientId) {
    const body = {
        patientId,
        start: event.start.toPlainDateTime().toString().slice(0,16),
        end: event.end.toPlainDateTime().toString().slice(0,16),
        description: event.description || ''
    }

    const res = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (!res.ok) throw new Error('Error creando la cita')
    return await res.json()
}

async function updateAppointmentAPI(event) {
    const body = {
        start: event.start.toPlainDateTime().toString().slice(0,16),
        end: event.end.toPlainDateTime().toString().slice(0,16),
        description: event.description || ''
    }

    const res = await fetch(`${API_URL}/appointments/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (!res.ok) throw new Error('Error actualizando la cita')
    return await res.json()
}

function Calendar() {
    const [patients, setPatients] = useState([])
    const calendar = useCalendarApp({
        timezone: 'America/El_Salvador',
        translations: mergeLocales(translations, { esES: { 'Semana': '4 días' } }),
        views: [
            createViewWeek(),
            createViewMonthAgenda(),
            createViewMonthGrid(),
            createViewDay()
        ],
        events: [],
        plugins: [
            createEventModalPlugin({
                // Se llama al crear evento
                onCreateEvent: async (event) => {
                    // Pregunta al usuario qué paciente asignar
                    const patientId = prompt(
                        'Seleccione el paciente ID:\n' +
                        patients.map(p => `${p.id}: ${p.name}`).join('\n')
                    )

                    if (!patientId) return null

                    const saved = await createAppointmentAPI(event, patientId)
                    if (!saved) return null

                    return {
                        id: saved.id,
                        title: saved.patientName, // Mostrar nombre del paciente
                        start: parseEventDate(saved.start.slice(0,16)),
                        end: parseEventDate(saved.end.slice(0,16)),
                        description: saved.description
                    }
                }
            }),
            createDragAndDropPlugin({
                onEventDrop: async (event) => {
                    await updateAppointmentAPI(event)
                }
            })
        ]
    })

    // Cargar pacientes y citas al iniciar
    useEffect(() => {
        async function fetchData() {
            try {
                const [patientsData, appointmentsData] = await Promise.all([
                    fetchPatients(),
                    fetch(`${API_URL}/appointments`)
                ])

                const appointments = await appointmentsData.json()
                setPatients(await patientsData)

                calendar.setEvents(
                    appointments.map(a => ({
                        id: a.id,
                        title: a.patientName, // Mostrar nombre del paciente
                        start: parseEventDate(a.start.slice(0,16)),
                        end: parseEventDate(a.end.slice(0,16)),
                        description: a.description
                    }))
                )
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [calendar])

    return (
        <div className="w-full max-w-screen h-[800px] max-h-[90vh]">
            <ScheduleXCalendar calendarApp={calendar}/>
        </div>
    )
}

export default Calendar
