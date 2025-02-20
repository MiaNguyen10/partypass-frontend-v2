import { configureStore } from '@reduxjs/toolkit';
import BlogReducer from './apps/blog/BlogSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import EcommerceReducer from './apps/eCommerce/EcommerceSlice';
import EmailReducer from './apps/email/EmailSlice';
import NotesReducer from './apps/notes/NotesSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import AuthenticateReducer from './reducers/authenticate/authenticateSlice';
import dashboardReducer from './reducers/dashboard/dashboardSlice';
import InstitutionReducer from './reducers/institution/institutionSlice';
import LockerReducer from './reducers/locker/lockerSlice';
import PurchaseReducer from './reducers/purchase/purchaseSlice';
import TicketReducer from './reducers/ticket/ticketSlice';
import UserReducer from './reducers/user/userSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    chatReducer: ChatsReducer,
    emailReducer: EmailReducer,
    notesReducer: NotesReducer,
    contactsReducer: ContactsReducer,
    ecommerceReducer: EcommerceReducer,
    userpostsReducer: UserProfileReducer,
    blogReducer: BlogReducer,
    auth: AuthenticateReducer,
    ticket: TicketReducer,
    institution: InstitutionReducer,
    user: UserReducer,
    locker: LockerReducer,
    purchase: PurchaseReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
