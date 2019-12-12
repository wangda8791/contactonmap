export const getAddressableContact = state => {
  const contacts = state.reducer.contacts.filter(
    contact => contact.addresses.length > 0
  );

  return contacts;
};
