const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: Product
  });
  res.json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const { id } = req.params;
  const tagSearch = await Tag.findByPk(id, {
    include: Product
  });
  res.json(tagSearch);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body)
  res.json(newTag);

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;
  const tagSearch = await Tag.findByPk(id, {
    include: Product
  });
  const updateTag = await tagSearch.update(req.body);
  res.json(updateTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;
  const productTagSearch = await ProductTag.destroy({
    where: {
      tag_id: id
    }
  });

  const productSearch = await Product.findByPk(id);
  const deleteProduct = await productSearch.destroy(req.body);
  res.json(deleteProduct);
});

module.exports = router;
