const pages = {
  loginPath: "/auth/login",
  homePagePath: "/",

  //ticket
  ticketsPath: "/tickets",
  ticketDetailPath: "/tickets/:id",
  editTicketPath: "/tickets/:id/edit",
  addTicketPath: "/tickets/create",

  ticketsPathForInstitution: "/tickets_institution",
  editTicketPathForInstitution: "/tickets_institution/:id/edit",
  addTicketPathForInstitution: "/tickets_institution/create",
  ticketPathForInstitution: "/tickets_institution/:id",

  //user
  usersPath: "/users",
  userDetailPath: "/users/:id",
  editUserPath: "/users/:id/edit",
  addUsersPath: "/users/create",

  //institution
  institutionsPath: "/institutions",
  institutionDetailPath: "/institutions/:id",
  lockerForInstitutionPath: "/institutions/:id/lockers",
  editInstitutionPath: "/institutions/:id/edit",
  addInstitutionPath: "/institutions/create",

  institutionDetailPath2: "/institution_detail",

  //locker
  lockersPath: "/lockers",
  lockerDetailPath: "/lockers/:id",
  editLockerPath: "/lockers/:id/edit",
  addLockerPath: "/lockers/create",

  //purchase
  purchasePath: "/purchase",
  purchaseDetailPath: "/purchase/:id",

  purchasePathForInstitution: "/purchase_institution",
  purchaseDetailPathForInstitution: "/purchase_institution/:id",

  accessDenied: "/auth/404",
};

export default pages;
