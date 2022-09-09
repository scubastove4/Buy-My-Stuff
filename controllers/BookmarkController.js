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
//       } catch (error) {
//         throw error
//       }
//     } else {
//       try {
//         const createdBookmark = await Bookmark.create({
//           customerId: req.body.customerId,
//           itemId: req.body.itemId
//         })
//         res.send(createdBookmark)
//       } catch (error) {
//         throw error
//       }
//     }
//   } catch (error) {
//     throw error
//   }
// }

const GetCustomerBookmark = async (req, res) => {
  try {
    const bookmarks = await Customer.findOne({
      where: { id: req.params.customer_id },
      include: {
        model: Item,
        as: 'bookmarks',
        through: { attributes: [] },
        attributes: ['id', 'name', 'price', 'image']
      }
    })
    res.send(bookmarks)
  } catch (error) {
    throw error
  }
}

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
    await Bookmark.destroy({
      where: {
        customer_id: req.body.customerId,
        item_id: req.body.itemId
      }
    })
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
  GetCustomerBookmark,
  // ToggleBookmark
  CreateBookmark,
  DeleteBookmark
}
