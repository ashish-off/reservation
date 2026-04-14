import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { TableOption } from '@/types';
import type { FirstFormSchemaType, ThirdFormSchemaType } from '@/components/reservation/schemas';

export type Step = 1 | 2 | 3 | 4;
export type DateTimeData = FirstFormSchemaType;
export type SeatingData = { seating: TableOption };
export type ContactData = ThirdFormSchemaType;
//final
export type ReservationPayload = DateTimeData & SeatingData & ContactData;

interface ReservationState {
  step: Step;
  dateTimeData: DateTimeData | null;
  seatingData: SeatingData | null;
  contactData: ContactData | null;
}

interface ReservationActions {
  submitStep1: (data: DateTimeData) => void;
  submitStep2: (seating: TableOption) => void;
  submitStep3: (data: ContactData) => ReservationPayload | null;
  goBack: () => void;
  getPayload: () => ReservationPayload | null; // to show final data
  reset: () => void;
}

type ReservationStore = ReservationState & ReservationActions;

const initialState: ReservationState = {
  step: 1,
  dateTimeData: null,
  seatingData: null,
  contactData: null,
};

export const useReservationStore = create<ReservationStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,

      submitStep1: (data) =>
        set((state) => {
          state.dateTimeData = data;
          state.step = 2;
        }),

      submitStep2: (seating) =>
        set((state) => {
          state.seatingData = { seating };
          state.step = 3;
        }),

      submitStep3: (data) => {
        set((state) => {
          state.contactData = data;
          state.step = 4;
        });
        return get().getPayload();
      },

      goBack: () =>
        set((state) => {
          if (state.step > 1) {
            state.step = (state.step - 1) as Step;
          }
        }),

      getPayload: () => {
        const { dateTimeData, seatingData, contactData } = get();
        if (!dateTimeData || !seatingData || !contactData) return null;
        return { ...dateTimeData, ...seatingData, ...contactData };
      },
      reset: () => set({ ...initialState }, true),
    })),
    { name: 'ReservationStore' }
  )
);
