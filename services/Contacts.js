import { API_SERVER } from "../constants/Server";

exports.importContacts = async contacts => {
  const response = await fetch(`${API_SERVER}contacts/import`, {
    method: "post",
    body: JSON.stringify(contacts)
  });
  const json = await response.json();
  return json;
}
