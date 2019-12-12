exports.getFullName = contact => {
  let name = "";
  if (contact.givenName) name += contact.givenName + " ";
  if (contact.familyName) name += contact.familyName;
  return name;
};
