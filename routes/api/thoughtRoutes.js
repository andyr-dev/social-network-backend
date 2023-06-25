const router = require('express').Router();

const {
    getThoughts, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought,
    addReaction, 
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought)

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)

//   these might need an extra endpoint
  .post(addReaction)
  .delete(deleteReaction);

  module.exports = router;