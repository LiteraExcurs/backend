import { Booking } from '../entities/booking.entity';

export type BookingQuery = { activityId: number } & Booking;
