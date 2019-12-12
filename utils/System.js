import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";

exports.getContacts = async () => {
  let contacts = [];
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.ID,
        Contacts.Fields.Company,
        Contacts.Fields.Emails,
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.MiddleName,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Addresses
      ]
    });

    contacts = data.map(item => {
      return {
        id: item.id,
        company: item.company,
        emailAddresses: item.emails
          ? item.emails.map(email => ({
              label: email.label,
              email: email.email
            }))
          : [],
        familyName: item.lastName,
        givenName: item.firstName,
        middleName: item.middleName,
        phoneNumbers: item.phoneNumbers
          ? item.phoneNumbers.map(phone => ({
              label: phone.label,
              number: phone.number
            }))
          : [],
        addresses: item.addresses ? item.addresses : []
      };
    });

    return contacts;
  }

  return [];
};
