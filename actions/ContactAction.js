export const types = {
  CONTACT_LOADED: "CONTACT_LOADED"
};

export const contactLoaded = contacts => ({
  type: types.CONTACT_LOADED,
  payload: contacts
});
