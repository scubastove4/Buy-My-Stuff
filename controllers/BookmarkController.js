// const { Op } = require('sequelize')
const { Bookmark, Customer, Item } = require('../models')

////////  attempting to combine express/axios reqs to post or delete if exists already

// const ToggleBookmark = async (req, res) => {
//   try {
//     const bookmark = await Bookmark.findOne({
//       where: {
//         [Op.and]: [
//           { customerId: req.body.customerId },
//           { itemId: req.body.itemId }
//         ]
//       }
//     })
//     if (bookmark) {
//       try {
//         await Bookmark.destroy({ where: { id: bookmark.id } })
//         res.send({
//           msg: 'Bookmark deleted',
//           payload: bookmark.id,
//           status: 'Ok'
//         })
//       } catch (e) {
//         throw e
//       }
//     } else {
//       try {
//         const createdBookmark = await Bookmark.create({
//           customerId: req.body.customerId,
//           itemId: req.body.itemId
//         })
//         res.send(createdBookmark)
//       } catch (e) {
//         throw e
//       }
//     }
//   } catch (e) {
//     throw e
//   }
// }

const GetCustomerBookmark = async (req, res) => {
  try {
    const bookmarks = await Customer.findOne({
      where: { id: req.params.customer_id },
      include: {
        model: Item,
        as: 'bookmarks',
        through: { as: 'bookmark_props', attributes: ['id'] },
        attributes: ['name', 'price', 'image']
      }
    })
    res.send(bookmarks)
  } catch (e) {
    throw e
  }
}

const CreateBookmark = async (req, res) => {
  try {
    const createdBookmark = await Bookmark.create({
      customerId: req.body.customerId,
      itemId: req.body.itemId
    })
    res.send(createdBookmark)
  } catch (e) {
    throw e
  }
}

const DeleteBookmark = async (req, res) => {
  try {
    await Bookmark.destroy({
      where: {
        id: req.params.bookmark_id
      }
    })
    res.send({
      msg: 'Bookmark deleted',
      payload: req.params.bookmark_id,
      status: 'Ok'
    })
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetCustomerBookmark,
  // ToggleBookmark
  CreateBookmark,
  DeleteBookmark
}
