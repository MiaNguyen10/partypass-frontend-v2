export const DefaultLimit = 10;

export const MAX_FILE_SIZE = 102400; //100KB

export const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

export const roles = [
  { id: 0, value: "App User" },
  { id: 1, value: "System Admin" },
  { id: 2, value: "Institutional Admin" },
  { id: 3, value: "Institutional Staff" },
];

export const institution_status = [{ id: 0, value: "Disabled" }, { id: 1, value: "Active" }];

export const allocation_status = [{ value: "Empty" }, { value: "Allocated" }];

export const locker_status = [{ id: 0, value: "Disabled" }, { id: 1, value: "Active" }]; 

export const ticket_status = [{ id: 0, value: "Purchased" }, { id: 1, value: "Entered" }, { id: 2, value: "Checked out" }];

export const loading_status = {
  idle: 'idle',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
};