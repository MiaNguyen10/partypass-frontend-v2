import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import NotesReducer from './apps/notes/NotesSlice';
import EmailReducer from './apps/email/EmailSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import EcommerceReducer from './apps/eCommerce/EcommerceSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import BlogReducer from './apps/blog/BlogSlice';
import AuthenticateReducer from './reducers/authenticate/authenticateSlice';
import TicketReducer from "./reducers/ticket/ticketSlice";
import InstitutionReducer from "./reducers/institution/institutionSlice";
import UserReducer from "./reducers/user/userSlice";
import LockerReducer from "./reducers/locker/lockerSlice";
import PurchaseReducer from "./reducers/purchase/purchaseSlice";

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
  },
});

export default store;
