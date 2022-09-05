const { Bookmark } = require('../models')

const CreateBookmark = async (req, res) => {
  try {
    const createdBookmark = await Bookmark.create({
      customerId: req.body.customerId,
      itemId: req.body.itemId
    })
    res.send(createdBookmark)
  } catch (error) {
    throw error
  }
}

const DeleteBookmark = async (req, res) => {
  try {
    await Bookmark.destroy({ where: { id: req.params.bookmark_id } })
    res.send({
      msg: 'Bookmark deleted',
      payload: req.params.bookmark_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateBookmark,
  DeleteBookmark
}
