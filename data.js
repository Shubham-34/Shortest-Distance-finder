/*
  data.js - YAHAN APNE COLLEGE KA DATA BADLO

  NODES: har building ka id, naam aur map par position (x, y).
         Map ka size 780 x 520 hai (index.html ke viewBox ke hisaab se).
  EDGES: [building_id_1, building_id_2, distance_in_metres]
         Path dono taraf se chalta hai, to ek hi baar likho.
*/

var CAMPUS = {
  nodes: {
    gate:    { name: "Main Gate",      x: 70,  y: 270 },
    medical: { name: "Medical Centre", x: 200, y: 110 },
    admin:   { name: "Admin Block",    x: 215, y: 260 },
    parking: { name: "Parking",        x: 150, y: 430 },
    library: { name: "Library",        x: 360, y: 160 },
    audi:    { name: "Auditorium",     x: 340, y: 340 },
    lab:     { name: "Computer Lab",   x: 520, y: 90  },
    canteen: { name: "Canteen",        x: 520, y: 260 },
    work:    { name: "Workshop",       x: 530, y: 420 },
    hostelA: { name: "North campus Hostel A",       x: 690, y: 160 },
    hostelB: { name: "North campus Hostel B",       x: 710, y: 320 },
    sports:  { name: "Sports Ground",  x: 690, y: 460 }
  },

  edges: [
    ["gate", "admin", 150],    ["gate", "parking", 140],  ["gate", "medical", 190],
    ["parking", "admin", 180], ["parking", "audi", 220],
    ["admin", "medical", 140], ["admin", "library", 190], ["admin", "audi", 160],
    ["medical", "library", 170],
    ["library", "lab", 150],   ["library", "canteen", 210],
    ["audi", "canteen", 190],  ["audi", "work", 200],
    ["lab", "canteen", 140],   ["lab", "hostelA", 190],
    ["canteen", "hostelA", 200], ["canteen", "hostelB", 220], ["canteen", "work", 150],
    ["work", "sports", 170],   ["work", "hostelB", 190],
    ["hostelA", "hostelB", 150], ["hostelB", "sports", 130]
  ]
};

// Default dropdown selection when the page opens
var DEFAULT_ROUTE = { from: "gate", to: "hostelB" };

// Walking speed used for the time estimate (metres per minute, about 4.7 km/h)
var WALK_METRES_PER_MIN = 78;
