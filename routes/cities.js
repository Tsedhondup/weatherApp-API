const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// GET NEXT VIDEO LIST
router.get("/cities", (req, res, next) => {
  fs.readFile("./data/cities.json", (error, data) => {
    if (error) {
      res.send("no such directory is found!");
    } else {
      const cityLists = JSON.parse(data);
      if (cityLists.length < 0) {
        res.json({ message: "Cannot find saved citt" });
        return;
      } else {
        res.send(cityLists);
        return;
      }
    }
  });
});

// POST THE VIDEO
router.post("/cities", (req, res, next) => {
  // read file
  let postCity;
  fs.readFile("./data/cities.json", (err, data) => {
    const cityArrayCopy = JSON.parse(data); // create a copy of existing data base
    postCity = { id: uuidv4(), city: req.body.city };
    cityArrayCopy.push(postCity);
    // update data base
    fs.writeFile("./data/cities.json", JSON.stringify(cityArrayCopy), (err) => {
      console.log("cannot update the data base");
    });
    res.send(postCity);
    return;
  });
});



// // DELETE COMMENTS
router.delete("/cities/:id", (req, res, next) => {
  fs.readFile("./data/cities.json", (err, data) => {
    const reqCityId = req.params.id;
    const cityListCopy = JSON.parse(data);
    const updatedCityList = cityListCopy.filter((city) => {
      return city.id !== reqCityId;
    });
    fs.writeFile(
      "./data/cities.json",
      JSON.stringify(updatedCityList),
      (err) => {
        console.log("City added!");
      }
    );
    res.send(updatedCityList);
    return;
  });
});

module.exports = router;
