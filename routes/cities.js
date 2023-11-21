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
  fs.readFile("./data/cities.json", (err, data) => {
    const cityArrayCopy = JSON.parse(data); // create a copy of existing data base
    const postCity = { id: uuidv4(), city: req.body.city };
    cityArrayCopy.push(postCity);
    // update data base
    fs.writeFile("./data/cities.json", JSON.stringify(cityArrayCopy), (err) => {
      console.log("cannot update the data base");
    });
  });
  res.send(req.body);
  return;
});



// // DELETE COMMENTS
// router.delete("/cities/:id", (req, res, next) => {
//   fs.readFile("./data/videos.json", (err, data) => {
//     if (err) {
//       res.send("Cannot delete comments");
//       return;
//     } else {
//       const videoId = req.params.id; // get the video id
//       const commentId = req.params.commentId; // get the comment id
//       const videoDataCopy = JSON.parse(data); // create a shallow copy of video.json data
//       // deleting comment
//       videoDataCopy.forEach((videoObj) => {
//         if (videoObj.id === videoId) {
//           videoObj.comments = videoObj.comments.filter((comment) => {
//             return comment.id !== commentId;
//           });
//         }
//       });
//       // updating data base
//       fs.writeFile(
//         "./data/videos.json",
//         JSON.stringify(videoDataCopy),
//         (err) => {
//           if (err) {
//             res.send("cannot delete comment!");
//           }
//         }
//       );
//       res.json({ id: commentId }); // sending deleted comment Id
//       return;
//     }
//   });
// });

module.exports = router;
