export interface AppointmentResponse {
  id: string
  type: string
  category: string
  title: string
  recurrence: Recurrence
  eventTime: EventTime
  description: string
  url: string
  share_url: string
  location: string
  timezone: string
  color: string
  status: string
  attendees: Attendee[]
}

export interface Recurrence {
  repeatUnit: string
}

export interface EventTime {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export interface Attendee {
  id: number
  name: string
  email: string
}

export interface IAppointmentStore {
  appointments: AppointmentResponse[]
  loading: boolean
  fetchAllAppointmentThisMonth: () => Promise<void>
  createNewAppointment: (appointmentData: Record<string, unknown>) => Promise<void>
  success: boolean
}
