// Helper methods
export const utilities = {
  addLeadingZero: (num) => {
    num = num < 10 ? "0" + num : num;
    return num;
  },
  getTimeStamp: (time) => {
    const date = new Date(time);

    let year = date.getFullYear();
    let month = utilities.addLeadingZero(date.getMonth() + 1);
    let day = utilities.addLeadingZero(date.getDate());

    let hours = utilities.addLeadingZero(date.getHours());
    let minutes = utilities.addLeadingZero(date.getMinutes());

    const dateStamp = `${year}-${month}-${day}`;
    const timeStamp = `${hours}:${minutes}`;

    return {
      dateStamp,
      timeStamp,
    };
  },
  // Sort items alphabetically by key
  sortItems: (items, key) => {
    return items.sort((a, b) => a[key].localeCompare(b[key]));
  },
  // Remove HTML tags
  removeHTML: (text) => {
    return text.replace(/<[^>]*>?/gm, "");
  },
  // Format a string as an HTML ID
  getIdFormat: (text) => {
    return text.replace(/\s/g, "").toLowerCase();
  },
  getSlugFormat: (text) => {
    return text.replace(/\s/g, "-").toLowerCase();
  },
  // Data construction methods
  getRooms: (rooms, originalRooms) => {
    const editRooms = [];
    if (rooms.length >= originalRooms.length) {
      for (let i = 0; i < originalRooms.length; i++) {
        const oldRoom = originalRooms[i];
        let newRoom = rooms[i];

        // Room is not changed
        if (
          !newRoom.accommodation_rooms_name &&
          !newRoom.accommodation_rooms_price
        ) {
          editRooms.push(oldRoom);
          // At least one of the room fields are changed
        } else if (
          newRoom.accommodation_rooms_name ||
          newRoom.accommodation_rooms_price
        ) {
          newRoom.accommodation_rooms_name = newRoom.accommodation_rooms_name
            ? newRoom.accommodation_rooms_name
            : oldRoom.accommodation_rooms_name;
          newRoom.accommodation_rooms_price = newRoom.accommodation_rooms_price
            ? newRoom.accommodation_rooms_price
            : oldRoom.accommodation_rooms_price;

          editRooms.push(newRoom);
        }
      }
    }
    // Add any additional rooms
    if (rooms.length > originalRooms.length) {
      for (let i = originalRooms.length; i < rooms.length; i++) {
        let newRoom = rooms[i];
        if (
          newRoom.accommodation_rooms_name &&
          newRoom.accommodation_rooms_price
        ) {
          editRooms.push(newRoom);
        }
      }
    }

    if (rooms.length < originalRooms.length) {
      for (let i = 0; i < rooms.length; i++) {
        const oldRoom = originalRooms[i];
        let newRoom = rooms[i];
        // Room is not changed
        if (
          !newRoom.accommodation_rooms_name &&
          !newRoom.accommodation_rooms_price
        ) {
          editRooms.push(oldRoom);
          // At least one of the room fields are changed
        } else if (
          newRoom.accommodation_rooms_name ||
          newRoom.accommodation_rooms_price
        ) {
          newRoom.accommodation_rooms_name = newRoom.accommodation_rooms_name
            ? newRoom.accommodation_rooms_name
            : oldRoom.accommodation_rooms_name;
          newRoom.accommodation_rooms_price = newRoom.accommodation_rooms_price
            ? newRoom.accommodation_rooms_price
            : oldRoom.accommodation_rooms_price;

          editRooms.push(newRoom);
        }
      }
    }
    return editRooms;
  },
};
